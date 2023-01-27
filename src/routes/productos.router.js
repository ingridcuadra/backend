import { Router } from "express";
import Contenedor from "../container/Contenedor.js";

const productRouter = Router();
const contenedor = new Contenedor();

// productRouter.get('/', async(req, res) => {
//     const productos = await contenedor.getAll();
//     res.render('productos', {
//         name: "Ingrid",
//         productos
//     })
// });

// productRouter.get('/:idProduct', (req, res) => {
//     const id = req.params.idProduct
//     let products = returnProducts(contenedor.getById())
//     let product = products.find((product) => product.id == id);
//     if (product) {
//         res.send(product)
//     } else {
//         res.send("Producto no encontrado")
//     }
// })

// productRouter.post('/', uploader.single('thumbnail'), async(req, res) => {
//     const {id, title, price, thumbnail} = req.body;
//     const product = {
//         id,
//         title,
//         price,
//         thumbnail
//     }
//     let result = await contenedor.saveNewProd(producto)
//     res.send({status:"Producto agregado", payload:result});
// })

// //Producto para usar con POST
// // {
// //     "producto":{
// //         "id": 4,
// // 		   "title": "Foquita",
// // 		   "price": 199,
// // 		   "thumbnail": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
// //     }
// // }

// productRouter.put('/:idProduct', (req, res) => {
//     const id = req.params.idProduct
//     const productToUpdate = req.body.producto;
//     res.send({status:"Producto actualizado", payload:productToUpdate});
// })

// //Producto para usar con PUT
// // {
// //     "producto":{
// //         "id": 4,
// // 		   "title": "Foquita",
// // 		   "price": 200,
// // 		   "thumbnail": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101"
// //     }
// // }

// productRouter.delete('/:idProduct', async (req, res) => {
//     const id = req.params.idProduct
//     let products = await contenedor.deleteById();
//     let product = products.filter((product) => product.id != id);
//     if (product) {
//         res.send(product)
//     } else {
//         res.send("Producto no existente")
//     }
// })

export default productRouter;

// import { Router } from 'express';
// import UsersManager from '../managers/users.manager.js';

// const router = Router();
// const usersService = new UsersManager();

// router.get('/',async(req,res)=>{
//     const users = await usersService.getUsers();
//     res.send({users})
// })
// router.post('/',async(req,res)=>{
//     const {name,email,age} = req.body;
//     if(!name||!email||!age) return res.status(400).send({status:"error",error:"Incomplete values"})
//     const user = {
//         name,
//         email,
//         age
//     }
//     let result = await usersService.saveUser(user);
//     res.send({status:"success",payload:result})
// })

// export default router;