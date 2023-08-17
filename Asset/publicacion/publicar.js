var spreadsheetId = '1ytH6wsx2XmXWXwxK08Vj5DHpabHrr_f8qOFb458c_Co';
var hoja = 'Respuestas de formulario 1';
var apiKey = 'AIzaSyAmCLwuc94_hiXPDcVsYWV7toMyPqsrot8';
var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${hoja}?key=${apiKey}`;

var datosTabla = document.getElementById('datosTabla').getElementsByTagName('tbody')[0];
var dataValues;

fetch(url)
    .then(response => response.json())
    .then(data => {
        dataValues = data.values;

        // Mostrar todos los registros automáticamente
        for (var i = 0; i < dataValues.length; i++) {
            var newRow = datosTabla.insertRow();
            dataValues[i].forEach(cellValue => {
                var cell = newRow.insertCell();
                cell.appendChild(document.createTextNode(cellValue));
            });
        }
    });