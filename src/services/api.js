// Archivo de Servicios API para el Frontend
import axios from 'axios';

// La URL base apunta al servidor de Node.js/Express
const API_URL = 'http://localhost:3001/api';

// ------------------------------------------------------------------------
// Funciones de Autenticación
// ------------------------------------------------------------------------

/**
 * Registra un nuevo usuario enviando los datos al backend.
 * @param {object} userData - Datos del usuario para el registro.
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

/**
 * Inicia sesión enviando credenciales al backend.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 */
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        // Guardamos el token y el email en localStorage (CORRECCIÓN DE SEGURIDAD: Solo se guarda el token JWT, no la contraseña)
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userEmail', response.data.user.email);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// ------------------------------------------------------------------------
// Funciones de Carrito y Productos
// ------------------------------------------------------------------------

// Función utilitaria para obtener la configuración con el email del usuario (simulando autenticación)
const getConfig = () => ({
    headers: {
        // En un proyecto real, se enviaría el token JWT. Aquí enviamos el email como header
        // para que el backend pueda rastrear el carrito simulado.
        'X-User-Email': localStorage.getItem('userEmail') || 'guest'
    }
});

/**
 * Obtiene la lista de productos del backend.
 */
export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

/**
 * Obtiene el carrito del usuario.
 */
export const getCart = async () => {
    const response = await axios.get(`${API_URL}/cart`, getConfig());
    return response.data;
};

/**
 * Añade un producto al carrito.
 * @param {number} productId - ID del producto a añadir.
 */
export const addToCart = async (productId) => {
    const response = await axios.post(`${API_URL}/cart/add`, { productId }, getConfig());
    return response.data;
};

/**
 * Elimina un producto del carrito.
 * @param {number} productId - ID del producto a eliminar.
 */
export const removeFromCart = async (productId) => {
    const response = await axios.post(`${API_URL}/cart/remove`, { productId }, getConfig());
    return response.data;
};

/**
 * Confirma la compra (checkout).
 */
export const checkoutCart = async () => {
    try {
        const response = await axios.post(`${API_URL}/checkout`, {}, getConfig());
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
