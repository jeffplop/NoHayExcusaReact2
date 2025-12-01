import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300));

const getLocalData = (key, defaultValue = {}) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch {
        return defaultValue;
    }
};

const setLocalData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return { success: true, message: "Registro exitoso.", user: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data || "Error al registrar usuario." };
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (response.data.success) {
            localStorage.setItem('authToken', 'backend_token_dummy');
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userRole', response.data.user.role);
            return { success: true, message: "Inicio de sesión exitoso.", user: response.data.user };
        }
    } catch (error) {
        return { success: false, message: "Credenciales incorrectas." };
    }
    return { success: false, message: "Error inesperado." };
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/productos`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/productos/${id}`, productData);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false };
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/productos/${id}`);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const getCart = async () => {
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    const carts = getLocalData('carts', {});
    const localCart = carts[currentUserEmail] || [];

    if (localCart.length === 0) {
        return [];
    }

    const allProducts = await getProducts();
    if (!allProducts || allProducts.length === 0) {
        return [];
    }

    const enrichedCart = localCart.map(cartItem => {
        const productDetails = allProducts.find(p => p.id === cartItem.id);
        
        if (productDetails) {
            return {
                ...productDetails, 
                cantidad: cartItem.cantidad,
            };
        }
        return null;
    }).filter(item => item !== null);

    return enrichedCart;
};

export const addToCart = async (productId, quantity = 1) => {
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    let carts = getLocalData('carts', {});
    let cart = carts[currentUserEmail] || [];

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].cantidad += quantity;
    } else {
        cart.push({ id: productId, cantidad: quantity });
    }

    carts[currentUserEmail] = cart;
    setLocalData('carts', carts);
    return { success: true, message: "Producto añadido." };
};

export const updateCartItem = async (productId, newQuantity) => {
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    let carts = getLocalData('carts', {});
    let cart = carts[currentUserEmail] || [];

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity > 0) {
            cart[itemIndex].cantidad = newQuantity;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
    }

    carts[currentUserEmail] = cart;
    setLocalData('carts', carts);
    return { success: true };
};

export const removeFromCart = async (productId) => {
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    let carts = getLocalData('carts', {});
    let cart = carts[currentUserEmail] || [];

    cart = cart.filter(item => item.id !== productId);

    carts[currentUserEmail] = cart;
    setLocalData('carts', carts);

    return { success: true, message: "Producto eliminado.", cart };
};

export const checkoutCart = async () => {
    const currentUserEmail = localStorage.getItem('userEmail');
    if (!currentUserEmail) return { success: false, message: "Debes iniciar sesión." };

    const carts = getLocalData('carts', {});
    const localCart = carts[currentUserEmail] || [];

    if (localCart.length === 0) return { success: false, message: "El carrito está vacío." };

    const checkoutData = {
        email: currentUserEmail,
        items: localCart.map(item => ({ productoId: item.id, cantidad: item.cantidad }))
    };

    try {
        await axios.post(`${API_URL}/boletas`, checkoutData);
        carts[currentUserEmail] = [];
        setLocalData('carts', carts);
        return { success: true, message: "Compra confirmada con éxito." };
    } catch (error) {
        return { success: false, message: "Error al procesar la compra. Verifica el stock." };
    }
};

export const getVentas = async () => {
    try {
        const response = await axios.get(`${API_URL}/boletas`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        return [];
    }
};