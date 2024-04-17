const express = require('express')
const ProductManager = require('../productManager.js')
const app = express()
const PORT = 8080





app.use(express.urlencoded({extended: true}))
app.use(express.json())





app.get('/products',(req ,res)=>{
    
    getProducts()
    res.send(products)
    
})


app.get('/products/:pid',(req ,res)=>{
    res.json({})
})


app.listen(PORT,()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})





