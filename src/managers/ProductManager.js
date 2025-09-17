import fs from 'fs/promises';
import path from 'path';

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.initializeFile();
    }

    async initializeFile() {
        try {
            await fs.access(this.path);
        } catch (error) {
            await this.saveProducts([]);
        }
    }

    async saveProducts(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(`Error al guardar productos: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error al leer productos: ${error.message}`);
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        
        if (!product) {
            throw new Error("Producto no encontrado");
        }

        return product;
    }

    async addProduct(productData) {
        const { title, description, code, price, stock, category, thumbnails } = productData;

        // Validar campos obligatorios
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        for (const field of requiredFields) {
            if (!productData[field]) {
                throw new Error(`El campo ${field} es obligatorio`);
            }
        }

        const products = await this.getProducts();

        // Validar código único
        const codeExists = products.some(product => product.code === code);
        if (codeExists) {
            throw new Error(`El código '${code}' ya existe`);
        }

        // Generar ID autoincrementable
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price: Number(price),
            status: true,
            stock: Number(stock),
            category,
            thumbnails: thumbnails || []
        };

        products.push(newProduct);
        await this.saveProducts(products);

        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        // No permitir actualizar el id
        const { id: _, ...allowedFields } = updatedFields;
        products[productIndex] = { ...products[productIndex], ...allowedFields };

        await this.saveProducts(products);
        return products[productIndex];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            throw new Error("Producto no encontrado");
        }

        const deletedProduct = products.splice(productIndex, 1)[0];
        await this.saveProducts(products);

        return deletedProduct;
    }
}

export default ProductManager;