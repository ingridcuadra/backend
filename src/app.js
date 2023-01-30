import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import chatRouter from './routes/chat.router.js';
import productosRealTimeRouter from './routes/productos.real.time.router.js';

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Escuchando Express :) en el puerto ${server.address().port}`));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'));

const io = new Server(server);

app.use('/', viewRouter);
app.use('/productos-en-tiempo-real', productosRealTimeRouter);
app.use('/chat', chatRouter);

const mensajes = [];
const prodAgregado = [];

io.on('connection', socket=>{
    console.log('Socket conectado :D');

    //Agregar productos
    socket.on('enviarProd', newProd=>{
        prodAgregado.push(newProd);
        io.emit('prodAgregado', prodAgregado);
    });

    //Chat
    socket.emit('mensajeCargado', mensajes);
    socket.on('mensaje', data=>{
        mensajes.push(data);
        io.emit('mensajeCargado', mensajes);
    });
    socket.on('authenticated', data=>{
        socket.broadcast.emit('newUserConnected', data);
    });
});