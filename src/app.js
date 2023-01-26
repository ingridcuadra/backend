import express from 'express';
import __dirname from './utils.js';
import productRouter from './routes/productos.router.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';
import { Server } from 'socket.io';

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

const mensajes = [];

io.on('connection', socket=>{
    console.log('Socket conectado :D');

    socket.on('mensaje', data=>{
        mensajes.push({socketid:socket.id, mensaje:data})
        io.emit('mensajeCargado', mensajes);
    });
});