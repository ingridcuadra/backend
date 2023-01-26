import { Router } from "express";
import Contenedor from "../container/Contenedor.js";

const viewRouter = Router();
const contenedor = new Contenedor();

viewRouter.get('/', (req, res) => {
    res.render('home');
});

export default viewRouter;