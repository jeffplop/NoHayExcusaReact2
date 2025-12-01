import React, { useState } from 'react';
import { useAppContext } from '../context/Context';
import { Button, InputGroup, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { handleUpdateQuantity, handleRemoveFromCart } = useAppContext();
    const [removing, setRemoving] = useState(false);
    const imgPath = item.imagen;

    const finalPrice = item.descuento > 0 
        ? item.precio - (item.precio * item.descuento / 100) 
        : item.precio;

    const increment = () => {
        if (item.cantidad < item.stock) {
            handleUpdateQuantity(item.id, item.cantidad + 1);
        }
    };

    const decrement = () => {
        if (item.cantidad > 1) {
            handleUpdateQuantity(item.id, item.cantidad - 1);
        }
    };

    const onRemove = () => {
        setRemoving(true);
        setTimeout(() => {
            handleRemoveFromCart(item.id);
        }, 500);
    };
    
    return (
        <div className={`cart-item d-flex align-items-center mb-3 p-3 border border-secondary rounded shadow-sm bg-dark ${removing ? 'cart-item-removing' : ''}`}>
            <img 
                src={imgPath} 
                alt={`Imagen de ${item.nombre}`} 
                className="me-3 rounded" 
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            
            <div className="flex-grow-1 text-white">
                <div className="d-flex justify-content-between align-items-start">
                    <h5 className="mb-1 text-danger fw-bold">{item.nombre}</h5>
                    {item.descuento > 0 && <Badge bg="success">-{item.descuento}%</Badge>}
                </div>
                
                <div className="d-flex align-items-baseline">
                    <span className="fw-bold fs-5">${finalPrice.toLocaleString('es-CL')}</span>
                    {item.descuento > 0 && (
                        <small className="text-muted text-decoration-line-through ms-2">
                            ${item.precio.toLocaleString('es-CL')}
                        </small>
                    )}
                </div>
                <small className="text-white-50">Stock disponible: {item.stock}</small>
            </div>

            <div className="d-flex flex-column align-items-end ms-4">
                <InputGroup size="sm" style={{ width: '110px' }} className="mb-2">
                    <Button variant="outline-secondary" onClick={decrement} disabled={item.cantidad <= 1}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <Form.Control 
                        className="text-center bg-dark text-white border-secondary p-0" 
                        value={item.cantidad} 
                        readOnly
                        style={{height: '31px'}}
                    />
                    <Button variant="outline-secondary" onClick={increment} disabled={item.cantidad >= item.stock}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </InputGroup>

                <Button
                    variant="link"
                    className="text-danger text-decoration-none p-0 small"
                    onClick={onRemove}
                >
                    <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                </Button>
            </div>
        </div>
    );
};

export default CartItem;