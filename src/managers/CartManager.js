import fs from 'fs/promises';

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.initializeFile();
    }

    async initializeFile() {
        try {
            await fs.access(this.path);
        } catch (error) {
            await this.saveCarts([]);
        }
    }

    async saveCarts(carts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        } catch (error) {
            throw new Error(`Error al guardar carritos: ${error.message}`);
        }
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error al leer carritos: ${error.message}`);
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === id);
        
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        return cart;
    }

    async createCart() {
        const carts = await this.getCarts();
        
        // Generar ID autoincrementable
        const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;

        const newCart = {
            id: newId,
            products: []
        };

        carts.push(newCart);
        await this.saveCarts(carts);

        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);

        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado");
        }

        const cart = carts[cartIndex];
        
        // Buscar si el producto ya existe en el carrito
        const productIndex = cart.products.findIndex(p => p.product === productId);

        if (productIndex !== -1) {
            // Incrementar cantidad si el producto ya existe
            cart.products[productIndex].quantity += 1;
        } else {
            // Agregar nuevo producto al carrito
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        await this.saveCarts(carts);
        return cart;
    }
}

export default CartManager;