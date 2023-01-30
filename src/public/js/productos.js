const socket = io();

const form = document.getElementById("form");

form.addEventListener('submit', evt=>{
    evt.preventDefault();
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const newProd = {
        id,
        title,
        price,
        image
    }
    form.reset();
    socket.emit('enviarProd', newProd);
});

socket.on('prodAgregado', prodAgregado=>{
    let newProd = "";
    prodAgregado.forEach(newProdAgregado=>{
        newProd += `Id del producto: ${newProdAgregado.id} <br/>
        Nombre: ${newProdAgregado.title} <br/>
        Precio: ${newProdAgregado.price} <br/>
        Image(URL): ${newProdAgregado.image} </br>
        <br/>`
    });
    const titleNewProd = document.getElementById("titleNewProd");
    titleNewProd.innerHTML = "Nuevo producto agregado:";
    const nuevoProdu = document.getElementById("prodAgregado");
    nuevoProdu.innerHTML = newProd;
});