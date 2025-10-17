import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const heroStyle = {
        textAlign: 'center',
        padding: '6rem 2rem',
        backgroundColor: '#222',
        color: '#fff',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        overflow: 'hidden',
    };

    const overlayStyle = {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
    };

    const textStyle = {
        color: '#fff',
        position: 'relative',
        zIndex: 2,
    };

    return (
        <main>
            <section id="home" className="hero" style={heroStyle}>
                <div style={overlayStyle}></div>
                <div style={textStyle}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>No hay excusas, empieza hoy tu transformación</h2>
                    <p style={{ fontSize: '1.2rem' }}>Planes de entrenamiento y alimentación adaptados a tus objetivos</p>
                    <Link to="/productos" className="btn btn-danger mt-3" 
                        style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}
                    >
                        Ver Productos
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Home;
