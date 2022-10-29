import express from 'express';

const app = express();

const server = app.listen(8080, ()=>console.log("Escuchando Express :)"))

app.get('/', (req, res)=>{
    res.send('hola express')
})

app.get('/despedida', (req, res)=>{
    res.send('chau')
})