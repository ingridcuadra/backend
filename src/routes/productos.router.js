import { Router } from "express";
import Contenedor from "../container/Contenedor.js";

const productosRouter = Router();
const contenedor = new Contenedor();

productosRouter.get('/', async(req, res)=>{
    const productos = await contenedor.getAll();
    res.render('productos', {
        productos
    });
});

// productosRouter.post('/', (req, res)=>{
    //insertar el producto

    //volver a leer el producto

    //productos = || igualar los productos(?)

    //req.io.emit('productos', productos)
// });

export default productosRouter;