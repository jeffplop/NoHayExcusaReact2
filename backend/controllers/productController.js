// Archivo: backend/controllers/productController.js
const { products, userCarts } = require('../data/mockData');

// GET /api/products
// Devuelve el catálogo estático de productos para la página Productos.js
exports.getProducts = (req, res) => {
    res.json(products);
};

// GET /api/cart
// Devuelve el estado actual del carrito del usuario autenticado o del invitado.
exports.getCart = (req, res) => {
    // El email viene del middleware en server.js (o es 'guest' si no está logueado)
    const currentUserEmail = req.user ? req.user.email : 'guest';
    
    // Si no existe un carrito para ese usuario/email, devuelve un array vacío.
    const cart = userCarts[currentUserEmail] || [];
    res.json(cart);
};

// POST /api/cart/add
// Lógica adaptada de la función 'agregarAlCarrito' de js/main.js
exports.addToCart = (req, res) => {
    const { productId, quantity = 1 } = req.body;
    // Identificamos al usuario para guardar su carrito en el almacenamiento simulado.
    const currentUserEmail = req.user ? req.user.email : 'guest';
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    // Inicializa el carrito si es la primera vez que se añade algo
    userCarts[currentUserEmail] = userCarts[currentUserEmail] || [];
    let cart = userCarts[currentUserEmail];

    const itemEnCarrito = cart.find(item => item.id === productId);

    if (itemEnCarrito) {
        // Si ya está, solo aumenta la cantidad
        itemEnCarrito.cantidad += quantity;
    } else {
        // Si es nuevo, lo agrega con todos sus detalles
        cart.push({ 
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen,
            cantidad: quantity 
        });
    }
    
    res.json({ message: `"${product.nombre}" ha sido añadido al carrito.`, cart: userCarts[currentUserEmail] });
};

// POST /api/cart/remove
// Lógica adaptada de la función 'eliminarDelCarrito' de js/main.js
exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    const currentUserEmail = req.user ? req.user.email : 'guest';
    
    userCarts[currentUserEmail] = userCarts[currentUserEmail] || [];
    let cart = userCarts[currentUserEmail];

    // Filtra el carrito para eliminar el producto con el ID proporcionado
    userCarts[currentUserEmail] = cart.filter(item => item.id !== productId);

    res.json({ message: 'Producto eliminado del carrito.', cart: userCarts[currentUserEmail] });
};


// POST /api/checkout (Confirmar Compra)
// Lógica adaptada de la función 'confirmarCompra' de js/main.js
exports.checkout = (req, res) => {
    // Solo permite la compra si hay un usuario autenticado (CORRECCIÓN DE SEGURIDAD)
    const currentUserEmail = req.user ? req.user.email : null; 
    
    if (!currentUserEmail) {
        // Error de autenticación (igual que en js/main.js)
        return res.status(401).json({ success: false, message: 'Debes iniciar sesión para confirmar la compra.' });
    }
    
    const cart = userCarts[currentUserEmail] || [];

    if (cart.length === 0) {
        // Error de carrito vacío (igual que en js/main.js)
        return res.status(400).json({ success: false, message: 'El carrito está vacío. Añade productos para comprar.' });
    }

    // Simulación de compra exitosa: vaciar el carrito
    userCarts[currentUserEmail] = []; 
    
    res.json({ success: true, message: '¡Compra confirmada con éxito! Revisa tu correo para más detalles.' });
};
