// Archivo: backend/server.js
const express = require('express');
const cors = require('cors');
// Importamos los controladores que manejan la lógica de negocio
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');

const app = express();
const PORT = 3001; // El Backend correrá en el puerto 3001

// === MIDDLEWARE ===

// 1. CORS: Permite que el Frontend (React en 3000) pueda hablar con este Backend (3001)
app.use(cors()); 

// 2. Body Parser: Permite que Express lea datos JSON enviados en las peticiones POST
app.use(express.json()); 

// 3. Middleware de Autenticación simulado
// Este middleware simula la extracción del email del usuario a partir de un header
// que el Frontend le envía (usado por el Contexto de React y los servicios API)
app.use((req, res, next) => {
    // El frontend envía el email en el header 'x-user-email' si está logueado
    const userEmail = req.headers['x-user-email']; 
    if (userEmail) {
        req.user = { email: userEmail };
    } else {
        req.user = null; // Usuario invitado
    }
    next();
});

// === RUTAS DE LA API ===

// Rutas de Autenticación (Login y Registro)
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

// Rutas de Productos y Carrito
app.get('/api/products', productController.getProducts);
app.get('/api/cart', productController.getCart);
app.post('/api/cart/add', productController.addToCart);
app.post('/api/cart/remove', productController.removeFromCart);
app.post('/api/checkout', productController.checkout);

// === INICIO DEL SERVIDOR ===
app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
