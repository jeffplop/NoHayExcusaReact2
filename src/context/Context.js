import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, checkoutCart, loginUser } from '../services/api';
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [cart, setCart] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const email = localStorage.getItem('userEmail');
        
        if (token && email) {
            setIsAuthenticated(true);
            setCurrentUserEmail(email);
        }
    }, []);
    useEffect(() => {
        const fetchCart = async () => {
            setLoadingCart(true);
            try {
                const fetchedCart = await getCart();
                setCart(fetchedCart || []); 
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
                setCart([]);
            } finally {
                setLoadingCart(false);
            }
        };

        fetchCart();
    }, [isAuthenticated, currentUserEmail]); 

    const handleLogin = async (email, password) => {
        const result = await loginUser(email, password);
        if (result.success) {
            setIsAuthenticated(true);
            setCurrentUserEmail(result.user.email);
        }
        return result;
    };
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        setIsAuthenticated(false);
        setCurrentUserEmail(null);
        setCart([]);
    };

    const handleAddToCart = async (productId) => {
        try {
            const result = await addToCart(productId);
            const fetchedCart = await getCart();
            setCart(fetchedCart);
            return result;
        } catch (error) {
            console.error("Error al añadir al carrito:", error);
            return { message: "Error al añadir el producto." };
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const result = await removeFromCart(productId);
            const fetchedCart = await getCart();
            setCart(fetchedCart);
            return result;
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
            return { message: "Error al eliminar el producto." };
        }
    };
    const handleCheckout = async () => {
        const result = await checkoutCart();
        if (result.success) {
            setCart([]);
        }
        return result;
    };

    const totalItems = (cart || []).reduce((total, item) => total + item.cantidad, 0);
    const totalAmount = (cart || []).reduce((total, item) => total + (item.precio * item.cantidad), 0);
    
    return (
        <AppContext.Provider 
            value={{
                isAuthenticated,
                currentUserEmail,
                cart,
                totalItems,
                totalAmount,
                loadingCart,
                handleLogin,
                handleLogout,
                handleAddToCart,
                handleRemoveFromCart,
                handleCheckout
            }}
        >
            {children}
        </AppContext.Provider>
    );
};