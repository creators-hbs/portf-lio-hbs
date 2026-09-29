# Portfólio interno HBS

Catálogo estático de 22 sites, com filtros por segmento, busca, capturas completas em visualizador acessível e links para os sites publicados. HTML, CSS e JavaScript sem dependências externas; fontes locais.

## Executar

Requer Node.js 20 ou superior para o servidor e as verificações. Não é necessário instalar dependências.

```sh
npm start
```

Abra http://localhost:4173. No PowerShell com restrição de scripts, use `npm.cmd start`. Também é possível abrir `index.html` diretamente no navegador. Para mudar a porta no PowerShell: `$env:PORT = '4174'` antes de iniciar.

## Estrutura

```text
index.html                         Entrada do site
assets/
  brand/                           Logos usadas/disponíveis para a interface
  cards/                           22 miniaturas JPEG otimizadas
  full/                            22 capturas PNG integrais com nomes estáveis
  fonts/                           Fontes Sora locais
  css/styles.css                   Estilos responsivos e tokens HBS
  js/app.js                        Filtros, busca e visualizador
  data/projects.js                 Fonte única do catálogo
scripts/
  server.cjs                       Servidor local
  check.cjs                        Integridade do catálogo e caminhos
  check-http.cjs                   Verificação HTTP de todos os assets
source-materials/
  brand/                           Logos originais preservadas
  screenshots/                     Capturas originais com nomes de origem
  references/altus-design-system/   Referência fornecida, sem uso em runtime
docs/
  contact-sheet.jpg                Prancha de inspeção das capturas
  design-notes.md                   Identidade e decisões do catálogo
.gitignore                         Exclusões de arquivos locais/temporários
.gitattributes                     Tratamento de texto e arquivos binários
package.json                       Comandos do projeto
```

## Manutenção

Edite nomes, URLs e categorias em `assets/data/projects.js`. Caminhos de imagem nesse catálogo são relativos ao `index.html`, não ao arquivo JavaScript. Caminhos de fontes no CSS são relativos a `assets/css/`. Mantenha a ordem de carregamento: catálogo antes de `app.js`.

Edite os tokens de cor em `assets/css/styles.css`. Os materiais de referência não são carregados pelo site. Os originais e suas cópias de uso têm propósitos distintos e foram preservados sem alteração de conteúdo.

## Verificações antes do commit

```sh
npm run check
npm run check:http
```

No PowerShell, use `npm.cmd` caso necessário. A primeira verificação confere sintaxe, 22 projetos únicos, URLs HTTPS, igualdade binária das capturas e caminhos HTML/CSS, inclusive capitalização. A segunda inicia um servidor temporário em porta livre e verifica o conteúdo de todos os arquivos do site por HTTP.

A página não exige build. O Git já está inicializado; revise `git status` e `git diff` antes de preparar seu commit. Os materiais originais e de referência continuam versionáveis; o `.gitignore` exclui somente dependências, saídas, configurações locais e temporários.

## Hospedagem estática

A entrada permanece na raiz, com caminhos relativos compatíveis com uma subpasta de repositório. O conjunto necessário à publicação é `index.html` e `assets/`. `scripts/`, `docs/` e `source-materials/` não são necessários para servir o site. O servidor local expõe apenas a entrada e os assets; isso não configura regras em uma futura hospedagem externa.

Não foi criado commit nem realizado deploy. Não há autenticação ou rastreamento.

## Validação visual

Não há navegador conectado à ferramenta de prévia neste ambiente. A revisão visual e interativa em desktop/mobile permanece manual: conferir filtros, busca, abertura da captura, rolagem, Escape, retorno de foco e links externos.