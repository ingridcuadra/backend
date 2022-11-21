import { Router } from "express";
import fs from 'fs';
import { uploader } from '../utils.js';

const productRouter = Router();

const returnProducts = (ruta) => {
    if (fs.existsSync(ruta)) {
        let data = fs.readFileSync(ruta, 'utf-8')
        let products = JSON.parse(data)
        return products;
    } else {
        return console.log("Error leyendo datos")
    }
}

productRouter.get('/', (req, res) => {
    res.send(returnProducts('./productos.json'))
})

productRouter.get('/:idProduct', (req, res) => {
    const id = req.params.idProduct
    let products = returnProducts('./productos.json')
    let product = products.find((product) => product.id == id);
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no encontrado")
    }
})

productRouter.post('/', uploader.single('image'), (req, res) => {
    const {id, title, price, thumbnail} = req.body;
    const product = {
        id,
        title,
        price,
        thumbnail
    }
    let products = returnProducts('./productos.json')
    products.push(product);
    res.send({status:"Producto agregado", payload:product});
})

//Producto para usar con POST
// {
//     "producto":{
//         "id": 4,
// 		   "title": "Foquita",
// 		   "price": 199.99,
// 		   "thumbnail": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
//     }
// }

productRouter.put('/:idProduct', (req, res) => {
    const id = req.params.idProduct
    const productToUpdate = req.body.producto;
    res.send({status:"Producto actualizado", payload:productToUpdate});
})

//Producto para usar con PUT
// {
//     "producto":{
//         "id": 4,
// 		   "title": "Foquita",
// 		   "price": 200.99,
// 		   "thumbnail": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
//     }
// }

productRouter.delete('/:idProduct', (req, res) => {
    const id = req.params.idProduct
    let products = returnProducts('./productos.json')
    let product = products.filter((product) => product.id != id);
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no existente")
    }
})

export default productRouter;