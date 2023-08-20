function doGet() {
  var usuariosAutorizados = ["michaell.ibarra@vallegrande.edu.pe", "omar.rvera@vallegrande.edu.pe", "noelia.napan@vallegrande.edu.pe","paolo.quispe@vallegrande.edu.pe","alonso.vicente@vallegrande.edu.pe"];
  var usuarioActual = Session.getActiveUser().getEmail();
  if (usuariosAutorizados.includes(usuarioActual)) {
    return HtmlService.createHtmlOutputFromFile('inicio');
  } else {
    return HtmlService.createHtmlOutputFromFile('denegado');
  }
}

function getData() {
  //poder visualizar en una hojade calculo
  var sheet = SpreadsheetApp.openById('1ytH6wsx2XmXWXwxK08Vj5DHpabHrr_f8qOFb458c_Co');
  var data = sheet.getSheetByName('Respuestas de formulario 1').getDataRange().getValues();
  return data;
}

function enviarDatosDesdeHTML(nombreHoja, contenidoCelda1, contenidoCelda2, contenidoCelda3) {
  //sistema de poner valores en esta hoja
  var idHojaDestino = "1IO8BIE58F3D70EMkY-KIwl1A6sOw90fZTQwRcuzc9jc"; // Cambia esto por el ID real de la hoja de destino
  var hojaDestino = SpreadsheetApp.openById(idHojaDestino).getSheetByName(nombreHoja);

  if (!hojaDestino) {
    hojaDestino = SpreadsheetApp.openById(idHojaDestino).insertSheet(nombreHoja);
  }

  hojaDestino.getRange(1, 1).setValue(contenidoCelda1);
  hojaDestino.getRange(1, 2).setValue(contenidoCelda2);
  hojaDestino.getRange(1, 3).setValue(contenidoCelda3);
}
