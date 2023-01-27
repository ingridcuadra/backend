import fs from 'fs';
import __dirname from '../utils.js';

const pathToFile = __dirname + '/files/productos.json';

class Contenedor {
    constructor() {
        if(!fs.existsSync(pathToFile)){
            this.init();
        }
    }
    init = async() => {
        await fs.promises.writeFile(pathToFile, JSON.stringify([]))
    }
    getAll = async() => {
        const data = await fs.promises.readFile(pathToFile, 'utf-8')
        const arrayProductos = JSON.parse(data)
        return arrayProductos
    }
    save = async(producto) => {
        const productos = await this.getAll();
        productos.push(producto);
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        return productos;
    }
    getById = async(idProduct) => {
        const productos = await fs.promises.readFile(pathToFile, 'utf-8');
        const prodId = productos.map(e => e.id)
        if(prodId === idProduct){
            const prodIdIngresado = productos.find(prod => prod.id === idProduct)
            return console.log(`Producto elegido: ${prodIdIngresado}`)
        }else{
            return console.log("Error leyendo datos")
        }
    }
    deleteById = async(idProduct) => {
        const productos = await fs.promises.readFile(pathToFile, 'utf-8');
        const prodId = productos.map(e => e.id)
        if(prodId === idProduct){
            return newArray = productos.filter(prod => prod.id !== idProduct)
        }else{
           console.log("Error eliminando producto")
        }
    }
    deleteAll = async() => {
        if (fs.existsSync(this.pathToFile)) {
            await fs.promises.writeFile(this.pathToFile, "[]")
        }
    }
    update = async(productToUpdate, idProduct) => {
        const productos = await this.getAll();
        const obtProd = productos.find(producto => producto.id == idProduct);
        if (obtProd.id === productToUpdate.id) {
            await fs.promises.writeFile(pathToFile, JSON.stringify(productToUpdate, null, '\t'))
        };
    }
};

export default Contenedor;