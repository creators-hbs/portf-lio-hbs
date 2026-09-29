const $ = selector => document.querySelector(selector);
let active = 'all';
let origin;
let copyOrigin;
let currentProject;
let imageRequest = 0;
const statusTimers = new WeakMap();

for (const [id, label] of [['all', 'Todos'], ...Object.entries(categories)]) {
  const option = document.createElement('label');
  option.className = 'filter-option';
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'category';
  radio.value = id;
  radio.checked = id === active;
  const text = document.createElement('span');
  text.textContent = label;
  radio.addEventListener('change', () => { active = id; render(); });
  option.append(radio, text);
  $('#filters').append(option);
}

function announce(message, status) {
  clearTimeout(statusTimers.get(status));
  status.textContent = '';
  statusTimers.set(status, setTimeout(() => {
    status.textContent = message;
    statusTimers.set(status, setTimeout(() => { status.textContent = ''; }, 6000));
  }, 30));
}

async function copyLink(project, trigger) {
  const status = $('#viewer').open ? $('#viewer-copy-status') : $('#copy-status');
  trigger.disabled = true;
  const copied = await copyProjectUrl(project.url);
  trigger.disabled = false;
  if (copied) {
    announce(`Link copiado — ${project.name}`, status);
    return;
  }
  copyOrigin = trigger;
  $('#manual-url').value = project.url;
  if (!$('#copy-fallback').open) $('#copy-fallback').showModal();
  syncScrollLock();
  $('#manual-url').focus();
  $('#manual-url').select();
}

function syncScrollLock() {
  document.body.classList.toggle('modal-open', $('#viewer').open || $('#copy-fallback').open);
}

function openViewer(project, trigger) {
  origin = trigger;
  currentProject = project;
  const request = ++imageRequest;
  $('#viewer-title').textContent = project.name;
  $('#viewer-category').textContent = project.category;
  $('#viewer-link').href = project.url;
  $('#viewer-link').setAttribute('aria-label', `Ver site online de ${project.name} (nova aba)`);
  $('#original-link').href = project.image;
  $('#original-link').setAttribute('aria-label', `Abrir imagem original de ${project.name} (nova aba)`);
  $('#viewer-copy-status').textContent = '';
  $('#zoom').setAttribute('aria-pressed', 'false');
  $('#zoom').textContent = 'Ampliar captura ＋';
  $('#zoom').disabled = true;
  $('#viewer-scroll').classList.remove('zoomed');
  // A fresh image prevents a previous request's late event from changing this viewer.
  const img = document.createElement('img');
  img.id = 'full-image';
  img.hidden = true;
  img.alt = `Captura completa do site ${project.name}`;
  $('#full-image').replaceWith(img);
  $('#image-status').hidden = false;
  $('#image-status').textContent = 'Carregando captura completa…';
  $('#viewer-scroll').setAttribute('aria-busy', 'true');
  img.onload = () => {
    if (request !== imageRequest) return;
    img.hidden = false;
    $('#image-status').hidden = true;
    $('#viewer-scroll').setAttribute('aria-busy', 'false');
    $('#zoom').disabled = false;
  };
  img.onerror = () => {
    if (request !== imageRequest) return;
    $('#image-status').textContent = 'Não foi possível carregar a captura. Tente abrir a imagem original acima ou feche e abra novamente. O link do site continua disponível.';
    $('#viewer-scroll').setAttribute('aria-busy', 'false');
  };
  img.src = project.image;
  $('#viewer').showModal();
  syncScrollLock();
  $('#viewer-scroll').scrollTop = 0;
  $('#viewer-scroll').scrollLeft = 0;
  $('#close').focus();
}

function render() {
  document.querySelectorAll('input[name="category"]').forEach(radio => { radio.checked = radio.value === active; });
  const filtered = selectProjects(projects, active, $('#search').value);
  $('#clear-search').disabled = $('#search').value.length === 0;
  $('#count').textContent = `${filtered.length} ${filtered.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}`;
  $('#grid').replaceChildren();
  $('#empty').hidden = filtered.length > 0;
  filtered.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('aria-labelledby', `title-${project.id}`);
    card.innerHTML = `
      <button class="capture" type="button" aria-label="Ver captura completa de ${project.name}">
        <span class="browser-bar"><span aria-hidden="true">● ● ●</span><span>${new URL(project.url).hostname}</span><span aria-hidden="true">↗</span></span>
        <span class="preview"><img src="${project.thumbnail}" width="800" height="600" alt="Prévia do site ${project.name}" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async"><span class="image-error" hidden>Prévia indisponível. Abra a captura completa ou visite o site abaixo.</span><span class="expand" aria-hidden="true">Ampliar captura ↗</span></span>
      </button>
      <div class="card-meta"><span>${project.category}</span><span>${String(projects.indexOf(project) + 1).padStart(2, '0')}</span></div>
      <h3 id="title-${project.id}">${project.name}</h3>
      <div class="card-actions">
        <button class="view-capture" type="button" aria-label="Ver captura completa de ${project.name}">Ver captura completa <span aria-hidden="true">＋</span></button>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver site online de ${project.name} (nova aba)">Ver site online <span aria-hidden="true">↗</span></a>
        <button class="copy-link" type="button" aria-label="Copiar link de ${project.name}">Copiar link <span aria-hidden="true">⧉</span></button>
      </div>`;
    card.querySelectorAll('.capture, .view-capture').forEach(button => button.addEventListener('click', () => openViewer(project, button)));
    const copy = card.querySelector('.copy-link');
    copy.addEventListener('click', () => copyLink(project, copy));
    card.querySelector('img').addEventListener('error', event => {
      event.target.hidden = true;
      card.querySelector('.image-error').hidden = false;
    });
    $('#grid').append(card);
  });
}

$('#search').addEventListener('input', render);
$('#clear-search').addEventListener('click', () => { $('#search').value = ''; render(); $('#search').focus(); });
$('#reset').addEventListener('click', () => { active = 'all'; $('#search').value = ''; render(); $('#search').focus(); });
$('#close').addEventListener('click', () => $('#viewer').close());
$('#viewer').addEventListener('close', () => {
  ++imageRequest;
  syncScrollLock();
  origin?.focus();
});
$('#viewer').addEventListener('click', event => { if (event.target === $('#viewer')) $('#viewer').close(); });
$('#viewer-copy').addEventListener('click', () => copyLink(currentProject, $('#viewer-copy')));
$('#zoom').addEventListener('click', () => {
  const zoomed = $('#viewer-scroll').classList.toggle('zoomed');
  $('#zoom').setAttribute('aria-pressed', String(zoomed));
  $('#zoom').textContent = zoomed ? 'Ajustar à tela −' : 'Ampliar captura ＋';
});
$('#close-copy').addEventListener('click', () => $('#copy-fallback').close());
$('#select-url').addEventListener('click', () => { $('#manual-url').focus(); $('#manual-url').select(); });
$('#copy-fallback').addEventListener('close', () => { syncScrollLock(); copyOrigin?.focus(); });
render();