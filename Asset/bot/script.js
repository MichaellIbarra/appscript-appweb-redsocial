document.getElementById("userInput").addEventListener("input", function () {
    var characterCount = this.value.length;
    document.getElementById("send-btn").disabled = characterCount < 3;
});

function extractDriveImageUrl(cellValue) { var imageRegex = /https:\/\/drive\.google\.com\/open\?id=([\w-]+)/; var videoRegex = /https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view/; var imageMatches = cellValue.match(imageRegex); var videoMatches = cellValue.match(videoRegex); if (imageMatches && imageMatches.length > 1) { var imageId = imageMatches[1]; return `http://drive.google.com/uc?export=view&id=${imageId}`; } if (videoMatches && videoMatches.length > 1) { var videoId = videoMatches[1]; return `https://drive.google.com/file/d/${videoId}/preview`; } return ''; }

var apiKey = 'AIzaSyAmCLwuc94_hiXPDcVsYWV7toMyPqsrot8', url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${hoja}?key=${apiKey}`;
w9wqhwdigwq
function enviarMensaje() {
    var userInput = document.getElementById('userInput').value.toLowerCase().trim(); if (userInput === '') { return; }
    var chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += '<div style="background-color:#00a884;" class="small p-2 ms-3 mb-3 rounded-3" role="alert">' + userInput + '</div>';
    function comentario(mensaje) { chatbox.innerHTML += '<div style="background-color:#1DA1F2;" class="small p-2 ms-3 mb-3 rounded-3" role="alert">' + mensaje + '</div>'; document.getElementById('userInput').value = ''; }
    const respuestas = {
        "hola": "holii :)",
        "como estás?": "bien y tu?",
        "bien": "me alegro mucho!",
        "mal": "pipipipip",
        "para que es está página web": "un chat bot para enterarte todas las noticias del colegio"
    };

    if (respuestas.hasOwnProperty(userInput)) { comentario(respuestas[userInput]); return; }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var respuesta = '', resultadosEncontrados = false;
            if (data.values && data.values.length > 0) {
                for (var i = 1; i < data.values.length; i++) {
                    var fila = data.values[i], titulo = fila[2].toLowerCase(), descripcion = fila[3].toLowerCase();
                    if (titulo.includes(userInput) || descripcion.includes(userInput)) {
                        var marcaTemporal = fila[0];
                        var fotoOVideo = extractDriveImageUrl(fila[1]);
                        var titulo = fila[2];
                        var descripcion = fila[3];
                        var categoria = fila[4];
                        respuesta += `<p><strong>Fecha de la Noticia:</strong> ${marcaTemporal}</p><a href="${fotoOVideo}" target="_blank"><img style="margin-bottom: 10px;" width="290" height="200" src="${fotoOVideo}" alt="Dar Click"></a><p><strong>Título:</strong> ${titulo}</p><p><strong>Descripción:</strong> ${descripcion}</p><p><strong>Categoría:</strong> ${categoria}</p><hr>`;
                        resultadosEncontrados = true;
                    }
                }
            }
            if (!resultadosEncontrados) {
                respuesta = '<p>No se encontraron resultados.</p>';
            }
            chatbox.innerHTML += '<div style="background-color:#1DA1F2;" class="small p-2 ms-3 mb-3 rounded-3" role="alert">' + respuesta + '</div>';
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    document.getElementById('userInput').value = '';
}
