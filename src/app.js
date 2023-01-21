import express from 'express';
import __dirname from './utils.js';
import productRouter from './routes/productos.router.js';

const app = express();
const server = app.listen(8080,()=>console.log("Escuchando Express :)"));

app.set('views',__dirname+'/views');
app.set('view engine','pug');

app.get('/',(req,res)=>{
    res.render('home.pug',{
        message:"Bienvenid@s a esta página principal con pug"
    })
})

app.use('/productos', productRouter);