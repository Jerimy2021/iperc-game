var ID_EXCEL_BASE_DATOS = "1JRIWwsiZyBWhVM9DN_KMEdkDVM0m7Izqmi_p-QonoBE";

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

// ==========================================
// 1. QUIZ: FIN DE NIVEL -> Guarda en "ResultadosQuiz" (Sin IDs, por compatibilidad)
//                       -> Y TAMBIÉN en "ResultadosQuiz2" (Con IDs, nueva estructura)
// ==========================================
function guardarResultadosQuiz(datos) {
  var libro = SpreadsheetApp.openById(ID_EXCEL_BASE_DATOS);

  // --- GUARDADO LEGACY (Sin IDs) en "ResultadosQuiz" ---
  var hojaLegacy = libro.getSheetByName("ResultadosQuiz");
  if (!hojaLegacy) hojaLegacy = libro.insertSheet("ResultadosQuiz");

  if (hojaLegacy.getLastRow() === 0) {
    hojaLegacy.appendRow([
      "FECHA Y HORA", "NIVEL DE JUEGO", "PERSONAJE",
      "PREGUNTA 1", "TU RESPUESTA 1", "CORRECTA 1",
      "PREGUNTA 2", "TU RESPUESTA 2", "CORRECTA 2",
      "PREGUNTA 3", "TU RESPUESTA 3", "CORRECTA 3",
      "PUNTAJE", "RESULTADO FINAL"
    ]);
    hojaLegacy.getRange("A1:N1").setFontWeight("bold").setBackground("#00eeff").setFontColor("#000000");
    hojaLegacy.setFrozenRows(1);
  }

  var detalle = datos.detalle || [];
  var p1 = detalle[0] || { p: "-", r: "-", c: "-" };
  var p2 = detalle[1] || { p: "-", r: "-", c: "-" };
  var p3 = detalle[2] || { p: "-", r: "-", c: "-" };

  hojaLegacy.appendRow([
    datos.fecha, datos.nivel, datos.personaje,
    p1.p, p1.r, p1.c,
    p2.p, p2.r, p2.c,
    p3.p, p3.r, p3.c,
    datos.puntaje + " / " + datos.totalPreguntas, datos.resultado
  ]);

  // --- GUARDADO NUEVO (Con IDs) en "ResultadosQuiz2" ---
  var hojaNueva = libro.getSheetByName("ResultadosQuiz2");
  if (!hojaNueva) hojaNueva = libro.insertSheet("ResultadosQuiz2");

  if (hojaNueva.getLastRow() === 0) {
    hojaNueva.appendRow([
      "FECHA Y HORA", "ID PAÍS", "ID OPERACIÓN", "NIVEL DE JUEGO", "PERSONAJE",
      "PREGUNTA 1", "TU RESPUESTA 1", "CORRECTA 1",
      "PREGUNTA 2", "TU RESPUESTA 2", "CORRECTA 2",
      "PREGUNTA 3", "TU RESPUESTA 3", "CORRECTA 3",
      "PUNTAJE", "RESULTADO FINAL"
    ]);
    hojaNueva.getRange("A1:P1").setFontWeight("bold").setBackground("#00eeff").setFontColor("#000000");
    hojaNueva.setFrozenRows(1);
  }

  hojaNueva.appendRow([
    datos.fecha, datos.paisId, datos.operacionId, datos.nivel, datos.personaje,
    p1.p, p1.r, p1.c,
    p2.p, p2.r, p2.c,
    p3.p, p3.r, p3.c,
    datos.puntaje + " / " + datos.totalPreguntas, datos.resultado
  ]);
}

// ==========================================
// 2. QUIZ: PORTAL RÁPIDO -> Guarda en "ResultadosQuiz1" (Solo data disponible)
// ==========================================
function guardarResultadosQuizPortalRapido(datos) {
  var libro = SpreadsheetApp.openById(ID_EXCEL_BASE_DATOS);
  var hoja = libro.getSheetByName("ResultadosQuiz1");

  if (!hoja) {
    hoja = libro.insertSheet("ResultadosQuiz1");
  }

  // Seguro de encabezados: Solo las columnas de las que sí tenemos datos
  if (hoja.getLastRow() === 0) {
    hoja.appendRow([
      "FECHA Y HORA",
      "ID PAÍS",
      "ID OPERACIÓN",
      "NIVEL DE JUEGO",
      "PERSONAJE",
      "PUNTAJE",
      "RESULTADO FINAL"
    ]);
    hoja.getRange("A1:G1").setFontWeight("bold").setBackground("#9900ff").setFontColor("#ffffff");
    hoja.setFrozenRows(1);
  }

  // Guardamos exactamente la data que recibe del Frontend
  hoja.appendRow([
    datos.fecha,
    datos.paisId,
    datos.operacionId,
    datos.nivel,
    datos.personaje,
    datos.puntaje + " / " + datos.totalPreguntas,
    datos.resultado
  ]);
}

// ==========================================
// 3. GUARDAR ENCUESTA FINAL -> Guarda en "EncuestaFinal"
// ==========================================
function guardarEncuestaFinal(datos) {
  var libro = SpreadsheetApp.openById(ID_EXCEL_BASE_DATOS);
  var hoja = libro.getSheetByName("EncuestaFinal");

  if (!hoja) {
    hoja = libro.insertSheet("EncuestaFinal");
  }

  if (hoja.getLastRow() === 0) {
    hoja.appendRow(["FECHA Y HORA", "ID PAÍS", "ID OPERACIÓN", "DNI", "PERSONAJE JUGADO", "CALIFICACIÓN", "ESTADO"]);
    hoja.getRange("A1:G1").setFontWeight("bold").setBackground("#ff8800").setFontColor("#ffffff");
    hoja.setFrozenRows(1);
  }

  hoja.appendRow([
    datos.fecha, datos.paisId, datos.operacionId, datos.dni,
    datos.personaje, datos.estrellas, datos.estado
  ]);
}

// ==========================================
// 4. OBTENER DATOS DE UBICACIÓN
// ==========================================
function obtenerDatosUbicacion() {
  var libro = SpreadsheetApp.openById(ID_EXCEL_BASE_DATOS);
  var hoja = libro.getSheetByName("Planta");
  if (!hoja) return { operaciones: [], paises: [] };
  var datos = hoja.getDataRange().getValues();
  var operaciones = [], paises = [];
  for (var i = 1; i < datos.length; i++) {
    if (datos[i][0] && datos[i][0] !== "") operaciones.push({ id: datos[i][0], label: datos[i][3] });
    if (datos[i][5] && datos[i][5] !== "") paises.push({ id: datos[i][5], label: datos[i][6] });
  }
  return { operaciones: operaciones, paises: paises };
}

// ==========================================
// 5. OBTENER PREGUNTAS ALEATORIAS
// ==========================================
function obtenerPreguntasAleatorias() {
  var libroTrivia = SpreadsheetApp.openById(ID_EXCEL_BASE_DATOS);
  var hoja = libroTrivia.getSheets()[0];
  var datos = hoja.getDataRange().getValues();
  var preguntas = [];
  for (var i = 1; i < datos.length; i++) {
    if (datos[i][1]) {
      preguntas.push({
        pregunta: datos[i][1],
        opciones: [datos[i][2], datos[i][3], datos[i][4], datos[i][5]],
        correcta: datos[i][6]
      });
    }
  }
  for (var i = preguntas.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = preguntas[i];
    preguntas[i] = preguntas[j];
    preguntas[j] = temp;
  }
  return preguntas.slice(0, 3);
}
