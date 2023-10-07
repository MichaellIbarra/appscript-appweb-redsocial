function extractDriveId(cellValue) { var regex = /https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/; var matches = cellValue.match(regex); if (matches && matches.length > 1) { var imageId = matches[1]; return imageId; } return ''; }
function extractDriveImageUrl(cellValue) { var regex = /https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/; var matches = cellValue.match(regex); if (matches && matches.length > 1) { var imageId = matches[1]; return `https://drive.google.com/uc?export=view&id=${imageId}`; } return ''; }
var apiKey = 'AIzaSyAdiweKZ2zMINXafvC_q4VFiIDLooZfr1M', currentRow = 0, allMessagesVisible = false;
const spreadsheetId = '1IO8BIE58F3D70EMkY-KIwl1A6sOw90fZTQwRcuzc9jc';
function chatMostrar() { var chatMessages = document.querySelectorAll('.chat-message'); var toggleButton = document.getElementById('toggleButton'); if (!allMessagesVisible) { for (var i = currentRow + 4; i < chatMessages.length; i++) { chatMessages[i].style.display = 'none'; } toggleButton.textContent = 'Mostrar todos los mensajes'; } else { for (var i = currentRow + 4; i < chatMessages.length; i++) { chatMessages[i].style.display = 'flex'; } toggleButton.textContent = 'Solo los 4 primeros mensajes'; } allMessagesVisible = !allMessagesVisible; }
function OcultarTodo() { var chatMessages = document.querySelectorAll('.chat-message'); for (var i = 4; i < chatMessages.length; i++) { chatMessages[i].style.display = 'none'; } }
function getDataFromSheets() {
    var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + hoja + '?key=' + apiKey;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var rows = data.values;
            if (rows.length > 0) {
                var row = rows[currentRow];
                var archivo = row[0];
                var esVideo = archivo.includes("drive.google.com/file/d/");
                if (esVideo) {
                    var videoId = extractDriveId(archivo);
                    var videoUrl = `https://drive.google.com/file/d/${videoId}/preview`;
                    var contentDiv = document.getElementById('content');
                    var iframe = document.createElement('iframe');
                    iframe.src = videoUrl;
                    iframe.width = 300;
                    iframe.height = 260;
                    iframe.style.display = "flex";
                    iframe.style.boxShadow = "2px 2px 8px 6px rgba(0, 0, 0, 0.26)";
                    iframe.style.margin = "0 auto";
                    iframe.frameBorder = 0;
                    iframe.webkitallowfullscreen = false;
                    iframe.mozallowfullscreen = false;
                    iframe.allow = "autoplay";
                    iframe.allowFullscreen = true;
                    contentDiv.appendChild(iframe);
                    var titulo = row[1];
                    var parrafo = row[2];
                    var nuevaColumna = '';
                    var div = document.createElement('div');
                    contentDiv.appendChild(div);
                    var div = document.createElement('div');
                    var h2 = document.createElement('h2');
                    h2.classList.add('heading');
                    h2.textContent = titulo;
                    div.appendChild(h2);
                    var p = document.createElement('p');
                    p.textContent = parrafo;
                    div.appendChild(p);
                    contentDiv.appendChild(div);
                } else {
                    var imagenUrl = extractDriveImageUrl(archivo);
                    var contentDiv = document.getElementById('content');
                    var img = document.createElement('img');
                    img.src = imagenUrl;
                    img.width = 360;
                    img.height = 200;
                    img.alt = "Imagen";
                    img.draggable = "false";
                    img.style.display = "block";
                    img.style.margin = "0 auto";
                    contentDiv.appendChild(img);
                    var titulo = row[1];
                    var parrafo = row[2];
                    var nuevaColumna = '';
                    var div = document.createElement('div');
                    contentDiv.appendChild(div);
                }

                for (var j = 3; j < row.length; j++) {
                    if (row[j].trim() !== '') {
                        var mensaje = row[j].replace(/\n+/g, ' ');
                        if (mensaje.trim() !== '') {
                            nuevaColumna += mensaje + '\n';
                        }
                    }
                }
                var chatContainer = document.createElement('div');
                chatContainer.classList.add('chat-container');
                var mensajesSeparados = nuevaColumna.split('\n');
                for (var j = 0; j < mensajesSeparados.length; j++) {
                    var mensaje = mensajesSeparados[j];
                    if (mensaje.trim() !== '') {
                        var chatMessage = document.createElement('div');
                        chatMessage.classList.add('chat-message');
                        var chatContent = document.createElement('div');
                        chatContent.classList.add('chat-content');
                        var strong = document.createElement('strong');
                        strong.textContent = 'Alumn@: ' + mensaje;
                        chatContent.appendChild(strong);
                        chatMessage.appendChild(chatContent);
                        chatContainer.appendChild(chatMessage);
                    }
                }
                contentDiv.appendChild(chatContainer);
                OcultarTodo();
            } else {
                console.log('Error: No puedo encontrar los datos. Contactar con Michaell.');
            }
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}
getDataFromSheets();
const form = document.forms['contactform'], botonEnviar = document.getElementById("submit"), scriptURL = 'https://script.google.com/macros/s/AKfycbyAxUmWk-lNDrdHm8Yw24Q5MhpSRB_Aw3hFzMtu8rBlq8m7TtZVEd1Y4vEdlXBbgYZiHQ/exec', messageContainer = document.getElementById('messageContainer');
form.addEventListener('submit', async e => {
    e.preventDefault();
    botonEnviar.disabled = true;
    const formData = new FormData(form);
    formData.append('hoja', hoja);
    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
            const parrafo = document.createElement("p");
            parrafo.textContent = "Tu opinión fue enviada. Recargue la página. ¡Importante! El mensaje debe ser respetuoso o será eliminado.";
            parrafo.style.boxShadow = "2px 1px 9px 6px rgba(0, 110, 255, 0.7)";
            parrafo.style.color = "black";
            parrafo.style.padding = "10px";
            messageContainer.innerHTML = '';
            messageContainer.appendChild(parrafo);
            form.reset();
            setTimeout(() => {
                messageContainer.innerHTML = '';
            }, 6000);
        } else {
            throw new Error('Hubo un problema al enviar el formulario.');
        }
    } catch (error) {
        console.error('¡Error!', error.message);
        alert('Hubo un problema al enviar el formulario. Por favor, inténtalo nuevamente.');
    } finally {
        botonEnviar.disabled = false;
    }
});
const celdaA = 'A2';
const celdaB = 'B2';
document.addEventListener("DOMContentLoaded", function () {
    const botonIncrementarA = document.getElementById("botonIncrementarA");
    const botonIncrementarB = document.getElementById("botonIncrementarB");
    const messageContainer = document.getElementById("messageContainer");
    botonIncrementarA.addEventListener("click", function () {
        enviarSolicitud(celdaA, messageContainer, botonIncrementarA);
    });
    botonIncrementarB.addEventListener("click", function () {
        enviarSolicitud(celdaB, messageContainer, botonIncrementarB);
    });
});
function enviarSolicitud(celda, messageContainer, boton) {
    boton.disabled = true;
    fetch(`https://script.google.com/macros/s/AKfycbzYKrTnh5Rnc7qJ_RLRMIJBGvvBECDouYfW0UvVzLGoXheoRWJfMbqRbhP4UL2WkkDL9A/exec?hoja=${hoja}&celda=${celda}`, { method: "POST" })
        .then(response => response.text())
        .then(data => {
            mostrarMensajeExitoso(messageContainer);
            setTimeout(() => {
                boton.disabled = false;
            }, 10000);
        })
        .catch(error => {
            mostrarMensajeExitoso(messageContainer);
            setTimeout(() => {
                boton.disabled = false;
            }, 10000);
        });
}
function mostrarMensajeExitoso(messageContainer) {
    const parrafo = document.createElement("p");
    parrafo.textContent = "Fue enviado con éxito. Recargue la página";
    parrafo.style.boxShadow = "2px 1px 9px 6px rgba(0, 110, 255, 0.7)";
    parrafo.style.color = "black";
    parrafo.style.padding = "10px";
    messageContainer.innerHTML = '';
    messageContainer.appendChild(parrafo);

    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 6000);
}
function getDataFromSheetss() {
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${hoja}?key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const valorA1 = data.values[1][0];
            const valorB1 = data.values[1][1];
            const valorCeldaElemento = document.getElementById("valorCelda");
            const valorCeldaElementoo = document.getElementById("valorCelda2");
            valorCeldaElemento.textContent = valorA1 !== undefined ? valorA1 : 0;
            valorCeldaElementoo.textContent = valorB1 !== undefined ? valorB1 : 0;
        })
        .catch(error => {
            console.error("Error al obtener los datos de Google Sheets:", error);
        });
}
getDataFromSheetss();
