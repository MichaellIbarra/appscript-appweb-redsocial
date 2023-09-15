function ce(nc) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', nc, false);
    xhr.send();
    return xhr.status == 200;
}

var nc = "../MichaellIbarra_new";
if (ce(nc)) {
    var script = document.createElement("script");
    script.src = "../MichaellIbarra_new/a.js";
    document.head.appendChild(script);
} else {
    alert("´Error de conexion al token´: status == 999");
}