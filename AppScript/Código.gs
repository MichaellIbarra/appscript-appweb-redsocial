const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheetName = e.parameter.hoja; // Obtener el valor del campo "hoja" enviado desde el formulario HTML

    const sheet = doc.getSheetByName(sheetName);

    // Obtener los datos enviados desde el formulario HTML
    const data = [];
    for (const paramName in e.parameter) {
      if (paramName !== 'hoja') { // Ignorar el parámetro 'hoja'
        data.push(e.parameter[paramName]);
      }
    }
    // Obtener la última columna no vacía en la fila 0 y agregar 1 para obtener la siguiente columna vacía
    const lastColumn = sheet.getLastColumn();
    const nextColumn = lastColumn + 1;

    // Colocar los datos en la fila 0 en la siguiente columna vacía
    sheet.getRange(1, nextColumn, 1, data.length).setValues([data]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'column': nextColumn }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}