import fs from 'fs';
import __dirname from '../utils.js';

export default class ProductsManager {
    constructor() {
        this.path = `${__dirname}/files/products.json`;
        this.init();
    }
    init = async() => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
    }
    getAllProducts = async() => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        return products;
    }
    getProductById = async(id) => {
        const products = await this.getAllProducts();
        const product = products.find(prod => prod.id === id);
        return product;
    }
    saveProduct = async(product) => {
        let products = await this.getAllProducts();
        product.id = products.length === 0 ? 1 : products[products.length - 1].id + 1;  
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify (products, null, '\t'));
    }
    updateProduct = async(productToUpdate, id) => {
        const products = await this.getAllProducts();
        const findedId = products.find(prod => prod.id === id);
        if (findedId.id === productToUpdate.id) await fs.promises.writeFile(this.path, JSON.stringify(productToUpdate, null, '\t'));
    }
    deleteAllProducts = async() => {
        if (fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]")
        }
    }
    deleteProductById = async(id) => {
        const products = await this.getAllProducts();
        const newProductsArray = products.filter(prod => prod.id !== id);
        const newArray = await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray, null, '\t'));
        return newArray;
    }
};