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
    hoja.appendRow(["FECHA Y HORA", "DNI", "PERSONAJE JUGADO", "CALIFICACIÓN (ESTRELLAS)", "RESULTADO DEL JUEGO"]);
    hoja.getRange("A1:E1").setFontWeight("bold").setBackground("#ff8800").setFontColor("#ffffff");
    hoja.setFrozenRows(1);
  }

  // 4. Guardamos la fila
  hoja.appendRow([
    datos.fecha,
    datos.dni,
    datos.personaje,
    datos.estrellas,
    datos.estado
  ]);
}

/**
 * Obtiene 3 preguntas aleatorias desde la hoja de cálculo "Trivia ruleta".
 */
function obtenerPreguntasAleatorias() {
  var idTrivia = "1JRIWwsiZyBWhVM9DN_KMEdkDVM0m7Izqmi_p-QonoBE";
  var libroTrivia = SpreadsheetApp.openById(idTrivia);
  var hoja = libroTrivia.getSheets()[0];

  // Obtener todos los datos (ignora la fila 1 si son encabezados)
  var datos = hoja.getDataRange().getValues();
  var preguntas = [];

  // Asumiendo la estructura del CSV:
  // [0] Unnamed, [1] Pregunta, [2] Op A, [3] Op B, [4] Op C, [5] Op D, [6] Respuesta, [7] Nivel, [8] Tema
  for (var i = 1; i < datos.length; i++) {
    var fila = datos[i];
    if (fila[1]) { // Verifica que haya una pregunta
      preguntas.push({
        pregunta: fila[1],
        opciones: [fila[2], fila[3], fila[4], fila[5]],
        correcta: fila[6]
      });
    }
  }

  // Mezclar el array (algoritmo Fisher-Yates)
  for (var i = preguntas.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = preguntas[i];
    preguntas[i] = preguntas[j];
    preguntas[j] = temp;
  }

  // Devolver solo 3 preguntas
  return preguntas.slice(0, 3);
}

/**
 * Recibe los datos del Quiz desde el juego y los guarda en una nueva fila.
 */
function guardarResultadosQuiz(datos) {
  // 1. Abrimos el documento EXCLUSIVAMENTE por su ID
  var libro = SpreadsheetApp.openById("1JRIWwsiZyBWhVM9DN_KMEdkDVM0m7Izqmi_p-QonoBE");

  // 2. Busca si ya existe la pestaña "ResultadosQuiz"
  var hoja = libro.getSheetByName("ResultadosQuiz");

  // 3. Si la hoja no existe, la crea y le pone los encabezados (títulos ampliados)
  if (!hoja) {
    hoja = libro.insertSheet("ResultadosQuiz");
    hoja.appendRow([
      "FECHA Y HORA", "NIVEL DE JUEGO", "PERSONAJE",
      "PREGUNTA 1", "TU RESPUESTA 1", "CORRECTA 1",
      "PREGUNTA 2", "TU RESPUESTA 2", "CORRECTA 2",
      "PREGUNTA 3", "TU RESPUESTA 3", "CORRECTA 3",
      "PUNTAJE", "RESULTADO FINAL"
    ]);
    hoja.getRange("A1:N1").setFontWeight("bold").setBackground("#00eeff").setFontColor("#000000");
    hoja.setFrozenRows(1);
  }

  // 4. Preparamos el array de datos asegurándonos de que si faltan preguntas no de error
  var p1 = datos.detalle[0] || { p: "-", r: "-", c: "-" };
  var p2 = datos.detalle[1] || { p: "-", r: "-", c: "-" };
  var p3 = datos.detalle[2] || { p: "-", r: "-", c: "-" };

  // 5. Añade la nueva fila
  hoja.appendRow([
    datos.fecha,
    datos.nivel,
    datos.personaje,
    p1.p, p1.r, p1.c,
    p2.p, p2.r, p2.c,
    p3.p, p3.r, p3.c,
    datos.puntaje + " / " + datos.totalPreguntas,
    datos.resultado
  ]);
}
