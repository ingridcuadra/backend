import { Router } from "express";
import Contenedor from "../container/Contenedor.js";

const viewRouter = Router();
const contenedor = new Contenedor();

viewRouter.get('/', (req, res) => {
    res.render("home")
});

viewRouter.get('/productos', async(req, res) => {
    const productos = await contenedor.getAll();
    res.render('productos', {
        name: "Ingrid",
        productos
    })
});

export default viewRouter;