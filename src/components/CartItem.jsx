import React, { useState } from 'react';
import { useAppContext } from '../context/Context';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { handleRemoveFromCart } = useAppContext();
    const [removing, setRemoving] = useState(false);
    const imgPath = item.imagen;

    const onRemove = () => {
        setRemoving(true);
        setTimeout(() => {
            handleRemoveFromCart(item.id);
        }, 500);
    };
    
    return (
        <div className={`cart-item d-flex align-items-center mb-3 p-3 border rounded shadow-sm bg-dark ${removing ? 'cart-item-removing' : ''}`}>
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
                onClick={onRemove}
                disabled={removing}
            >
                Eliminar
            </button>
        </div>
    );
};

export default CartItem;