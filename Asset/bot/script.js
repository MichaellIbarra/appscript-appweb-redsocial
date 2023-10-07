document.getElementById("userInput").addEventListener("input", function () {
    var characterCount = this.value.length;
    document.getElementById("send-btn").disabled = characterCount < 3;
});

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

var apiKey = 'AIzaSyAdiweKZ2zMINXafvC_q4VFiIDLooZfr1M', url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${hoja}?key=${apiKey}`;
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
        "para que es esta pagina web": "un chat bot para enterarte todas las noticias del colegio",
        "quienes son los creadores de este chat bot": "este chat bot los que lo crearon fueron  - ibarra martinez -Omar Rivera",
        "que edad tenia ibarra martinez": "17 años tenia ibarra",
        "que edad tenia omar rivera": "17 años tenia Omar",
        "cual es el objetivo de este chatbot": "El objetivo de este chatbot es proporcionar información sobre el colegio y mantener a los usuarios actualizados sobre las últimas noticias.",
        "que colegios taba involucrado": "el colegio que fue para sepulveda , fue basado a los problemas que tenian su colegio si quieres ver las publicaciones te recomendamos ver toda nuestra red social no soy un chat bot tan inteligente pero me ire actualizando , muchas gracias",
        "esta pagina web solo abla de dos colegios o puedes aver mas": "Este proyecto fue basado a soluciones de colegio pero estoy seguro que lo podemos pubicar siempre y cuando nosotros validemos si tu publicacion no ofende a nadie y este todo en orden , de otro caso no sera publicado lo que tu nos envias solo nos llegara tu respuestas por ahora seguimos mejorando mi sistema",
        "Tu me puedes proporcionar toda tu informacion sobre tu pagina": "Si claro por el momento nosotros tenemos la seccion de contacto si quieres ver mas de contacto pregunta -contacto-   y tambien tenemos Inicio que aqui tenemos un poco de informacion y tambien el chat bot que si quieres mas info busca  -chat-bot-   y tambien tenemos opiniones que si quieres mas info  -opiniones-  ",
        "contacto": "En la seccion de contacto tu nos puedes enviar tu publicacion y si estan correctamente y validado sera publicado si quieres puedes ir a la seccion de contacto ay encontraras un formulario para que tu lo llenes y envias adjuntando un archivo y otras cosas ",
        "chat-bot": "Nuestro chat bot esta diseñado para contestarte solo cosas de la pagina web y algunas cosas que no sepas sobre contacto , opiniones , basado en esta red social",
        "opiniones": "Area De Limpieza : Area Academica : Area Administrativa : Estudiantes : esos son las 4 subpaginas que tenemos en opiniones dime de cual quieres saber con estas busquedas solo no copies lo que esta dentro de -texto- <- ejemplo sin el -- ahora las busquedas son : -limpieza- : -academica- : -administrativa- : -estudiantes- .",
        "limpieza": "Lo pusimos limpieza por el hecho de que ay iran imagenes o videos sobre que no limpian bien la escuela , afuera u otro . deseas mas info mira en la pagina de limieza ya  que ay taran las publicaciones",
        "academica": "Se muestraran profesores de clase que no dan el ejmplo al alumno , entres otras publicaciones sobre el alumno la enseñanza que le da etc .",
        "administrativa": "Aqua iran publicaciones sobre las personas que administran  a la empresa u o colegio , no cumplen bien su trabajo entre otras cosas",
        "estudiantes": "Aqui iran publicaciones relacionados a los estudiantes Como pelleas entre ellos , etc. acce4de a la seccion de estudiantes y da tu opinion junto para una educacion mejor .",
        "Diferencias entre otras redes sociales con esta red social": "Bueno si te refieres a otras redes sociales las mas grandes y las mas conocidas no es igual que esta ya que esta es echo con google site basado en hojas de calculo codigo html , css javascript en cambio las otras redes mas populares estan mas complejas y tienen a varias personas que trabajan en ellas y nosotros solo somos una organizacion chica basada para resolver problemas de colegios por ahora . seguiremos mejorandolos .",
        "atravez de donde le podemos contactar a los que hicieron esta red social": "Omar Rivera ->930720474  ||  Ibarra Martines -> 979333493",
        "crees que esta pagina solucionara los problemas que hay en el colegio": "Esto se vera en el tiempo yaa que esta red social es exibir, Sobre el colegio y atravez de ello estaran subidos y se podra visualizar en nuestra red social atravez del link la director(a) lo veran y las autoridades maximas y estoy seguro que pondran un alto a las personas que hacen tales cosas sea administrativa , estudiantes , limpieza : esperemos que resuelva los problemas ya que nosotros mostramos las evidencias asi por decirlo mas no , nosotros expulsarlos o mandarlos catigos esperemos que te haya sido util esta informacion si te sirvio de nada . estoy aqui para ayudarte",
        "que tan funcional es esta red social": "Nuestra red social como te lo devuelvo a decir es para publicar sobre las publicaciones de colegios Sea estudiantes , maestros , etc , nos servira para mejorar el colegio .",
        "me puedes decir como desarrollar un chat bot interactivo como lo eres": "lo lamento yo no puedo darte un codigo espesifico sobre ello pero las herramientas que utilizamos para crear esto fueron teniendo en cuenta que google docs solo fue para planificar nuestras ideas: manera general --> google site , google docs , google sheets , aps script , formularios , si quieres que te hable un poco de cada unas de las herramientas de ellas busca -si estas dos simbolos de menos-  (buscaras) -formulario- : -sheets- : -aps script- : -site- : -docs-",
        "site": "Google Sites es una aplicación en línea gratuita ofrecida por la empresa estadounidense Google como parte de la suite de productividad de Google Workspace. Es una herramienta para la creación de páginas web. Esta aplicación permite crear un sitio web o una intranet de una forma tan sencilla como editar un sitio web.",
        "docs": "Documentos de Google es un procesador de texto en línea que se incluye como parte de la suite Google Docs Editors basada en la web de Google, que también incluye Hojas de Cálculo de Google, Presentaciones de Google, Dibujos de Google, Formularios de Google, Google Sites y Google Keep.",
        "formulario": "Formularios de Google es un software de administración de encuestas que se incluye como parte del conjunto gratuito Google Docs Editors basado en la web que ofrece Google. Formularios de Google solo está disponible como una aplicación web.",
        "sheets": "Hojas de cálculo de Google es un programa de hojas de cálculo que se incluye como parte del conjunto gratuito de Google Docs Editors basado en la web que ofrece Google.",
        "aps script": "Apps Script es una lenguaje de scripting para el desarrollo de aplicaciones ligeras en la plataforma G Suite. Se basa en Javascript 1.6 con algunas partes de 1.7 y 1.8 y proporciona un subconjunto de la API ECMAScript 5, sin embargo en vez de ejecutarse en el cliente, se ejecuta en Google Cloud."
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
                        respuesta += `<p><strong>Fecha de la Noticia:</strong> ${marcaTemporal}</p><a href="${fotoOVideo}" target="_blank"><iframe style="margin-bottom: 10px;" width="290" height="200" src="${fotoOVideo}" alt="Dar Click"></iframe>
                            </a><p><strong>Título:</strong> ${titulo}</p><p><strong>Descripción:</strong> ${descripcion}</p><p><strong>Categoría:</strong> ${categoria}</p><hr>`;
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


