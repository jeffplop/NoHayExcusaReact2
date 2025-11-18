import React from 'react';
import { useAppContext } from '../context/Context';
import { Container } from 'react-bootstrap';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cart, totalItems, totalAmount, loadingCart, handleCheckout } = useAppContext();

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