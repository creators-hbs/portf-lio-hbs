const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
process.chdir(path.resolve(__dirname, '..'));
const projects = vm.runInNewContext(fs.readFileSync('assets/data/projects.js','utf8')+';projects');
assert.equal(projects.length,22);
assert.equal(new Set(projects.map(p=>p.url.replace(/\/$/,''))).size,22);
assert.equal(new Set(projects.map(p=>p.id)).size,22);
for(const project of projects){
  assert.equal(new URL(project.url).protocol,'https:');
  for(const file of [project.image,project.thumbnail]) assert.ok(fs.existsSync(file),file);
  const original=fs.readdirSync('source-materials/screenshots').find(f=>f.startsWith(`screencapture-${project.id}-`));
  assert.ok(original,project.id);
  assert.ok(fs.readFileSync(path.join('source-materials/screenshots', original)).equals(fs.readFileSync(project.image)),`Captura original: ${project.id}`);
}
console.log('OK: 22 projetos únicos, URLs HTTPS, 44 assets e capturas integrais idênticas aos originais.');

// Validate exact spelling/case for case-sensitive hosting environments.
function checkLocal(file) {
  let directory = process.cwd();
  for (const segment of file.split('/')) {
    assert.ok(fs.readdirSync(directory).includes(segment), `Caminho/capitalização: ${file}`);
    directory = path.join(directory, segment);
  }
  assert.ok(fs.statSync(directory).isFile(), file);
}
for (const match of fs.readFileSync('index.html', 'utf8').matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (!match[1].startsWith('#') && match[1] !== './') checkLocal(match[1]);
}
for (const match of fs.readFileSync('assets/css/styles.css', 'utf8').matchAll(/url\(['"]?([^)'" ]+)/g)) {
  checkLocal(path.posix.normalize(path.posix.join('assets/css', match[1])));
}
for (const project of projects) [project.image, project.thumbnail].forEach(checkLocal);
console.log('OK: referências HTML/CSS e capitalização dos caminhos válidas.');
