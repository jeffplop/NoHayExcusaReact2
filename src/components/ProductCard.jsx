import React, { useState } from 'react';
import { Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { useAppContext } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { handleAddToCart } = useAppContext();
    const [adding, setAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const isOutOfStock = product.stock <= 0;

    const handleQuantityChange = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        if (val > product.stock) val = product.stock;
        setQuantity(val);
    };

    const increment = () => {
        if (quantity < product.stock) setQuantity(prev => prev + 1);
    };

    const decrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const onAddToCart = () => {
        setAdding(true);
        handleAddToCart(product.id, quantity);
        setTimeout(() => {
            setAdding(false);
            setQuantity(1);
        }, 500);
    };

    const hasDiscount = product.descuento && product.descuento > 0;
    const finalPrice = hasDiscount 
        ? product.precio - (product.precio * product.descuento / 100) 
        : product.precio;

    return (
        <Card className="product-card h-100 shadow-sm border-0" bg="dark" text="white">
            <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={product.imagen} alt={product.nombre} className="product-image" />
                {hasDiscount && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-2 px-3 py-2 fs-6 shadow">
                        -{product.descuento}% OFF
                    </Badge>
                )}
                {isOutOfStock && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(2px)'}}>
                        <Badge bg="secondary" className="fs-5 px-4 py-2">AGOTADO</Badge>
                    </div>
                )}
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-1">{product.nombre}</Card.Title>
                <div className="mb-3">
                    <Badge bg="secondary" className="me-2">{product.categoria?.nombre || 'General'}</Badge>
                    <small className={product.stock < 5 ? 'text-danger fw-bold' : 'text-success'}>
                        {isOutOfStock ? 'Sin stock' : `${product.stock} disponibles`}
                    </small>
                </div>
                
                <div className="mt-auto">
                    <div className="d-flex align-items-end mb-3">
                        {hasDiscount ? (
                            <div>
                                <span className="text-muted text-decoration-line-through me-2 small">${product.precio.toLocaleString('es-CL')}</span>
                                <h4 className="text-white fw-bold mb-0">${finalPrice.toLocaleString('es-CL')}</h4>
                            </div>
                        ) : (
                            <h4 className="text-white fw-bold mb-0">${product.precio.toLocaleString('es-CL')}</h4>
                        )}
                    </div>

                    {!isOutOfStock && (
                        <div className="d-flex gap-2">
                            <InputGroup size="sm" style={{ width: '100px' }}>
                                <Button variant="outline-secondary" onClick={decrement}><FontAwesomeIcon icon={faMinus} /></Button>
                                <Form.Control 
                                    className="text-center bg-dark text-white border-secondary p-0" 
                                    value={quantity} 
                                    onChange={handleQuantityChange}
                                    style={{height: '31px'}} 
                                />
                                <Button variant="outline-secondary" onClick={increment}><FontAwesomeIcon icon={faPlus} /></Button>
                            </InputGroup>
                            <Button 
                                variant={adding ? "success" : "danger"}
                                onClick={onAddToCart}
                                disabled={adding}
                                className={`w-100 fw-bold ${adding ? "add-to-cart-animate" : ""}`}
                                size="sm"
                            >
                                {adding ? "¡Listo!" : <><FontAwesomeIcon icon={faCartPlus} /> Agregar</>}
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;