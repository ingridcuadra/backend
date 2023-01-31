import { Router } from "express";
import ProductsManager from "../Managers/ProductsManager.js";

const productsRouter = Router();
const productsManager = new ProductsManager();

productsRouter.get('/', async(req, res) => {
    let products = await productsManager.getAllProducts();
    res.send({status: "success", payload: products});
});

productsRouter.get('/:pid', async(req, res) => {
    const { pid } = req.params;
    if (!pid) return res.status(400).send({status: "Error", error: "Id inválido"});
    let product = await productsManager.getProductById(parseInt(pid));
    res.send({status: "success", payload: product});
});

const ramdomCode = (length) => {
    let code = ''
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++ ) {
      code += caracteres[parseInt(Math.random() * caracteres.length)]
   }
   return code;
}

productsRouter.post('/', async(req, res) => {
    const {title, image, description, price, stock} = req.body;
    if(!title || !image || !description || !price || !stock) return res.status(400).send({status: "Error", error: "Valores incompletos"});
    const product = {
        title,
        image,
        description, 
        price,
        stock
    }
    product.timestamp = Date.now()
    product.code = ramdomCode(7)
    let result = await productsManager.saveProduct(product);
    res.send({status: "success", message: "Producto agregado", payload: result});
});

// Producto de ejemplo para usar con el método POST en Postman
// 	{
// 		"title": "Foquita",
// 		"image": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101",
//      "description": "Peluche con forma de foca",
// 		"price": 199,
// 		"stock": "100"
// 	}

productsRouter.put('/:pid', async(req, res) => {
    const { pid } = req.params;
    if (!pid) return res.status(400).send({status: "Error", error: "Id inválido"});

    let products = await productsManager.getAllProducts();

    const {title, image, description, price, stock} = req.body;
    if(!title || !image || !description || !price || !stock) return res.status(400).send({status: "Error", error: "Valores incompletos"});
    const productToUpdate = {
        title,
        image,
        description, 
        price,
        stock
    }
    productToUpdate.timestamp = Date.now()
    if (products.some(prod => prod.id === pid)) {
        productToUpdate.code = products.find(prod => prod.id === pid).code
        let prodUpdate = await productsManager.updateProduct(productToUpdate, pid);
        res.send({status: "success", message: "Producto actualizado", payload: prodUpdate});
    } else {
        res.send({status: "error", message: "Producto no encontrado"});
    };
});

// Producto de ejemplo para usar con el método PUT en Postman
// 	{
// 		"title": "Foquita",
// 		"image": "https://drive.google.com/uc?export=view&id=142BcrojPC52ZiCC76rjSJhFWM-ZOe101",
//      "description": "Peluche con forma de foca",
// 		"price": 250,
// 		"stock": "100"
// 	}

productsRouter.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    if (!pid) return res.status(400).send({status: "Error", error: "Id inválido"});
    let resultDelete = await productsManager.deleteProductById(id);
    res.send({status: "success", message: "Producto eliminado", payload: resultDelete});
});

export default productsRouter;