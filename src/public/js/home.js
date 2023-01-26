const socket = io();

const input = document.getElementById("chat");

chat.addEventListener('keyup', evt=>{
    if (evt.key === "Enter") {
        socket.emit('mensaje', chat.value);
        chat.value="";
    }
});

socket.on('mensajeCargado', data=>{
    let mensajes = "";
    data.forEach(msjCargado=>{
        mensajes += `${msjCargado.socketid}: ${msjCargado.mensaje} <br/>`
    });
    const cargados = document.getElementById("mensajesCargados");
    cargados.innerHTML = mensajes;
});