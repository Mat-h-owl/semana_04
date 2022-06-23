function p(x){
    console.log(x)
}


const express = require('express')

const app = express();
app.use(express.json())

//const routerProductos = express.Router();
//app.use('/api/productos',routerProductos)
//routerProductos.use(express.json())

objeto1 = {id:1,title:"Vaso",price:10,thumbnail:'web1.com'}
objeto2 = {id:2,title:"Taza",price:20,thumbnail:'web2.com'}
let db_array = [objeto1,objeto2]

class BaseDatos{
    constructor(lista){
        this.lista = lista;
        this.contador = lista.length;}}

let db = new BaseDatos(db_array)

app.get('/api/productos',(req,res)=>{
    res.send(db.lista)
})

app.get('/api/productos/:id',(req,res)=>{
    let id_ = Number(req.params.id);
    let productoEncontrado = db.lista.find(x=> x.id === id_)

    if (productoEncontrado){
        res.json({msg:"Producto Solicitado:",
        producto:productoEncontrado
    })

    }   else{
        res.status(404).json({msg:"Producto no encontrado"})
    }
    
})

app.post('/api/productos',(req,res)=>{
    let nuevoProducto = req.body
    db.contador += 1
    nuevoProducto.id = db.contador
    db.lista.push(nuevoProducto)
    res.json(nuevoProducto)
})

app.put('/api/productos/:id',(req,res)=>{
    const {id} = req.params;
    let id_ = Number(id);
    let producto = req.body;
    let productoEncontrado = db.lista.find(x => x.id === id_)

    if (productoEncontrado){
        productoEncontrado.title = producto.title
        productoEncontrado.price = producto.price
        productoEncontrado.thumbnail = producto.thumbnail
        res.json({msg:"Producto Modificado:",
        producto:productoEncontrado
    })

    }   else{
        res.status(404).json({msg:"Producto no encontrado"})
    }
})

app.delete('/api/productos/:id',(req,res)=>{
    const {id} = req.params;
    let id_ = Number(id)
    
    const deleted = db.lista.find(x => x.id === id_)

    if (deleted){
        db.lista = db.lista.filter(x => x.id !== id_)
        res.json({msg:"Se elimino el siguiente producto:",
        producto:deleted
    })

    }   else{
        res.status(404).json({msg:"Producto no encontrado"})
    }
})



const PORT = 8080;
const server = app.listen(PORT,()=>{
    p('Server running')
})