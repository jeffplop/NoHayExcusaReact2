import React, { useState } from 'react';
import { useAppContext } from '../context/Context';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import CartItem from '../components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCreditCard, faArrowLeft, faTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, totalItems, totalAmount, totalSavings, loadingCart, handleCheckout, handleClearCart } = useAppContext();
    const [checkoutMessage, setCheckoutMessage] = useState(null);

    const onCheckout = async () => {
        const result = await handleCheckout();
        setCheckoutMessage({ type: result.success ? 'success' : 'danger', text: result.message });
        setTimeout(() => setCheckoutMessage(null), 3000);
    };

    if (loadingCart) {
        return <main className="container my-5 text-center"><p className="text-white">Cargando carrito...</p></main>;
    }

    return (
        <main className="bg-black min-vh-100 py-5">
            <Container>
                <h1 className="text-danger mb-4 text-uppercase fw-bold">Mi Carrito</h1>
                
                {checkoutMessage && <Alert variant={checkoutMessage.type}>{checkoutMessage.text}</Alert>}

                {totalItems === 0 ? (
                    <div className="text-center py-5 bg-dark rounded border border-secondary">
                        <h3 className="text-white-50 mb-4">Tu carrito está vacío</h3>
                        <p className="text-muted mb-4">Parece que aún no has agregado productos a tu entrenamiento.</p>
                        <Link to="/productos" className="btn btn-danger px-5 py-3 fw-bold rounded-pill shadow">
                            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> IR A LA TIENDA
                        </Link>
                    </div>
                ) : (
                    <Row>
                        <Col lg={8}>
                            <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                                <span className="text-white-50">{totalItems} productos seleccionados</span>
                                <Button variant="link" className="text-muted text-decoration-none p-0 hover-danger" onClick={handleClearCart}>
                                    <FontAwesomeIcon icon={faTrashAlt} /> Vaciar todo
                                </Button>
                            </div>
                            
                            {cart.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </Col>
                        <Col lg={4}>
                            <Card className="bg-dark border-secondary shadow position-sticky" style={{ top: '100px' }}>
                                <Card.Body className="p-4">
                                    <h4 className="text-white mb-4">Resumen del Pedido</h4>
                                    
                                    <div className="d-flex justify-content-between mb-2 text-white-50">
                                        <span>Subtotal</span>
                                        <span>${(totalAmount + totalSavings).toLocaleString('es-CL')}</span>
                                    </div>
                                    
                                    {totalSavings > 0 && (
                                        <div className="d-flex justify-content-between mb-2 text-success">
                                            <span><FontAwesomeIcon icon={faTag} className="me-1" /> Descuentos</span>
                                            <span>- ${totalSavings.toLocaleString('es-CL')}</span>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between mb-4 text-white-50">
                                        <span>Envío</span>
                                        <span className="text-success">Gratis</span>
                                    </div>
                                    
                                    <hr className="border-secondary" />
                                    
                                    <div className="d-flex justify-content-between mb-4 align-items-end">
                                        <span className="text-white h5 mb-0">Total a Pagar</span>
                                        <span className="text-danger h3 fw-bold mb-0">${totalAmount.toLocaleString('es-CL')}</span>
                                    </div>
                                    
                                    <Button 
                                        variant="danger" 
                                        className="w-100 py-3 fw-bold text-uppercase shadow-lg"
                                        onClick={onCheckout}
                                        style={{ background: 'linear-gradient(45deg, #e53935, #ff5252)', border: 'none' }}
                                    >
                                        <FontAwesomeIcon icon={faCreditCard} className="me-2" /> Confirmar Compra
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    );
};

export default Cart;