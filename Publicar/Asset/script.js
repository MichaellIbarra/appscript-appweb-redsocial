function extractDriveImageUrl(cellValue) {
    var imageRegex = /https:\/\/drive\.google\.com\/open\?id=([\w-]+)/;
    var videoRegex = /https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view/;
    var imageMatches = cellValue.match(imageRegex);
    var videoMatches = cellValue.match(videoRegex);
    if (imageMatches && imageMatches.length > 1) {
        var imageId = imageMatches[1];
        return `http://drive.google.com/uc?export=view&id=${imageId}`;
    }
    if (videoMatches && videoMatches.length > 1) {
        var videoId = videoMatches[1];
        return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    return '';
}

var spreadsheetId = '1ytH6wsx2XmXWXwxK08Vj5DHpabHrr_f8qOFb458c_Co';
var hoja = 'Respuestas de formulario 1';
var apiKey = 'AIzaSyAmCLwuc94_hiXPDcVsYWV7toMyPqsrot8';

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
                var enlace = document.createElement('a');
                enlace.href = cellValue;
                enlace.target = '_blank';

                var img = document.createElement('img');
                img.src = extractDriveImageUrl(cellValue);
                img.style.maxWidth = '100px';
                img.style.height = 'auto';

                enlace.appendChild(img);
                cell.appendChild(enlace);
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