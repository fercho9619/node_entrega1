API Ecommerce - Primera Entrega

API RESTful para gestión de productos y carritos de compra, desarrollada con Node.js y Express.

Características

- ✅ Gestión completa de productos (CRUD)
- ✅ Sistema de carritos de compra
- ✅ Persistencia en archivos JSON
- ✅ IDs autoincrementables únicos
- ✅ Validación de datos integrada
- ✅ Manejo de errores robusto

Requisitos

- Node.js 16+ 
- npm o yarn

 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd proyecto-ecommerce

2. npm install

3. npm start

Endpoints de la API

Productos (/api/products)

Método	    Endpoint	        Descripción
GET	        /	                Obtener todos los productos
GET	        /:pid	            Obtener producto por ID
POST	    /	                Crear nuevo producto
PUT	        /:pid	            Actualizar producto
DELETE	    /:pid	            Eliminar producto

Carritos (/api/carts)
Método	    Endpoint	        Descripción
POST	    /	                Crear nuevo carrito
GET	        /:cid	            Obtener carrito por ID
POST	    /:cid/product/:pid	Agregar producto al carrito
