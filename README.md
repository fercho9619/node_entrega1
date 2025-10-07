API Ecommerce - Entrega 1

API RESTful para gestión de productos y carritos de compra, desarrollada con Node.js y Express.

Características

- Gestión completa de productos (CRUD)
- Sistema de carritos de compra
- IDs autoincrementables únicos

Postman collection
- Ya viene incluida una colleccion de postman para poder usar la API

Requisitos

- Node.js 22+ 
- npm o yarn

 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/fercho9619/node_entrega1
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
