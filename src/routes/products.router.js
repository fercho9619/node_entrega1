import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

// GET /api/products/
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        res.json({ product });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/products/
router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json({ product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(productId, req.body);
        res.json({ product: updatedProduct });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productManager.deleteProduct(productId);
        res.json({ message: 'Producto eliminado', product: deletedProduct });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;