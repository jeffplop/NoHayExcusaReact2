import React from 'react';
import { useAppContext } from '../context/Context';
import { Container } from 'react-bootstrap';

const Cart = () => {
    const { cart, totalItems, totalAmount, loadingCart, handleRemoveFromCart, handleCheckout } = useAppContext();
    const CartItem = ({ item }) => {
        const imgPath = item.imagen; 
        
        return (
            <div className="cart-item d-flex align-items-center mb-3 p-3 border rounded shadow-sm bg-dark">
                <img 
                    src={imgPath} 
                    alt={`Imagen de ${item.nombre}`} 
                    className="me-3" 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div className="flex-grow-1 text-white text-start">
                    <h5 className="mb-0 text-danger">{item.nombre}</h5>
                    <p className="mb-0">Precio unitario: ${item.precio.toLocaleString('es-CL')}</p>
                    <p className="mb-0">Cantidad: {item.cantidad}</p>
                </div>
                <button
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={() => handleRemoveFromCart(item.id)}
                >
                    Eliminar
                </button>
            </div>
        );
    };

    if (loadingCart) {
        return <main className="container my-5 text-center"><p className="text-white">Cargando carrito...</p></main>;
    }

    return (
        <main>
            <Container className="my-5 text-white">
                <section id="carrito" className="text-center">
                    <h2 className="text-danger">Mi Carrito de Compras</h2>
                    <div className="carrito-container mt-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {totalItems === 0 ? (
                            <p className="text-white-50">Tu carrito está vacío.</p>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                                <div className="carrito-total border-top border-secondary pt-3 mt-4 text-end">
                                    <h3 className="text-white">Total: <span className="text-danger">${totalAmount.toLocaleString('es-CL')}</span></h3>
                                </div>
                                <button 
                                    className="btn btn-danger w-100 mt-3"
                                    onClick={handleCheckout}
                                    style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}
                                >
                                    Confirmar Compra
                                </button>
                            </>
                        )}
                    </div>
                </section>
            </Container>
        </main>
    );
};

export default Cart;