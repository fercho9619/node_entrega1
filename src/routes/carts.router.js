import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

// POST /api/carts/
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ cart: newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);
        res.json({ cart });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.json({ cart: updatedCart });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;