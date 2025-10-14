// Products Page (productos.html)
import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { useAppContext } from '../context/Context';

const ProductCard = ({ product, onAddToCart }) => {
    const imgPath = `${process.env.PUBLIC_URL}/${product.imagen}`;

    return (
        <div className="card text-white bg-dark p-3 shadow-lg" style={{ borderRadius: '8px', flex: '1 1 250px' }}>
            <img 
                src={imgPath} 
                className="card-img-top mx-auto" 
                alt={`Imagen de ${product.nombre}`} 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #555' }}
            />
            <div className="card-body text-center">
                <h3 className="card-title text-danger">{product.nombre}</h3>
                <p className="card-text fw-bold">$ {product.precio.toLocaleString('es-CL')}</p>
                <button 
                    className="btn btn-danger w-100 mt-2"
                    style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}
                    onClick={() => onAddToCart(product.id, product.nombre)}
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { handleAddToCart } = useAppContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener productos:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const onAddToCart = async (id, nombre) => {
        const result = await handleAddToCart(id);
        if (result.message) {
            setMessage(`"${nombre}" ha sido añadido al carrito.`);
            setTimeout(() => setMessage(''), 2000); // Ocultar mensaje después de 2s
        }
    };

    if (loading) {
        return <main className="container my-5 text-center"><p className="text-white">Cargando productos...</p></main>;
    }

    return (
        <main>
            <section id="productos" className="container my-5 text-center">
                <h2 className="text-danger">Nuestros Productos</h2>
                <p className="text-white-50">Descubre todo lo que necesitas para tu entrenamiento.</p>
                {message && <div className="alert alert-success text-center mt-3" role="alert">{message}</div>}
                
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
                    {products.map(product => (
                        <div key={product.id} className="col d-flex">
                            <ProductCard product={product} onAddToCart={onAddToCart} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Products;
