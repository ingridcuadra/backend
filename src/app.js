import express from 'express';
import fs from 'fs';

const app = express();

const server = app.listen(8080, ()=>console.log("Escuchando Express :)"))

app.get('/', (req, res)=>{
    res.send('Bienvenid@s')
})

const returnProducts = (ruta) => {
    if (fs.existsSync(ruta)) {
        let data = fs.readFileSync(ruta, 'utf-8')
        let products = JSON.parse(data)
        return products;
    } else {
        return console.log("Error leyendo datos")
    }
}

app.get('/productos', (req, res) => {
    res.send(returnProducts('./productos.json'))
})
app.get('/productoRandom', (req, res) => {
    let products = returnProducts('./productos.json')
    let numRandom = parseInt(Math.random() * products.length)
    if (!products.status) {
        res.send(products[numRandom])
    } else {
        res.send(products)
    }
})
app.get('/producto/:idProduct', (req, res) => {
    const id = req.params.idProduct
    let products = returnProducts('./productos.json')
    let product = products.find((product) => product.id == id);
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no encontrado")
    }
})