import { Router } from "express";
import Contenedor from "../container/Contenedor.js";

const apiProductRouter = Router();
const contenedor = new Contenedor();

apiProductRouter.get('/', async(req, res) => {
    const productos = await contenedor.getAll();
    res.send(productos);
});

apiProductRouter.get('/:idProduct', async(req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({status:"Error", error:"Id inválido"});
    let idProd = await contenedor.getById(parseInt(id));
    res.send(idProd);
});

apiProductRouter.post('/', async(req, res) => {
    const {id, title, price, image} = req.body;
    if(!id||!title||!price||!image) return res.status(400).send({status:"Error", error:"Valores incompletos"});
    const producto = {
        id,
        title,
        price,
        image
    };
    let result = await contenedor.save(producto);
    res.send({status:"Producto agregado", payload:result});
});

//Producto para usar con POST
// {
//     "producto":{
//         "id": 4,
// 		   "title": "Foquita",
// 		   "price": 199,
// 		   "image": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
//     }
// }

apiProductRouter.put('/:idProduct', async(req, res) => {
    const idProduct = req.params.idProduct;
    if (!idProduct) return res.status(400).send({status:"Error", error:"Id inválido"});

    const {id, title, price, image} = req.body;
    if(!id||!title||!price||!image) return res.status(400).send({status:"Error", error:"Valores incompletos"});
    const productToUpdate = {
        id,
        title,
        price,
        image
    };
    let prodUpdate = await contenedor.update(productToUpdate, idProduct);
    res.send({status:"Producto actualizado", payload:prodUpdate});
})

//Producto para usar con PUT
// {
//     "producto":{
//         "id": 4,
// 		   "title": "Foquita",
// 		   "price": 200,
// 		   "image": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
//     }
// }

apiProductRouter.delete('/:idProduct', async (req, res) => {
    const idProduct = req.params.idProduct;
    if (!idProduct) return res.status(400).send({status:"Error", error:"Id inválido"});
    let resultDelete = await contenedor.deleteById(id);
    res.send({status:"Producto eliminado", payload:resultDelete});
})

export default apiProductRouter;