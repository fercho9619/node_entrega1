const socket = io();

// Elementos del DOM
const productForm = document.getElementById('productForm');
const productsList = document.getElementById('productsList');
const alertContainer = document.getElementById('alertContainer');

// Manejar envío del formulario
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    const productData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        code: formData.get('code'),
        stock: parseInt(formData.get('stock')),
        category: formData.get('category'),
        thumbnails: []
    };

    // Emitir nuevo producto via WebSocket
    socket.emit('newProduct', productData);
    
    // Limpiar formulario
    productForm.reset();
});

// Escuchar eliminación de productos
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const productId = parseInt(e.target.dataset.id);
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            socket.emit('deleteProduct', productId);
        }
    }
});

// Escuchar actualización de productos
socket.on('products', (products) => {
    updateProductsList(products);
});

// Escuchar errores
socket.on('error', (error) => {
    showAlert(error.message, 'danger');
});

// Actualizar lista de productos
function updateProductsList(products) {
    if (products.length === 0) {
        productsList.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">No hay productos disponibles</div>
            </div>
        `;
        return;
    }

    productsList.innerHTML = products.map(product => `
        <div class="col-md-6 mb-3">
            <div class="card product-card">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text text-muted small">${product.description}</p>
                    <div class="d-flex justify-content-between">
                        <span class="badge bg-primary">$${product.price}</span>
                        <span class="badge bg-secondary">Stock: ${product.stock}</span>
                        <span class="badge bg-info">${product.category}</span>
                    </div>
                    <button class="btn btn-danger btn-sm mt-2 w-100 delete-btn" data-id="${product.id}">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mostrar alertas
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Mostrar mensaje de conexión
socket.on('connect', () => {
    showAlert('Conectado al servidor en tiempo real', 'success');
});