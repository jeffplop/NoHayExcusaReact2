// Cart Page (carrito.html)
import React, { useState } from 'react';
import { useAppContext } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
    const { cart, totalAmount, isAuthenticated, handleRemoveFromCart, handleCheckout } = useAppContext();
    const [checkoutMessage, setCheckoutMessage] = useState('');

    const onRemove = async (productId) => {
        await handleRemoveFromCart(productId);
        setCheckoutMessage(''); // Limpiar mensajes al modificar carrito
    };

    const onCheckout = async () => {
        const result = await handleCheckout();
        setCheckoutMessage(result.message);
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setCheckoutMessage(''), 3000);
    };

    return (
        <main>
            <section id="carrito" className="container my-5 text-center">
                <h2 className="text-danger">Mi Carrito de Compras</h2>
                
                <div className="carrito-container text-start mt-4">
                    {cart.length === 0 ? (
                        <p className="text-white-50">El carrito de compras está vacío.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="d-flex align-items-center p-3 bg-dark rounded mb-3 shadow-sm">
                                <img 
                                    src={`${process.env.PUBLIC_URL}/${item.imagen}`} 
                                    alt={item.nombre} 
                                    style={{ width: '80px', height: '80px', borderRadius: '5px', objectFit: 'cover', marginRight: '1rem' }}
                                />
                                <div className="flex-grow-1 text-white">
                                    <h4 className="mb-0">{item.nombre}</h4>
                                    <p className="mb-1 text-white-50">Precio: ${item.precio.toLocaleString('es-CL')}</p>
                                    <p className="mb-0">Cantidad: {item.cantidad}</p>
                                </div>
                                <div className="item-actions">
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => onRemove(item.id)}
                                        style={{ backgroundColor: '#c62828', borderColor: '#c62828' }}
                                        aria-label={`Eliminar ${item.nombre} del carrito`}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="d-flex justify-content-end align-items-center mt-5">
                    <h3 className="text-white me-3">Total: </h3>
                    <span className="text-danger fs-3 fw-bold">${totalAmount.toLocaleString('es-CL')}</span>
                </div>
                
                {isAuthenticated && cart.length > 0 && (
                    <button 
                        id="confirmar-compra-btn" 
                        className="btn btn-lg w-100 mt-4" 
                        onClick={onCheckout}
                        style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}
                    >
                        Confirmar Compra
                    </button>
                )}
                
                {checkoutMessage && (
                    <div 
                        className={`alert mt-3 ${checkoutMessage.includes('éxito') ? 'alert-success' : 'alert-danger'}`} 
                        role="alert"
                        style={{ backgroundColor: checkoutMessage.includes('éxito') ? '#4CAF50' : '#e53935', color: 'white', fontWeight: 'bold' }}
                    >
                        {checkoutMessage}
                    </div>
                )}
                
                {!isAuthenticated && cart.length > 0 && (
                     <div className="alert alert-warning mt-3" style={{ backgroundColor: '#f0ad4e', color: 'black', fontWeight: 'bold' }}>
                        Debes iniciar sesión para confirmar la compra.
                     </div>
                )}
            </section>
        </main>
    );
};

export default Cart;
