const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = ['assets/data/projects.js', 'assets/js/catalog.js'].map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const { projects, categories, normalizeQuery, selectProjects, copyProjectUrl } = vm.runInNewContext(
  `${source}; ({projects,categories,normalizeQuery,selectProjects,copyProjectUrl})`, { URL }
);
const ids = items => Array.from(items, p => p.id);

test('busca normaliza caixa, acentos e espaços repetidos', () => {
  assert.equal(normalizeQuery('  CLÍNICA   de PSICOLOGIA  '), 'clinica de psicologia');
  assert.deepEqual(ids(selectProjects(projects, 'all', '  CLINICA   PSICOLOGIA ')), ['clinicadepsicologiamb']);
  assert.deepEqual(ids(selectProjects(projects, 'all', 'MÃOS')), ['maosquetocam']);
  assert.deepEqual(ids(selectProjects(projects, 'all', 'maos')), ['maosquetocam']);
});
test('busca por domínio e categoria renomeada', () => {
  assert.deepEqual(ids(selectProjects(projects, 'all', 'bxmed.com.br')), ['bxmed']);
  assert.deepEqual(ids(selectProjects(projects, 'realEstate', '')), ['sardoimobiliaria', 'vivianesilva']);
  assert.deepEqual(ids(selectProjects(projects, 'tourism', '')), ['bellagioviagens']);
  assert.deepEqual(ids(selectProjects(projects, 'places', '')), ['fmconciergestays', 'mendescondominios']);
  assert.equal(categories.places, 'Imóveis, Turismo e Hospitalidade');
});
test('todos os filtros exclusivos e suas contagens', () => {
  const counts = { accounting:4, forensicPhysiotherapy:1, dentistry:1, homeCare:2, psychology:1, chineseMedicine:1, realEstate:2, tourism:1, places:2, commerce:5, agro:2 };
  for (const [id, count] of Object.entries(counts)) {
    const result = selectProjects(projects, id, '');
    assert.equal(result.length, count);
    assert.ok(result.every(p => p.categoryId === id && p.category === categories[id]));
  }
});
test('cards de contabilidade e saúde seguem a distribuição solicitada', () => {
  const expected = {
    accounting: ['porcinienevesconsultoria','bxmed','bhaskaraconsult','contabillogus'],
    forensicPhysiotherapy: ['periciadesucesso'],
    dentistry: ['myodontologia'],
    homeCare: ['longevcare','maosquetocam'],
    psychology: ['clinicadepsicologiamb'],
    chineseMedicine: ['equilibrioeharmonia']
  };
  for (const [category, members] of Object.entries(expected)) {
    assert.deepEqual(ids(selectProjects(projects, category, '')), members);
  }
});
test('busca e filtro se combinam, incluindo estado vazio', () => {
  assert.deepEqual(ids(selectProjects(projects, 'accounting', 'BX')), ['bxmed']);
  assert.equal(selectProjects(projects, 'homeCare', 'BX').length, 0);
  assert.equal(selectProjects(projects, 'all', 'inexistente-xyz').length, 0);
});
test('limpeza retorna 22 projetos na ordem original', () => {
  assert.deepEqual(ids(selectProjects(projects, 'all', '   ')), ids(projects));
  assert.equal(selectProjects(projects, 'all', '').length, 22);
});
test('domínios correspondem aos identificadores das capturas', () => {
  for (const p of projects) {
    assert.equal(new URL(p.url).hostname.replace(/\.com(?:\.br)?$/, ''), p.id);
    assert.equal(p.image, `assets/full/${p.id}.png`);
    assert.equal(p.thumbnail, `assets/cards/${p.id}.jpg`);
  }
});
test('cópia usa a URL exata de cada um dos 22 sites', async () => {
  for (const p of projects) {
    let received;
    assert.equal(await copyProjectUrl(p.url, { writeText: async text => { received = text; } }), true);
    assert.equal(received, p.url);
  }
});
test('cópia recusada ou indisponível sinaliza alternativa manual', async () => {
  assert.equal(await copyProjectUrl(projects[0].url, {}), false);
  assert.equal(await copyProjectUrl(projects[0].url, null), false);
  assert.equal(await copyProjectUrl(projects[0].url, { writeText: async () => { throw new Error('Denied'); } }), false);
});
test('contraste dos pares usados em texto atende WCAG AA', () => {
  const luminance = hex => {
    const c = hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
    return c[0]*.2126+c[1]*.7152+c[2]*.0722;
  };
  for (const [fg,bg,min] of [
    ['021F47','FFFFFF',4.5], ['1C4A8A','FFFFFF',4.5],
    ['506580','FFFFFF',4.5], ['506580','F3F7FC',4.5],
    ['FFFFFF','021F47',4.5], ['FFFFFF','1C4A8A',4.5],
    ['7388A3','F3F7FC',3], ['1C4A8A','E7F2FC',4.5]
  ]) {
    const a = luminance(fg), b = luminance(bg);
    assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05) >= min, `${fg}/${bg}`);
  }
});
