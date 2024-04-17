const ProductManager = require('../productManager.js');

const productManager = new ProductManager()
try {
    // Cargar los productos existentes desde el archivo JSON
    await productManager.readProducts();

    // Crear un objeto que represente el nuevo producto
    const nuevoProducto = {
        "title": "Nuevo Producto",
        "description": "Descripción del nuevo producto",
        "price": 9.99,
        "thumbnail": "https://ejemplo.com/imagen.jpg",
        "code": "ABC123",
        "stock": 10
    };

    // Agregar el nuevo producto
    const productoAgregado = await productManager.addProduct(nuevoProducto);
    console.log("Producto agregado:", productoAgregado);
} catch (error) {
    console.error("Error al agregar el producto:", error);
}


// Llamar a la función para agregar el producto nuevo
addProduct();