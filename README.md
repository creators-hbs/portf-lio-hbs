# Portfólio interno HBS

Página estática em português, sem dependências ou etapa de build. Execute `npm.cmd start` no PowerShell (ou `npm start` em outros terminais) e abra http://localhost:4173. Também é possível abrir `index.html` diretamente. Requer Node.js para servidor e verificações.

`npm.cmd run check` verifica sintaxe, 22 registros sem duplicação, assets e igualdade binária entre capturas completas e originais.

Validação executada: verificação de catálogo e sintaxe aprovada; servidor local respondendo HTTP 200. A ferramenta de prévia informou que não há navegador disponível, portanto a verificação visual desktop/mobile e a interação por teclado ainda precisam de conferência manual.

- `projects.js`: fonte única dos nomes, URLs, categorias e imagens.
- `index.html`, `styles.css`, `app.js`: estrutura, identidade e interações.
- `assets/cards`: recortes superiores JPEG de 800 × 600, sem deformação.
- `assets/full`: cópias integrais PNG com nomes estáveis.
- `assets/fonts`: Sora local fornecida pelo design system.
- `assets/logo_hbs.png`: logo oficial original sobre branco, exibida em 180 px no desktop e 120 px no celular, sem recolorir ou deformar. O nome logo_hbs(1).png não foi encontrado; foi inspecionado e usado o original logo_hbs.png disponível.

Originais da raiz e design system preservados. O arquivo `Portfólio HBS - Copia(1).zip` não estava presente na pasta; as 22 capturas extraídas estavam disponíveis. Nenhuma imagem fictícia foi usada.

Categorias baseadas nas capturas: BX Med é contabilidade médica, King Fit é vestuário e Viviane Silva é imobiliário. Nomes e URLs do briefing preservados, inclusive a grafia do domínio niklausstretwaer.com.br. A miniatura Carrano 360 mostra uma loja de motos; o vínculo ao domínio foi mantido conforme arquivo/briefing. Disponibilidade dos sites externos não foi auditada.

Identidade visual HBS: tokens reutilizáveis em `styles.css`. Branco #FFFFFF no fundo e no visualizador; azul-marinho #021F47 em títulos, texto principal e filtro selecionado; azul médio #1C4A8A em links, botões, hover e foco; azul-claro #6FC6FC em indicadores e na linha do filtro ativo. Neutros derivados: #F3F7FC em superfícies, #E7F2FC no hover suave, #506580 em texto secundário, #D6E1EF em divisórias e #7388A3 nas bordas de controles. Estados desabilitados: fundo #E8EEF5 e texto #5C6C80. Sora local e estrutura responsiva preservadas. As capturas mantêm suas cores originais.

Revisão da paleta: `npm.cmd run check` aprovado. Não há aplicativo ou navegador disponível na ferramenta de prévia; revisão visual desktop/mobile permanece pendente. Nenhum deploy realizado.
O visualizador usa dialog nativo, com foco modal, Escape, fechamento explícito e retorno de foco. Imagens completas carregam somente ao abrir; a grade usa miniaturas e carregamento tardio. Não há autenticação, serviços externos, rastreamento ou deploy.
