class ProductManager{

    constructor(){
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock ){
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Error: Todos los campos son obligatorios");
            return;
        }
        // Validar que el código no se repita
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.error(`Error: El código '${code}' ya existe`);
            return;
        }

        const newProduct = {
            id: this.nextId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);

        console.log(`Producto '${title}' agregado exitosamente (ID: ${newProduct.id})`);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
        
        if (!product) {
            console.error("Not found");
            return null;
        } 
        return product;
    }

}
const manager = new ProductManager();

manager.addProduct("perro", "ladra", 1000, "ruta", 1, 20);
manager.addProduct("gato", "miaw", 2000, "ruta", 2, 10);

console.log("\nBuscando producto con ID 2:");
console.log(manager.getProductById(2));