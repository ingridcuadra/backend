import fs from 'fs';
import __dirname from '../utils.js';

export default class CartsManager {
    constructor() {
        this.path = `${__dirname}/files/carts.json`;
        this.init();
    }
    init = async() => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
    }
    getCarts = async() => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
        return carts;
    }
    getCartById = async(id) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === id);
        return cart;
    }
    getProductsInCartById = async(cid) => {
        const carts = await this.getCarts();
        const cart = carts.map(cart => {
            if (cart.id === cid) {
                cart.products
            }
        });
        return cart;
    }
    saveCarts = async() => {
        const carts = await this.getCarts();
        const newCart = {
            id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
            products: []
        }
        carts.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(carts, null, '\t'))
        return newCart.id;
    }
    saveProductsInCart = async(cid, pid, quantity) =>{
        const carts = await this.getCarts();
        let updatedCart;
        const newCarts = carts.map(cart => {
            if(cart.id === cid){
                updatedCart = cart;
                cart.products.push({id: pid, quantity: quantity});
            }
            return cart;
        })
        await fs.promises.writeFile(this.path,JSON.stringify(newCarts, null, '\t'))
        return updatedCart;
    }
    isInCart = async(cid, pid) => {
        const carts = await this.getCarts();
        const cart = carts.map(cart => {
            if (cart.id === cid) {
                cart.find(product => product.id === pid) ? true : false;
            }
        })
    }
    deleteAllFromCarts = async(cid) => {
        const carts = await this.getCarts();
        let emptyCart = "";
        const cartToDelete = carts.find(cart => cart.id === cid);
        cartToDelete = emptyCart;
        await fs.promises.writeFile(this.path,JSON.stringify(cartToDelete))
    }
    deleteProductFromCartById = async(cid, pid) => {
        const carts = await this.getCarts();
        let updatedCart;
        const newCart = carts.map(cart => {
            if(cart.id === cid){
                updatedCart = cart;
                cart.filter(cart => cart.id !== pid);
            }
        })
        await fs.promises.writeFile(this.path,JSON.stringify(newCart, null, '\t'))
        return updatedCart;
    }
};