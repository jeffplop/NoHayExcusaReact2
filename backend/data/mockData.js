// Archivo: backend/data/mockData.js
// Simulación de la base de datos (BD) en memoria
// ⚠️ CORRECCIÓN DE SEGURIDAD: Usamos bcryptjs para hashear contraseñas
const bcrypt = require('bcryptjs');

// Simula la tabla de usuarios en la BD
const users = []; 

// Productos estáticos (adaptados de js/main.js)
const products = [
    // La propiedad 'imagen' usa la ruta relativa que se usa en el Frontend
    { id: 1, nombre: "Proteína en Polvo", precio: 25000, imagen: "images/protein-art.jpg" },
    { id: 2, nombre: "Bandas de Resistencia", precio: 15000, imagen: "images/banda_resistencia.jpg" },
    { id: 3, nombre: "Mancuernas Ajustables", precio: 50000, imagen: "images/Mancuernas_ajustables.jpg" },
    { id: 4, nombre: "Ropa Deportiva", precio: 30000, imagen: "images/ropa_deportiva.jpg" }
];

// Almacenamiento simulado del carrito por email de usuario (o 'guest')
const userCarts = {}; // Formato: { 'usuario@ejemplo.com': [{ id: 1, cantidad: 2 }] }

/**
 * Registra un nuevo usuario de forma segura con contraseña hasheada.
 * @param {object} userData - Datos del usuario a registrar.
 * @returns {object|null} Los datos del nuevo usuario (sin password) o null si ya existe.
 */
function registerUser(userData) {
    if (users.find(u => u.email === userData.email)) {
        return null; // Email ya registrado
    }

    // 1. Hash de la contraseña (fundamental para la seguridad)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);

    const newUser = {
        ...userData,
        password: hashedPassword, // Almacenamiento seguro del hash
        id: users.length + 1
    };

    users.push(newUser);
    // Devolver un objeto sin el hash de la contraseña para seguridad en el frontend
    return { 
        id: newUser.id, 
        nombre: newUser.nombre, 
        email: newUser.email 
    }; 
}

/**
 * Busca un usuario por email y valida su contraseña hasheada.
 * @param {string} email 
 * @param {string} password 
 * @returns {object|null} Los datos seguros del usuario o null si las credenciales fallan.
 */
function findUserAndValidate(email, password) {
    const user = users.find(u => u.email === email);

    if (user) {
        // 2. Comparación del hash (método seguro)
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            // Devolver un objeto sin la contraseña hasheada
            const { password, ...safeUser } = user;
            return safeUser;
        }
    }
    return null;
}

module.exports = {
    products,
    registerUser,
    findUserAndValidate,
    userCarts
};
