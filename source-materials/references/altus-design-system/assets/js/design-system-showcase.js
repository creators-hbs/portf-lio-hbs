/* Interações locais da vitrine. Reutiliza jQuery e classes da página de referência. */
jQuery(function ($) {
  'use strict';
  const page = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const typeRoles = [
    ['h1',700,64,72,-.055,'none'],['h2',500,48,56,-.045,'none'],
    ['h3',500,36,44,-.035,'none'],['h4',500,28,36,-.03,'none'],
    ['h5',500,22,30,-.025,'none'],['h6',500,18,26,-.02,'none'],
    ['body-lg',400,20,32,0,'none'],['body',400,16,26,0,'none'],
    ['body-sm',400,14,22,0,'none'],['caption',400,12,18,.01,'none'],
    ['label',500,11,16,.12,'uppercase'],['helper',400,12,18,0,'none']
  ];
  $('#type-rows').html(typeRoles.map(([name,weight,size,line,spacing,transform]) => `<tr><td><button type="button" data-role="${name}" aria-pressed="${name==='h2'}">${name}</button></td><td>${weight}</td><td>${size} / ${line}</td><td>${spacing.toFixed(3)}</td><td>${transform==='none'?'Natural':'ALTA'}</td></tr>`).join(''));
  function selectRole(name) {
    const role = typeRoles.find(r=>r[0]===name);
    const [,weight,size,line,spacing,transform]=role;
    $('[data-role]').attr('aria-pressed','false');
    $(`[data-role="${name}"]`).attr('aria-pressed','true');
    $('#role-label').text(`${name.toUpperCase()} / ${size} PX / PESO ${weight}`);
    $('#role-sample').css({fontFamily:'"Sora", Arial, sans-serif',fontWeight:weight,fontSize:`clamp(${Math.min(size,32)}px, 5vw, ${size}px)`,lineHeight:line/size,letterSpacing:spacing+'em',textTransform:transform});
  }
  selectRole('h2');
  $('[data-role]').on('click',function(){selectRole(this.dataset.role);});
  $('[data-weight]').on('click',function(){
    $('[data-weight]').attr('aria-pressed','false');
    $(this).attr('aria-pressed','true');
    $('.ds-big-aa,#type-preview').css('font-weight',this.dataset.weight);
  });
  $('#type-preview').on('input',function(){$('#role-sample').text(this.value||'Ideias com presença.');});

  const palette = [
    {name:'Ouro solar',hex:'#FCD55A',role:'Primary / ação',origin:'Referência',text:'Rótulos e títulos sobre fundos escuros.',background:'Ações principais; texto preto sobre o ouro.',border:'Foco e seleção; nunca substitui o nome do estado.',hover:'Usar reflexo branco a 38% e elevação de 2 px.',active:'Escala .98, mantendo a mesma cor.',disabled:'38% de opacidade; sem animação.',gradient:'Texto: #FCD55A → #CE8D1B; não usar em textos pequenos.'},
    {name:'Champanhe',hex:'#F5D77F',role:'Secondary / luz',origin:'Referência',text:'Destaques leves, metadados selecionados e tooltips.',background:'Faixas e botões com texto escuro.',border:'A 26% em elementos decorativos; 100% em foco.',hover:'Elevar brilho através do gradiente, sem perder o contraste.',active:'Texto preto e superfície sólida.',disabled:'38% de opacidade sobre a superfície.',gradient:'60°: #B07515 → #F5D77F → #F5D77F → #B07515.'},
    {name:'Bronze',hex:'#CE8D1B',role:'Accent / expressão',origin:'Referência',text:'Destaques sobre fundo escuro; evitar corpo pequeno sobre papel.',background:'Extremidade do gradiente, não grandes blocos de texto.',border:'Separadores decorativos e detalhes de marca.',hover:'Transição para Champanhe.',active:'Manter a borda; sem mudança isolada de estado.',disabled:'38% de opacidade.',gradient:'Dourado: #FCD55A → #CE8D1B.'},
    {name:'Noite',hex:'#0E0F11',role:'Neutral / fundo',origin:'Extensão',text:'Texto sobre ouro e papel.',background:'Superfície principal do sistema.',border:'Usar sobre superfícies claras.',hover:'Elevar superfície para #151619.',active:'Destacar com borda dourada.',disabled:'Conteúdo a 38%, superfície mantida.',gradient:'Recebe o halo #EEC047 a 12%, terminando em transparente.'},
    {name:'Papel',hex:'#F5F0E6',role:'Neutral / leitura',origin:'Extensão',text:'Texto principal em superfícies escuras.',background:'Seções editoriais; conteúdo escuro.',border:'14% sobre Noite; 17% de preto sobre Papel.',hover:'Texto dourado somente em superfícies escuras.',active:'Sublinhado ou contorno complementar.',disabled:'Texto a 38%; não usar como texto informativo.',gradient:'Não participa; mantém a leitura estável.'},
    {name:'Grafite',hex:'#151619',role:'Neutral / superfície',origin:'Extensão',text:'Texto de contraste em fundos claros.',background:'Cards, campos, navegação móvel e modal.',border:'Papel a 14%; dourado a 28% no hover.',hover:'Halo dourado a 7% acompanha o cursor.',active:'Borda dourada e feedback textual.',disabled:'Opacidade .38 aplicada ao controle inteiro.',gradient:'Base escura sob halos ambientes de baixa opacidade.'},
    {name:'Névoa',hex:'#B5B5B0',role:'Neutral / suporte',origin:'Extensão',text:'Parágrafos, legendas e informações secundárias no fundo escuro.',background:'Não usar como superfície extensa.',border:'A 24% para divisórias discretas.',hover:'Aproximar para Papel nos links.',active:'Ouro + indicador de seleção.',disabled:'38% da cor; apenas controles inativos.',gradient:'Sem participação.'},
    {name:'Verde',hex:'#61BE66',role:'Feedback / sucesso',origin:'Referência',text:'Confirmação de validação; sempre com mensagem.',background:'Usar a 8% para sinal de sucesso.',border:'A 26% em badges de disponibilidade.',hover:'Manter cor, reforçar com rótulo.',active:'Mensagem de confirmação, sem transição de sentido.',disabled:'Suprimir feedback de validação em controles inativos.',gradient:'Sem participação; estado semântico sólido.'},
    {name:'Coral',hex:'#F28B82',role:'Feedback / erro',origin:'Extensão',text:'Erro de campo e instrução para correção.',background:'A 8% nos halos de validação.',border:'100% em campo inválido + aria-invalid.',hover:'Manter erro até nova validação.',active:'Foco mantém a indicação e a mensagem.',disabled:'Não validar um campo desabilitado.',gradient:'Sem participação; erro deve ser inequívoco.'},
    {name:'Azul',hex:'#8AB4F8',role:'Feedback / informação',origin:'Extensão',text:'Mensagens informativas em superfícies escuras.',background:'A 8% em alertas informativos.',border:'32% para o contorno do alerta.',hover:'Sublinhado se o conteúdo for um link.',active:'Ação comunicada por texto e foco.',disabled:'38% apenas quando parte de um controle.',gradient:'Sem participação.'},
    {name:'Âmbar',hex:'#B07515',role:'Decorative / gradiente',origin:'Referência',text:'Evitar como texto funcional pequeno.',background:'Extremidades do botão em gradiente.',border:'Ornamentos e linhas de composição.',hover:'Reflexo em direção a Champanhe.',active:'Mesma composição; efeito de pressão.',disabled:'Animação pausada, controle a 38%.',gradient:'Extremo escuro do ouro líquido. Texto sempre #0E0F11.'},
    {name:'Aura',hex:'#EEC047',role:'Decorative / atmosfera',origin:'Referência',text:'Reservar para ornamentação.',background:'Halo radial a 12%; esmaecer até transparente.',border:'Órbitas e linhas a 12–19%.',hover:'Halo de componente a 7%.',active:'Sem significado de estado por si só.',disabled:'Remover halo em controles desabilitados.',gradient:'Radial: #EEC047 / 12% → transparente. Movimento de 18 s.'}
  ];
  function rgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));}
  function hsl(hex){
    let [r,g,b]=rgb(hex).map(v=>v/255);const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,l=(max+min)/2;
    let h=0,s=0;
    if(d){s=d/(1-Math.abs(2*l-1));h=max===r?((g-b)/d)%6:max===g?(b-r)/d+2:(r-g)/d+4;h=((h*60)+360)%360;}
    return `${Math.round(h)} ${Math.round(s*100)}% ${Math.round(l*100)}%`;
  }
  function luminance(hex){return rgb(hex).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
  function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
  function level(r){return r>=7?'AAA':r>=4.5?'AA':r>=3?'AA apenas para texto grande':'decorativo; insuficiente para texto';}
  $('#palette').html(palette.map((p,i)=>`<button class="ds-swatch" type="button" data-color="${i}" aria-pressed="${i===0}" style="--swatch:${p.hex};--swatch-ink:${contrast(p.hex,'#0E0F11')>=4.5?'#0E0F11':'#F5F0E6'}"><small>${String(i+1).padStart(2,'0')} / ${p.origin.toUpperCase()}</small><span>${p.name}</span><code>${p.hex}</code></button>`).join(''));
  let currentColor=palette[0];
  function selectColor(index){
    const p=palette[index];currentColor=p;
    $('[data-color]').attr('aria-pressed','false');$(`[data-color="${index}"]`).attr('aria-pressed','true');
    $('#color-role').text(p.role.toUpperCase());$('#color-name').text(p.name);$('#color-hex').text(p.hex);
    $('#color-rgb').text(`rgb(${rgb(p.hex).join(', ')})`);$('#color-hsl').text(`hsl(${hsl(p.hex)})`);
    const alpha=[1,.64,.32,.12];
    $('#opacity-scale').html(alpha.map(a=>{const blend=rgb(p.hex).map((v,i)=>Math.round(v*a+rgb('#151619')[i]*(1-a)));const hex='#'+blend.map(v=>v.toString(16).padStart(2,'0')).join('');return `<span style="background:rgba(${rgb(p.hex).join(',')},${a});color:${contrast(hex,'#0E0F11')>=4.5?'#0E0F11':'#F5F0E6'}">${a*100}%</span>`;}).join(''));
    $('#color-rules').html([['Texto',p.text],['Fundo',p.background],['Borda',p.border],['Hover',p.hover],['Ativo',p.active],['Desabilitado',p.disabled],['Gradiente',p.gradient]].map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join(''));
    const dark=contrast(p.hex,'#0E0F11'),light=contrast(p.hex,'#F5F0E6');
    $('#contrast-result').html(`<strong>${dark.toFixed(2)}:1</strong> sobre Noite · ${level(dark)}<br><strong>${light.toFixed(2)}:1</strong> sobre Papel · ${level(light)}<br>Razões para cores sólidas, calculadas pela luminância relativa sRGB. Verifique novamente ao aplicar transparência ou gradiente.`);
  }
  selectColor(0);$('[data-color]').on('click',function(){selectColor(Number(this.dataset.color));});
  let toastTimer;
  function toast(text){clearTimeout(toastTimer);$('#ds-toast').text(text).addClass('is-visible');toastTimer=setTimeout(()=>$('#ds-toast').removeClass('is-visible'),3400);}
  async function copy(text){
    let success=false;
    try {await navigator.clipboard.writeText(text);success=true;} catch {
      const area=document.createElement('textarea');area.value=text;area.setAttribute('aria-label','Valor para copiar');area.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(area);area.select();success=document.execCommand('copy');area.remove();
    }
    toast(success?`${text} copiado.`:`Selecione e copie: ${text}`);
  }
  $('#copy-color').on('click',()=>copy(currentColor.hex));
  $('[data-copy-icon]').on('click',function(){copy(`e-font-icon-svg ${this.dataset.copyIcon}`);});
  $('[data-demo-action]').on('click',function(){
    const el=$(this),label=el.find('span').first(),original=label.text();
    el.prop('disabled',true).attr('aria-busy','true');label.text('Criando possibilidades…');
    setTimeout(()=>{label.text(original);el.prop('disabled',false).removeAttr('aria-busy');toast('Uma boa ideia começa com uma ação. Demonstração concluída.');},1000);
  });
  $('#demo-form').on('submit',function(event){
    event.preventDefault();const field=document.getElementById('demo-email'),valid=field.validity.valid;
    $(field).attr('aria-invalid',String(!valid));
    $('#email-help').removeClass('is-error is-success').addClass(valid?'is-success':'is-error').text(valid?'Tudo certo! Validação local concluída. Nenhum dado foi enviado.':'Digite um e-mail válido, como voce@exemplo.com.');
    if(!valid)field.focus();else toast('Formulário validado. Nenhum dado foi enviado.');
  });
  $('#demo-email').on('input',function(){if(this.getAttribute('aria-invalid')==='true'){this.removeAttribute('aria-invalid');$('#email-help').removeClass('is-error').text('Confira o endereço e valide novamente.');}});
  const tabs=[...document.querySelectorAll('[role=tab]')];
  function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});}
  $(tabs).on('click',function(){selectTab(this);}).on('keydown',function(e){
    const i=tabs.indexOf(this);let next;
    if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
    if(next!==undefined){e.preventDefault();selectTab(tabs[next]);tabs[next].focus();}
  });
  const dialog=document.getElementById('project-dialog');let lastFocus;
  $('[data-open-modal]').on('click',function(e){e.preventDefault();lastFocus=this;dialog.showModal();document.documentElement.classList.add('ds-dialog-open');});
  $('[data-close-modal],.ds-dialog-close').on('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('ds-dialog-open');lastFocus?.focus({preventScroll:true});});
  $('.ds-tooltip-wrap').on('keydown',function(e){if(e.key==='Escape')$(this).addClass('tooltip-dismissed');}).on('mouseleave focusout',function(){$(this).removeClass('tooltip-dismissed');});
  $('.ds-menu-button').on('click',function(){const open=this.getAttribute('aria-expanded')!=='true';this.setAttribute('aria-expanded',String(open));this.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');document.getElementById('mobile-nav').hidden=!open;});
  $('.ds-mobile-nav a').on('click',()=>{document.getElementById('mobile-nav').hidden=true;$('.ds-menu-button').attr({'aria-expanded':'false','aria-label':'Abrir menu'});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.getElementById('mobile-nav').hidden){document.getElementById('mobile-nav').hidden=true;$('.ds-menu-button').attr({'aria-expanded':'false','aria-label':'Abrir menu'}).trigger('focus');}});
  let userPaused=false;
  function updateMotion(){
    const paused=userPaused||reduced.matches;page.classList.toggle('ds-paused',paused);
    $('.ds-motion-switch').attr({'aria-pressed':String(paused),'aria-label':paused?'Retomar animações':'Pausar animações'});
    $('[data-motion-label]').text(reduced.matches?'Movimento reduzido':paused?'Em pausa':'Em movimento');
    $('#motion-status').text(reduced.matches?'Preferência do sistema':paused?'Movimento pausado':'Movimento ativo');
    $('#motion-speed').prop('disabled',paused);$('#replay-motion').prop('disabled',paused);
  }
  $('.ds-motion-switch').on('click',()=>{if(reduced.matches){toast('Movimento reduzido está ativo nas preferências do seu sistema.');return;}userPaused=!userPaused;updateMotion();});
  reduced.addEventListener('change',updateMotion);updateMotion();
  $('#motion-speed').on('input',function(){const value=Number(this.value);page.style.setProperty('--ds-duration',value);$('#speed-label').text(`${value===1?'Natural':value<1?'Contemplativo':'Energético'} · ${value.toLocaleString('pt-BR')}×`);});
  if('IntersectionObserver' in window){
    page.classList.add('ds-enhanced');
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.07,rootMargin:'0px 0px -25px 0px'});
    document.querySelectorAll('.ds-reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${Math.min(i%3,2)*80}ms`);observer.observe(el);});
    const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){$('.ds-nav a').removeClass('is-active');$(`.ds-nav a[href="#${e.target.id}"]`).addClass('is-active');}}),{rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('#fundamentos,#componentes,#movimento').forEach(el=>navObserver.observe(el));
  }
  $('#replay-motion').on('click',()=>{
    if(userPaused||reduced.matches)return;
    const cards=[...document.querySelectorAll('.ds-motion-card')];cards.forEach(c=>c.classList.remove('is-visible'));
    setTimeout(()=>cards.forEach((c,i)=>setTimeout(()=>c.classList.add('is-visible'),i*80)),80);
  });
  $('.ds-glow-card').on('pointermove',function(e){if(reduced.matches||userPaused)return;const rect=this.getBoundingClientRect();this.style.setProperty('--pointer-x',`${e.clientX-rect.left}px`);this.style.setProperty('--pointer-y',`${e.clientY-rect.top}px`);});
  $('a[href^="#"]').not('[data-open-modal]').on('click',function(e){
    const target=document.querySelector(this.getAttribute('href'));if(!target)return;e.preventDefault();
    const top=target.getBoundingClientRect().top+window.scrollY-85;
    window.scrollTo({top,behavior:reduced.matches||userPaused?'instant':'smooth'});
    if(target.id)history.replaceState(null,'','#'+target.id);
  });
});
