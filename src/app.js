import express from 'express';
import sqlite3 from './dbs/knex.js';
import { Server } from 'socket.io';
import ManagerSQL from './Managers/ManagerSQL.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Escuchando Express en el puerto ${server.address().port} :)`));
const io = new Server();
const productSQL = new ManagerSQL(sqlite3, "products");
const mensajesSQL = new ManagerSQL(sqlite3, "mensajes");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

io.on('connection', async socket => {
    console.log('Socket conectado :D');
    socket.emit("products", await productSQL.getAll());

    socket.on('update', async producto => {
        await productSQL.save(producto)
        io.sockets.emit("products", await productSQL.getAll())
    })

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString
        await mensajesSQL.save(mensaje)
        io.sockets.emit("mensajes", await mensajesSQL.getAll())
    })
})