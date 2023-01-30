import { Router } from "express";
import Contenedor from "../container/Contenedor.js";

const productosRealTimeRouter = Router();
const contenedor = new Contenedor();

productosRealTimeRouter.get('/', async(req, res)=>{
    const productos = await contenedor.getAll();
    res.render('productos', {
        productos
    });
});

export default productosRealTimeRouter;