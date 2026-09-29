# Revisão do refinamento HBS

## Implementado

- Textos auxiliares, domínios, categorias, contadores e ações em 14 px; busca móvel em 16 px. Cards com ações em duas linhas, títulos com área reservada e barras de domínio uniformes.
- Abertura com padding vertical reduzido de 75/66 px para 40/36 px no desktop, sem altura fixa. Busca, filtros e resultados reunidos junto ao catálogo.
- Busca com um único contorno no componente, botão acessível de limpeza e consulta por palavras em nome, domínio e categoria. Normalização de caixa, acentos e espaços.
- Categorias definidas uma única vez no catálogo; seleção exclusiva com radios nativos. Não há números nos filtros nem ao lado de “Explore o acervo”.
- Cópia de URL nos cards e no visualizador, com feedback aria-live e diálogo para seleção manual quando Clipboard API falha ou está indisponível.
- Visualizador nativo modal com controles fora da área rolável, bloqueio de scroll de fundo, retorno de foco, ampliação para leitura e acesso à imagem original. Carregamentos anteriores não alteram a captura de um projeto aberto posteriormente.
- CSS reorganizado por componente com tokens compartilhados, sem camada duplicada de sobrescritas.

## Evidência da classificação

Revisão visual realizada sobre `docs/contact-sheet.jpg`, formada pelas capturas reais. Não foram alterados nomes, ordem, URLs ou correspondências de arquivos.

| Segmento | Projetos e conteúdo visível nas capturas |
| --- | --- |
| Contabilidade | Porcini e Neves (contabilidade estratégica); BX Med (contabilidade médica); Bhaskara (contabilidade); Contábil Logus (contabilidade para saúde). |
| Fisioterapeuta Forense | Perícia de Sucesso. A captura mostra literalmente “Fisioterapeuta Forense”; por isso a grafia foi corrigida em relação a “Florense” no pedido. |
| Odontologia | My Odontologia. |
| Home Care | Longev Care e Mãos que Tocam. |
| Psicologia | Clínica de Psicologia MB. |
| Medicina Chinesa | Equilíbrio e Harmonia. |
| Imóveis | Sardo Imobiliária e Viviane Silva (imóveis). |
| Turismo | Bellagio Viagens (viagens). |
| Imóveis, Turismo e Hospitalidade | FM Concierge Stays (hospedagem); Mendes (gestão condominial). A categoria anterior foi mantida para esses dois cards conforme pedido. |
| Comércio e Produtos | Niklaus e King Fit (vestuário); Carrano 360 (motos); 3D Ton (impressão 3D); Bancada do Tênis (produtos/equipamentos esportivos). |
| Agro e Tecnologia | Master Solo Agro (agricultura sustentável); Três16 Agrogeo (agricultura de precisão). |

## Verificado automaticamente

- `npm.cmd run check`: sintaxe, 22 projetos sem duplicatas, imagens integrais idênticas aos originais, referências HTML/CSS e capitalização válidas.
- Dez testes Node: normalização, buscas com/sem acentos, domínio, categoria, onze filtros, combinações, vazio, limpeza, correspondência domínio/arquivo, cópia exata para os 22 sites, rejeição/ausência da API de cópia e contraste dos pares de cores.
- `npm.cmd run check:http`: os 56 arquivos da página são servidos integralmente. Nenhum asset ausente.
- Comparação com Git HEAD: nomes, ordem, URLs e caminhos de imagem intactos.
- `git diff --check`: sem problemas de whitespace.

Os testes de cópia usam uma API simulada: verificam o tratamento de sucesso e falha, mas não validam o clipboard de um navegador real.

## Pendências manuais concretas

A ferramenta de navegação retornou inventário vazio de apps/navegadores. Não há screenshots da página refinada; a prancha existente mostra os projetos, não a nova interface. A página publicada também não pôde ser aberta pela ferramenta web.

Não foram aprovados visualmente os tamanhos 360, 390, 768, 1366 e 1920 px, nem zoom a 200%. Os breakpoints foram implementados, mas faltam evidências renderizadas de ausência de overflow, recortes e alinhamento.

Na revisão em navegador, verificar:

1. As cinco larguras e zoom a 200%, incluindo o filtro mais longo e os maiores nomes/domínios.
2. Tab, Shift+Tab, setas nos radios, Enter/Espaço, Escape e retorno de foco ao card.
3. Cópia real, anúncio de sucesso e diálogo manual quando a API estiver bloqueada.
4. Foco confinado ao diálogo nativo, inclusive no diálogo de cópia aberto sobre o visualizador.
5. Rolagem vertical, ampliação, imagem original, controles persistentes e ausência de scroll no fundo.
6. Falhas de rede de miniatura/captura, carregamento e ausência de erros no console.

Não há base para atribuir nota 9,5/10 sem concluir essas verificações. Integridade de dados, lógica isolada de busca/cópia, caminhos e contraste calculado passaram; acabamento renderizado e interação real continuam pendentes. Nenhum deploy realizado.
