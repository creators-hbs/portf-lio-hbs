const categories = Object.freeze({
  accounting: 'Contabilidade',
  forensicPhysiotherapy: 'Fisioterapeuta Forense',
  dentistry: 'Odontologia',
  homeCare: 'Home Care',
  psychology: 'Psicologia',
  chineseMedicine: 'Medicina Chinesa',
  realEstate: 'Imóveis',
  tourism: 'Turismo',
  places: 'Imóveis, Turismo e Hospitalidade',
  commerce: 'Comércio e Produtos',
  agro: 'Agro e Tecnologia'
});
/* Fonte única do catálogo. URLs preservadas conforme o briefing. */
const projects = [
  ['niklausstretwaer','Niklaus Streetwear','https://niklausstretwaer.com.br','commerce'],
  ['sardoimobiliaria','Sardo Imobiliária','https://sardoimobiliaria.com.br','realEstate'],
  ['vivianesilva','Viviane Silva','https://vivianesilva.com.br','realEstate'],
  ['carrano360','Carrano 360','https://carrano360.com','commerce'],
  ['clinicadepsicologiamb','Clínica de Psicologia MB','https://clinicadepsicologiamb.com.br','psychology'],
  ['equilibrioeharmonia','Equilíbrio e Harmonia','https://equilibrioeharmonia.com.br','chineseMedicine'],
  ['bellagioviagens','Bellagio Viagens','https://bellagioviagens.com.br','tourism'],
  ['periciadesucesso','Perícia de Sucesso','https://periciadesucesso.com.br','forensicPhysiotherapy'],
  ['3dton','3D Ton','https://3dton.com.br/','commerce'],
  ['myodontologia','My Odontologia','https://myodontologia.com.br/','dentistry'],
  ['longevcare','Longev Care','https://longevcare.com.br/','homeCare'],
  ['mastersoloagro','Master Solo Agro','https://mastersoloagro.com.br/','agro'],
  ['fmconciergestays','FM Concierge Stays','https://fmconciergestays.com.br/','places'],
  ['porcinienevesconsultoria','Porcini e Neves Consultoria','https://porcinienevesconsultoria.com.br','accounting'],
  ['bxmed','BX Med','https://bxmed.com.br','accounting'],
  ['bhaskaraconsult','Bhaskara Consult','https://bhaskaraconsult.com.br','accounting'],
  ['maosquetocam','Mãos que Tocam','https://maosquetocam.com.br','homeCare'],
  ['mendescondominios','Mendes Soluções Condominiais','https://mendescondominios.com.br','places'],
  ['tres16agrogeo','Três16 Agrogeo','https://tres16agrogeo.com.br','agro'],
  ['bancadadotenis','Bancada do Tênis','https://bancadadotenis.com.br','commerce'],
  ['kingfit','King Fit','https://kingfit.com.br','commerce'],
  ['contabillogus','Contábil Logus','https://contabillogus.com.br/','accounting']
].map(([id,name,url,categoryId]) => ({id,name,url,categoryId,category:categories[categoryId],thumbnail:`assets/cards/${id}.jpg`,image:`assets/full/${id}.png`}));
