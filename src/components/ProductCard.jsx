import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAppContext } from '../context/Context';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { handleAddToCart } = useAppContext();
    const [adding, setAdding] = useState(false);

    const onAddToCart = () => {
        setAdding(true);
        handleAddToCart(product.id, product.nombre);
        setTimeout(() => setAdding(false), 500);
    };

    return (
        <Card className="product-card h-100 shadow-sm" bg="dark" text="white">
            <Card.Img variant="top" src={product.imagen} alt={product.nombre} className="product-image" />
            <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>
                    ${product.precio.toLocaleString('es-CL')}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-end">
                <Button 
                    variant={adding ? "success" : "danger"}
                    onClick={onAddToCart}
                    disabled={adding}
                    className={adding ? "add-to-cart-animate" : ""}
                >
                    {adding ? "Agregado!" : "Añadir al carrito"}
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;