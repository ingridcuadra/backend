import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';
import productRouter from './routes/productos.router.js';
import { Server } from 'socket.io';
import chatRouter from './routes/chat.router.js';

const app = express();
const server = app.listen(8080, ()=>console.log("Escuchando Express :)"));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'));

const io = new Server(server);

app.use('/', viewRouter);
app.use('/api/productos', productRouter);
app.use('/chat', chatRouter);

const mensajes = [];

io.on('connection', socket=>{
    console.log('Socket conectado :D');
    socket.emit('mensajeCargado', mensajes);
    socket.on('mensaje', data=>{
        mensajes.push(data);
        io.emit('mensajeCargado', mensajes);
    });
    socket.on('authenticated', data=>{
        socket.broadcast.emit('newUserConnected', data);
    });
});