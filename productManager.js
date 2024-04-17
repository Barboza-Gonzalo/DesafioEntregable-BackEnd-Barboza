const fs = require('fs').promises




class ProductManager {

    constructor(){
        this.products = []
        this.nextID = 1
        this.productsFile = "products.json"
               

    }


    async readProducts() {
        try {
            const data = await fs.readFile(this.productsFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
               return[];
            } else {
                throw error;
            }
        }
    }

    async saveProductsToFile() {
         try {
        await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
        
    } catch (error) {
        console.error("Error al guardar productos en el archivo:", error);
    }
}
    

    async addProduct(product) {
        try {
            if (!this.isProductValid(product)) {
                throw new Error("El producto no es válido");
            }
            
            if (this.isCodeDuplicate(product.code)) {
                throw new Error("El código del producto ya está en uso");
            }

            /* product.id = this.nextID++; */
            this.products.push(product);
            await this.saveProductsToFile();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(product_id) {
        try {
            let busId = this.products.find((product) => product.id === product_id);
            if (!busId) {
                throw new Error("Producto no encontrado");
            }
            return busId;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(product_id) {
        try {
            let busId = this.products.findIndex((product) => product.id === product_id);
            if (busId !== -1) {
                this.products.splice(busId, 1);
                await this.saveProductsToFile()
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(product_id, updatedFields) {
        try {
            const busId = this.products.findIndex((product) => product.id === product_id);
            if (busId !== -1) {
                this.products[busId] = { ...this.products[busId], ...updatedFields };
                await this.saveProductsToFile();
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            throw error;
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code) {
        return this.products.some((p) => p.code === code);
    }
}




module.exports = ProductManager

