const express = require('express')
const ProductManager = require('./productManager.js')
const app = express()
const PORT = 8080



const manager = new ProductManager()

app.use(express.urlencoded({extended: true}))
app.use(express.json())





app.get('/products',async (req ,res)=>{
    try{
    let products = await manager.getProducts()
    res.send(products)
}catch(error){

}
    
})


app.get('/products/:pid',async (req ,res)=>{
    try{
        const productId = parseInt(req.params.pid);
        const product = await manager.getProductById(productId);
        res.send(product)

    }catch(error){

    }
    
})


app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})





