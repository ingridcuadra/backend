const form = document.getElementById('form');

form.addEventListener('submit', e=>{
    e.preventDefault();
    const product = {
        title: form[0].value,
        image: form[1].value,
        description: form[2].value,
        price: form[3].value,
        stock: form[4].value
    }
})

async function hacerHTML(product){
    const result = await fetch("views/products.handlebars")
    const plantilla = await result.text()
    const template = Handlebars.compile(plantilla)
    const html = template({product})
    return html
}

socket.on("products", product => {
    hacerHTML(product).then(html => {
        document.getElementById("products").innerHTML = html
    })
})

const user = document.getElementById("user")
const chat = document.getElementById("chat")
const btn = document.getElementById("btn")
const formChat = document.getElementById("formChat")

formChat.addEventListener('submit', e=>{
    e.preventDefault();
    const mensaje = { autor: user.value, mensaje: chat.value }
    socket.emit('nuevoMensaje', mensaje)
    formChat.reset()
    chat.focus()
})

async function hacerHTMLMensaje(mensaje){
    return mensaje.map(mensaje => {
        return (`
        <div>
            <b style="color:green;">${mensaje.autor}</b>
            (<span style="color:gray;">${mensaje.date}</span>)
            <i style="color:blue;">${mensaje.mensaje}</i>
        </div>     
        `)
    }).join(" ")
}

socket.on('mensaje', mensajes => {
    const html = hacerHTMLMensaje(mensajes)
    document.getElementById("mensajes").innerHTML = html
})

user.addEventListener('input', () => {
    const inputUser = user.value.trim().length
    const inputChat = chat.value.length

    chat.disabled = !inputUser
    btn.disabled = !inputUser || !inputChat
})

chat.addEventListener('input', () => {
    const inputChat = chat.value.length

    btn.disabled = !inputChat
})