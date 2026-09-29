const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const projects = vm.runInNewContext(fs.readFileSync('projects.js','utf8')+';projects');
assert.equal(projects.length,22);
assert.equal(new Set(projects.map(p=>p.url.replace(/\/$/,''))).size,22);
assert.equal(new Set(projects.map(p=>p.id)).size,22);
for(const project of projects){
  assert.equal(new URL(project.url).protocol,'https:');
  for(const file of [project.image,project.thumbnail]) assert.ok(fs.existsSync(file),file);
  const original=fs.readdirSync('.').find(f=>f.startsWith(`screencapture-${project.id}-`));
  assert.ok(original,project.id);
  assert.ok(fs.readFileSync(original).equals(fs.readFileSync(project.image)),`Captura original: ${project.id}`);
}
console.log('OK: 22 projetos únicos, URLs HTTPS, 44 assets e capturas integrais idênticas aos originais.');
