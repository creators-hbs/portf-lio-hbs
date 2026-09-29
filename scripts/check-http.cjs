const { spawn } = require('node:child_process');
const { once } = require('node:events');
const path = require('node:path');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = spawn(process.execPath, [path.join(__dirname, 'server.cjs')], {
  cwd: root, env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe']
});
const timeout = setTimeout(() => { server.kill(); process.exitCode = 1; }, 30000);
async function main() {
  try {
    const [chunk] = await once(server.stdout, 'data');
    const base = String(chunk).match(/http:\/\/localhost:\d+/)[0];
    const files = ['index.html'];
    function walk(directory) {
      for (const item of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
        const file = `${directory}/${item.name}`;
        if (item.isDirectory()) walk(file); else files.push(file);
      }
    }
    walk('assets');
    for (const file of files) {
      const response = await fetch(`${base}/${file}`);
      assert.equal(response.status, 200, file);
      assert.equal((await response.arrayBuffer()).byteLength, fs.statSync(path.join(root, file)).size, file);
    }
    for (const file of ['.git/config', 'source-materials/brand/logo_hbs.png', 'scripts/server.cjs']) {
      assert.equal((await fetch(`${base}/${file}`)).status, 404, file);
    }
    console.log(`OK: ${files.length} arquivos do site servidos integralmente via HTTP; materiais internos fora da prévia.`);
  } finally { clearTimeout(timeout); server.kill(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
