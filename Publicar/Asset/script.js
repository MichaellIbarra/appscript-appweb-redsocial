function extractDriveImageUrl(cellValue) {
    var imageRegex = /https:\/\/drive\.google\.com\/open\?id=([\w-]+)/;
    var videoRegex = /https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view/;
    var imageMatches = cellValue.match(imageRegex);
    var videoMatches = cellValue.match(videoRegex);
    if (imageMatches && imageMatches.length > 1) {
        var imageId = imageMatches[1];
        return `https://drive.google.com/file/d/${imageId}/preview`; // Cambio aquí
    }
    if (videoMatches && videoMatches.length > 1) {
        var videoId = videoMatches[1];
        return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    return '';
}

var spreadsheetId = '1ytH6wsx2XmXWXwxK08Vj5DHpabHrr_f8qOFb458c_Co';
var hoja = 'Respuestas de formulario 1';
var apiKey = 'AIzaSyAeFyzG2EmC73knpgykBCEAg-DmOCV_Muw';

var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${hoja}?key=${apiKey}`;

var datosTabla = document.getElementById('datosTabla').getElementsByTagName('tbody')[0];
var dataValues;
var filasMostradas = 5; // Número de filas a mostrar inicialmente

function llenarTabla() {
    datosTabla.innerHTML = ''; // Limpiar la tabla
    for (var i = 1; i < filasMostradas + 1; i++) {
        var newRow = datosTabla.insertRow();
        // Aquí, en lugar de iterar sobre todas las celdas, itera solo sobre las primeras 5
        for (var j = 0; j < Math.min(dataValues[i].length, 5); j++) {
            var cellValue = dataValues[i][j];
            var cell = newRow.insertCell();

            if (j === 1) {
                var iframe = document.createElement('iframe');
                iframe.src = extractDriveImageUrl(cellValue);
                iframe.width = '150px';
                iframe.allow = 'autoplay';

                cell.appendChild(iframe);
            } else {
                cell.appendChild(document.createTextNode(cellValue));
            }
        }
    }
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        dataValues = data.values;
        llenarTabla();
    });

function mostrarMasNoticias() {
    filasMostradas += 5;
    llenarTabla();
}

function mostrarMenosNoticias() {
    filasMostradas = Math.max(filasMostradas - 5, 5); // Mínimo 5 filas mostradas
    llenarTabla();
}

