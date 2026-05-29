function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('IPERC ZONE — Educación en Seguridad Industrial')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
