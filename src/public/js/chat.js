const socket = io({
    autoConnect:false
});
let user;
const input = document.getElementById("chat");

Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa tu username ;)",
    inputValidator: (value) => {
        return !value && "¡Necesitas ingresar un username válido antes de continuar!"
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(result => {
    user = result.value;
    socket.connect();
    socket.emit('authenticated', user);
});

chat.addEventListener('keyup', evt=>{
    if (evt.key === "Enter") {
        if (chat.value.trim().length>0){
            socket.emit('mensaje', {user, mensaje:chat.value.trim()});
            chat.value="";
        };
    }
});

socket.on('mensajeCargado', data=>{
    let mensajes = "";
    data.forEach(msjCargado=>{
        mensajes += `${msjCargado.user}: ${msjCargado.mensaje} <br/>`
    });
    const cargados = document.getElementById("mensajesCargados");
    cargados.innerHTML = mensajes;
});

socket.on('newUserConnected', data=>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:3000,
        title:`${data} se conectó al chat`,
        icon:'success'
    });
});