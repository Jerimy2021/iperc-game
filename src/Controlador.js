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
/**
 * Recibe los datos del Quiz desde el juego y los guarda en una nueva fila.
 */
function guardarResultadosQuiz(datos) {
  // 1. Abrimos el documento EXCLUSIVAMENTE por su ID
  var libro = SpreadsheetApp.openById("1WYTSFB5EQzlRsE-nviv_Re19NoxATwG_8Hromo53_JM");

  // 2. Busca si ya existe la pestaña "ResultadosQuiz"
  var hoja = libro.getSheetByName("ResultadosQuiz");

  // 3. Si la hoja no existe, la crea y le pone los encabezados (títulos)
  if (!hoja) {
    hoja = libro.insertSheet("ResultadosQuiz");
    hoja.appendRow(["FECHA Y HORA", "NIVEL DE JUEGO", "PERSONAJE", "RESPUESTAS CORRECTAS", "TOTAL PREGUNTAS", "RESULTADO FINAL"]);
    hoja.getRange("A1:F1").setFontWeight("bold").setBackground("#00eeff").setFontColor("#000000");
    hoja.setFrozenRows(1); // Fija la primera fila
  }

  // 4. Añade la nueva fila con la información del jugador que acaba de terminar el quiz
  hoja.appendRow([
    datos.fecha,
    datos.nivel,
    datos.personaje,
    datos.puntaje,
    datos.totalPreguntas,
    datos.resultado
  ]);
}

/**
 * Recibe los datos de la Encuesta Final y los guarda en una hoja separada.
 */
function guardarEncuestaFinal(datos) {
  // 1. Abrimos el mismo documento
  var libro = SpreadsheetApp.openById("1WYTSFB5EQzlRsE-nviv_Re19NoxATwG_8Hromo53_JM");

  // 2. Buscamos la pestaña "EncuestaFinal"
  var hoja = libro.getSheetByName("EncuestaFinal");

  // 3. Si no existe, la creamos con sus propios títulos
  if (!hoja) {
    hoja = libro.insertSheet("EncuestaFinal");
    hoja.appendRow(["FECHA Y HORA", "PERSONAJE JUGADO", "CALIFICACIÓN (ESTRELLAS)", "RESULTADO DEL JUEGO"]);
    // Le ponemos color naranja para diferenciarla de la del Quiz
    hoja.getRange("A1:D1").setFontWeight("bold").setBackground("#ff8800").setFontColor("#ffffff");
    hoja.setFrozenRows(1);
  }

  // 4. Guardamos la fila
  hoja.appendRow([
    datos.fecha,
    datos.personaje,
    datos.estrellas,
    datos.estado // (Si ganó o perdió el juego)
  ]);
}
