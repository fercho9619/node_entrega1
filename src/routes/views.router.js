import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

// Vista Home
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { 
            title: 'Productos',
            products 
        });
    } catch (error) {
        res.status(500).render('home', { 
            title: 'Productos',
            products: [],
            error: error.message 
        });
    }
});

// Vista Real Time Products
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { 
            title: 'Productos en Tiempo Real',
            products 
        });
    } catch (error) {
        res.status(500).render('realTimeProducts', { 
            title: 'Productos en Tiempo Real',
            products: [],
            error: error.message 
        });
    }
});

export default router;