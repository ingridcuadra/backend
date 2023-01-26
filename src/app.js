import express from 'express';
import __dirname from './utils.js';
import productRouter from './routes/productos.router.js';

const app = express();
const server = app.listen(8080, ()=>console.log("Escuchando Express :)"));

app.use((req,res,next)=>{
    console.log("Petición recibida");
    next();
})

app.use(express.json());
app.use(express.static(__dirname+'/public'));

app.use('/api/productos', productRouter);