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

// import express from 'express';
// import __dirname from './utils.js';
// import productRouter from './routes/productos.router.js';
// import handlebars from 'express-handlebars';
// import viewRouter from './routes/views.router.js';

// const app = express();
// const server = app.listen(8080, ()=>console.log("Escuchando Express :)"));

// app.use((req,res,next)=>{
//     console.log("Petición recibida");
//     next();
// })

// app.engine('handlebars', handlebars.engine());
// app.set('views', __dirname+'/views');
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use('/', viewRouter);
// app.use('/api/productos', productRouter);

// app.use(express.static(__dirname+'/public'));

//Pug 
///app.set('views', __dirName + '/views')
///app.set('view engine', 'pug')
///app.use('/', productRouter);
///app.use('/productos', productRouter);

//Ejs
///app.set('views', __dirName + '/views')
///app.set('view engine', 'ejs')
///app.use('/', productRouter);
///app.use('/productos', productRouter);