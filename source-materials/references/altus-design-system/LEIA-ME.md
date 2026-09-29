# Altus — Design System portátil

Abra **design_system.html** (ou **index.html**) diretamente no navegador.
Não é necessário instalar programas, executar comandos ou iniciar um servidor.

## Como transportar

Copie ou mova a pasta **altus-design-system inteira** para o local desejado.
Você pode renomear a pasta. Mantenha sua estrutura interna e a pasta assets ao lado dos arquivos HTML.
Não mova apenas o HTML: imagens, fontes, estilos e scripts são arquivos locais separados.

## Estrutura

- design_system.html — vitrine interativa principal.
- index.html — atalho para abrir a vitrine.
- referencia.html — página original acessível pelo link no rodapé da vitrine.
- assets/css/ — estilos, responsividade e animações.
- assets/js/ — bibliotecas, recursos dinâmicos e interações.
- assets/fonts/ — fontes locais.
- assets/images/ e assets/icons/ — imagens e ícones.
- Demais arquivos em assets/ — recursos preservados da página de referência.

## Funcionamento

A vitrine principal funciona offline: imagens, fontes, animações, paleta, ícones, formulário de demonstração e modal.
O formulário da vitrine apenas valida os dados localmente; ele não envia informações.
Na página de referência, vídeos do YouTube, links externos e serviços do WordPress continuam precisando de internet.

Todos os caminhos internos são relativos. Este pacote não depende de arquivos da pasta original do projeto.
