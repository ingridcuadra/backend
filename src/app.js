import express, { application } from 'express';
import __dirname from './utils.js';
import productRouter from './routes/productos.router.js';


const app = express();
const server = app.listen(8080, ()=>console.log("Escuchando Express :)"));

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home.ejs');
})

app.use('/productos', productRouter)