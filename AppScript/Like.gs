function doPost(e) {
  var hojaNombre = e.parameter.hoja;
  var celda = e.parameter.celda;
  var spreadsheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('key'));
  var hojaa = spreadsheet.getSheetByName(hojaNombre);
  var rango = hojaa.getRange(celda);
  var valorActual = rango.getValue();
  var nuevoValor = valorActual + 1;
  rango.setValue(nuevoValor);

  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('key'));
    const sheetName = e.parameter.hoja;

    const sheet = doc.getSheetByName(sheetName);

    const data = [];
    for (const paramName in e.parameter) {
      if (paramName !== 'hoja' && paramName !== 'celda') {
        data.push(e.parameter[paramName]);
      }
    }

    const lastColumn = sheet.getLastColumn();
    const nextColumn = lastColumn + 1;

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
