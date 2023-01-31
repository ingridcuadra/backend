import { Router } from "express";
import CartsManager from "../Managers/CartsManager.js";
import ProductsManager from "../Managers/ProductsManager.js";

const cartsRouter = Router();
const cartsManager = new CartsManager();
const productsManager = new ProductsManager();

cartsRouter.get('/', async(req, res) => {
    let carts = await cartsManager.getCarts();
    res.send({status: "success", payload: carts});
});

cartsRouter.get('/:cid/products', async(req, res) => {
    const { cid } = req.params;
    if (!cid) return res.status(400).send({status: "Error", error: "Id inválido"});
    let products = await cartsManager.getProductsInCartById(parseInt(cid));
    res.send({status: "success", payload: products});
});

cartsRouter.post('/', async(req, res) => {
    const newCart = await cartsManager.saveCarts();
    res.send({status: "success", message: "Carrito añadido", payload: newCart})
})

cartsRouter.post('/:cid/products/:pid/:quantity',async(req,res)=>{
    const { cid, pid, quantity } = req.params;
    const qty = parseInt(quantity);
    
    const existsCart = await cartsManager.getCartById(parseInt(cid));
    if(!existsCart) return res.status(404).send({status: "error", error: "Carrito no encontrado"})

    const existsProduct = await productsManager.getProductById(parseInt(pid));
    if(!existsProduct) return res.status(404).send({status: "error", error: "Producto no encontrado"})

    const isInCart = await cartsManager.isInCart(parseInt(cid), parseInt(pid));
    if(isInCart == true) {
        qty++
    }
    
    const result = await cartsManager.saveProductsInCart(parseInt(cid), parseInt(pid), qty);
    res.send({status: "success", payload: result})
});

cartsRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    if (!cid) return res.status(400).send({status: "Error", error: "Id inválido"});
    await cartsManager.deleteAllFromCarts(parseInt(cid));
    res.send({status: "success", message: "Carrito vacío"});
});

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    if (!cid) return res.status(400).send({status: "Error", error: "Id inválido"});
    if (!pid) return res.status(400).send({status: "Error", error: "Id inválido"});
    let resultDelete = await cartsManager.deleteProductFromCartById(parseInt(cid), parseInt(pid));
    res.send({status: "success", message: "Producto eliminado", payload: resultDelete});
});

export default cartsRouter;