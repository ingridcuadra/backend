import fs from 'fs';
import __dirname from '../utils.js';

const pathToFile = __dirname + '/files/productos.json';

let productos = [
    {
        id: 1,
        title: "Osito",
        price: 199.99,
        thumbnail: "https://drive.google.com/uc?export=view&id=11uc-59GI0zaNrYU9JiZVh75HasVozs_Q"
    },
    {
        id: 2,
        title: "Gatito",
        price: 199.99,
        thumbnail: "https://drive.google.com/uc?export=view&id=14PfLaUF6BBMtua7yyEycN7xvpwQTNmqL"
    },
    {
        id: 3,
        title: "Sapito",
        price: 199.99,
        thumbnail: "https://drive.google.com/uc?export=view&id=13beDo6GZedh5rZU65e11OLM4_kPANsWy"
    }
]

class Contenedor {
    constructor() {
        if(!fs.existsSync(pathToFile)){
            this.init();
        }
    }
    init = async() => {
        await fs.promises.writeFile(pathToFile, JSON.stringify([]))
    }
    save = async() => {
        await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, '\t'))
        const productoId = productos.map(e => e.id)
        return productoId
    }
    getById = (id) => {
        const prodId = productos.map(e => e.id)
        if(prodId === id){
            const prodIdIngresado = productos.find(prod => prod.id === id)
            return console.log(`Producto elegido: ${prodIdIngresado}`)
        }else{
            return console.log("Error leyendo datos")
        }
    }
    getAll = async() => {
        const data = await fs.promises.readFile(pathToFile, 'utf-8')
        const arrayProductos = JSON.parse(data)
        return arrayProductos
    }
    saveNewProd = async(producto) => {
        productos = await this.getAll();
        productos.push(producto);
        await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'))
        return productos;
    }
    deleteById = (id) => {
        const prodId = productos.map(e => e.id)
        if(prodId === id){
            return newArray = productos.filter(prod => prod.id !== id)
        }else{
           console.log("Error eliminando producto")
        }
    }
    deleteAll = async() => {
        await fs.promises.unlink(pathToFile)
    }
}

export default Contenedor;