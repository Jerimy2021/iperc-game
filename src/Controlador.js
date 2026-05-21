function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    .evaluate()
    .setTitle('Misión IPERC: Arena')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function procesarMisionIPERC(datos) {
  // Lógica de juego simplificada (Ataque vs Defensa)
  let ataque = parseInt(datos.severidad) * parseInt(datos.exposicion); // Máximo 9
  let defensa = parseInt(datos.ingenieria) + parseInt(datos.epp);      // Máximo 4

  // Daño real que recibes
  let danio = ataque - defensa;
  if (danio < 0) danio = 0; // No puedes curarte con escudos

  // Calculamos tu vida restante (HP)
  let hpRestante = 100 - (danio * 10); // Multiplicamos por 10 para escalar a 100%
  if (hpRestante < 0) hpRestante = 0;

  let estado, clase;
  if (hpRestante >= 70) {
    estado = "SOBREVIVISTE (ACEPTABLE)";
    clase = "ACEPTABLE";
  } else if (hpRestante >= 40) {
    estado = "HERIDO (IMPORTANTE)";
    clase = "IMPORTANTE";
  } else {
    estado = "GAME OVER (INTOLERABLE)";
    clase = "INTOLERABLE";
  }

  return {
    hp: hpRestante,
    danioRecibido: danio * 10,
    estadoFinal: estado,
    claseCSS: clase
  };
}
