import knex from 'knex';

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
};

const db = knex(sqlite3);

try{
    let exists = await db.schema.hasTable('products')
    if(!exists){
        await db.schema.createTable('products', table => {
            table.primary('id');
            table.increments('id');
            table.string('title', 20).nullable(false);
            table.string('image', 200).nullable(false);
            table.string('description', 150).nullable(false);
            table.integer('price').nullable(false);
            table.integer('stock').nullable(false);
            table.string('code', 10).unique(true);
            console.log("Tabla de productos creada");
        })
    }
}catch(error){
    console.log("Error creando tabla de productos")
}

try{
    let exists = await db.schema.hasTable('mensajes')
    if(!exists){
        await db.schema.createTable('mensajes', table => {
            table.primary('id');
            table.increments('id');
            table.string('autor', 20);
            table.string('mensaje', 200);
            table.string('date', 60);
            console.log("Tabla de mensajes creada");
        })
    }
}catch(error){
    console.log("Error creando tabla de mensajes")
}

export default sqlite3;

// const db = knex({
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',
//         database: 'databaseknex'
//     }
// });

// try{
//     let exists = await db.schema.hasTable('products');
//     if(!exists){
//         await db.schema.createTable('products', table => {
//             table.primary('id');
//             table.increments('id');
//             table.string('title', 20).nullable(false);
//             table.string('image', 200).nullable(false);
//             table.string('description', 150).nullable(false);
//             table.integer('price').nullable(false);
//             table.integer('stock').nullable(false);
//             table.string('code', 10).unique(true);
//         })
//     }
// }
// catch(error){
//     console.log(error);
// }