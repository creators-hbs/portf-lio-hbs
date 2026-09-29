const $ = (selector) => document.querySelector(selector);
const categories = ['Todos', 'Saúde e Bem-estar', 'Consultoria e Negócios', 'Imobiliário e Hospitalidade', 'Comércio e Produtos', 'Agro e Tecnologia'];
let active = 'Todos';
let origin;
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
for (const category of categories) {
  const button = document.createElement('button');
  button.type = 'button'; button.dataset.category = category;
  button.textContent = category;
  button.addEventListener('click', () => { active = category; render(); });
  $('#filters').append(button);
}
function openViewer(project, trigger) {
  origin = trigger;
  $('#viewer-title').textContent = project.name;
  $('#viewer-category').textContent = project.category;
  $('#viewer-link').href = project.url;
  const img = $('#full-image');
  img.hidden = true;
  $('#image-status').hidden = false;
  $('#image-status').textContent = 'Carregando captura completa…';
  img.onload = () => { img.hidden = false; $('#image-status').hidden = true; };
  img.onerror = () => { $('#image-status').textContent = 'Não foi possível carregar a captura. Feche e tente novamente.'; };
  img.alt = `Captura completa do site ${project.name}`;
  img.src = project.image;
  $('#viewer').showModal();
  document.body.classList.add('modal-open');
  $('#viewer-scroll').scrollTop = 0;
  $('#close').focus();
}
function render() {
  document.querySelectorAll('[data-category]').forEach(b => b.setAttribute('aria-pressed', b.dataset.category === active));
  const filtered = projects.filter(p => (active === 'Todos' || p.category === active) && normalize(p.name).includes(normalize($('#search').value.trim())));
  $('#count').textContent = `${String(filtered.length).padStart(2,'0')} ${filtered.length === 1 ? 'projeto' : 'projetos'}${active === 'Todos' ? ' no acervo' : ' neste segmento'}`;
  $('#grid').replaceChildren(); $('#empty').hidden = filtered.length > 0;
  filtered.forEach((project, index) => {
    const card = document.createElement('article'); card.className = 'card';
    card.innerHTML = `<button class="capture" type="button" aria-label="Ver captura completa de ${project.name}"><span class="browser-bar"><span aria-hidden="true">● ● ●</span><span>${new URL(project.url).hostname}</span><span aria-hidden="true">↗</span></span><span class="preview"><img src="${project.thumbnail}" width="800" height="600" alt="Prévia do site ${project.name}" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async"><span class="image-error" hidden>Prévia indisponível. Abra a captura completa.</span><span class="expand" aria-hidden="true">Ampliar captura ↗</span></span></button><div class="card-meta"><span>${project.category}</span><span>${String(projects.indexOf(project)+1).padStart(2,'0')}</span></div><h3>${project.name}</h3><div class="card-actions"><button type="button">Ver captura completa <span aria-hidden="true">＋</span></button><a href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver site online de ${project.name} (nova aba)">Ver site online <span aria-hidden="true">↗</span></a></div>`;
    card.querySelectorAll('button').forEach(button => button.addEventListener('click', () => openViewer(project,button)));
    card.querySelector('img').addEventListener('error', event => { event.target.hidden = true; card.querySelector('.image-error').hidden = false; });
    $('#grid').append(card);
  });
}
$('#search').addEventListener('input', render);
$('#reset').addEventListener('click', () => { active = 'Todos'; $('#search').value = ''; render(); $('#search').focus(); });
$('#close').addEventListener('click', () => $('#viewer').close());
$('#viewer').addEventListener('close', () => { document.body.classList.remove('modal-open'); origin?.focus(); });
$('#viewer').addEventListener('click', event => { if(event.target === $('#viewer')) $('#viewer').close(); });
render();
