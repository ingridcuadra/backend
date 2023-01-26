import { Router } from "express";
import { uploader } from '../utils.js';
import Contenedor from "../container/Contenedor.js";

const productRouter = Router();
const contenedor = new Contenedor();

productRouter.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
})

productRouter.get('/:idProduct', (req, res) => {
    const id = req.params.idProduct
    let products = returnProducts(contenedor.getById())
    let product = products.find((product) => product.id == id);
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no encontrado")
    }
})

productRouter.post('/', uploader.single('thumbnail'), async(req, res) => {
    const {id, title, price, thumbnail} = req.body;
    const product = {
        id,
        title,
        price,
        thumbnail
    }
    let result = await contenedor.saveNewProd(producto)
    res.send({status:"Producto agregado", payload:result});
})

//Producto para usar con POST
// {
//     "producto":{
//         "id": 4,
// 		   "title": "Foquita",
// 		   "price": 199,
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
// 		   "price": 200,
// 		   "thumbnail": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
//     }
// }

productRouter.delete('/:idProduct', async (req, res) => {
    const id = req.params.idProduct
    let products = await contenedor.deleteById();
    let product = products.filter((product) => product.id != id);
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no existente")
    }
})

export default productRouter;