import { Router } from "express";
import CartsManager from "../Managers/CartsManager.js";

const cartsRouter = Router();
const cartsManager = new CartsManager();

cartsRouter.get('/', (req, res) => {
});

export default cartsRouter;