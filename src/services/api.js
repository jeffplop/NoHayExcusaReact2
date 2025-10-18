import PRODUCTS_DATA from '../data/products.json';

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
    await simulateDelay();
    let users = getLocalData('users', {});

    if (users[userData.email]) {
        return { success: false, message: "El correo electrónico ya está registrado." };
    }

    users[userData.email] = userData;
    setLocalData('users', users);

    return { success: true, message: "Registro exitoso.", user: { email: userData.email } };
};

export const loginUser = async (email, password) => {
    await simulateDelay();
    const users = getLocalData('users', {});
    const user = users[email];

    if (user && user.password === password) {
        localStorage.setItem('authToken', 'local_token'); 
        localStorage.setItem('userEmail', email);

        return { success: true, message: "Inicio de sesión exitoso.", user: { email } };
    } else {
        return { success: false, message: "Credenciales incorrectas." };
    }
};

export const getProducts = async () => {
    await simulateDelay();
    return PRODUCTS_DATA;
};

export const getCart = async () => {
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    const carts = getLocalData('carts', {});
    const localCart = carts[currentUserEmail] || [];

    const enrichedCart = localCart.map(cartItem => {
        const productDetails = PRODUCTS_DATA.find(p => p.id === cartItem.id);
        
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

export const addToCart = async (productId) => {
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    let carts = getLocalData('carts', {});
    let cart = carts[currentUserEmail] || [];
    const product = PRODUCTS_DATA.find(p => p.id === productId);

    if (!product) {
        return { success: false, message: "Producto no encontrado." };
    }

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].cantidad += 1;
    } else {
        cart.push({ id: product.id, cantidad: 1 }); 
    }

    carts[currentUserEmail] = cart;
    setLocalData('carts', carts);
    return { success: true, message: "Producto añadido." };
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
    await simulateDelay();
    const currentUserEmail = localStorage.getItem('userEmail') || 'guest';
    let carts = getLocalData('carts', {});

    carts[currentUserEmail] = [];
    setLocalData('carts', carts);

    return { success: true, message: "Compra confirmada con éxito." };
};
