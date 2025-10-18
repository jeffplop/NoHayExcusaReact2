import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { useAppContext } from '../context/Context';
import NutritionalCalculator from '../components/NutritionalCalculator'; 

const ProductCard = ({ product, onAddToCart }) => {
    const imgPath = product.imagen; 

    return (
        <div className="card text-white p-3 shadow-lg h-100" style={{ flex: '1 1 250px' }}>
            <img 
                src={imgPath} 
                className="card-img-top mx-auto" 
                alt={`Imagen de ${product.nombre}`} 
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '0.75rem', border: '2px solid #555' }}
            />
            <div className="card-body text-center">
                <h3 className="card-title text-danger">{product.nombre}</h3>
                <p className="card-text fw-bold" style={{ fontSize: '1.25rem' }}>$ {product.precio.toLocaleString('es-CL')}</p>
                <button 
                    className="btn btn-danger w-100 mt-2"
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
            setTimeout(() => setMessage(''), 2000);
        }
    };

    if (loading) {
        return <main className="container my-5 text-center"><p className="text-white">Cargando productos...</p></main>;
    }

    return (
        <main>
            <section id="productos" className="container my-5 text-center">
                <h2 className="text-danger">Nuestros Productos</h2>
                <p className="text-white-50 lead">Descubre todo lo que necesitas para tu entrenamiento.</p>
                {message && <div className="alert alert-success text-center mt-3" role="alert">{message}</div>}
                
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <NutritionalCalculator />
                    </div>
                </div>

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
