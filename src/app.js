import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// Routers
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Managers
import ProductManager from './managers/ProductManager.js';

const app = express();
const PORT = 8080;

// Configuración para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear servidor HTTP y WebSocket
const httpServer = createServer(app);
const io = new Server(httpServer);

// Instancia de ProductManager
const productManager = new ProductManager('./data/products.json');

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// WebSocket Connection
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar lista de productos al cliente cuando se conecta
    try {
        const products = await productManager.getProducts();
        socket.emit('products', products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }

    // Escuchar nuevo producto desde el cliente
    socket.on('newProduct', async (productData) => {
        try {
            const newProduct = await productManager.addProduct(productData);
            
            // Obtener todos los productos actualizados
            const products = await productManager.getProducts();
            
            // Emitir a todos los clientes
            io.emit('products', products);
            console.log('Nuevo producto agregado via WebSocket:', newProduct);
        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    });

    // Escuchar eliminar producto
    socket.on('deleteProduct', async (productId) => {
        try {
            await productManager.deleteProduct(productId);
            
            // Obtener todos los productos actualizados
            const products = await productManager.getProducts();
            
            // Emitir a todos los clientes
            io.emit('products', products);
            console.log('Producto eliminado via WebSocket:', productId);
        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar servidor
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { app, io };