import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroContainerStyle = {
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        zIndex: 2,
    };

    const contentParallaxStyle = {
        transform: `translateY(${offsetY * 0.15}px)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
    };

    const backgroundParallaxStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner.jpg)`,
        transform: `translateY(${offsetY * 0}px)` 
    };

    return (
        <main>
            <section id="home" className="parallax-container">
                <div className="parallax-background" 
                    style={backgroundParallaxStyle}
                ></div>
                
                <div className="parallax-content" style={heroContainerStyle}>
                    <div className="hero-content" style={contentParallaxStyle}>
                        <h2 className="display-4" style={{ marginBottom: '1rem', color: '#e53935' }}>
                            No hay excusas, empieza hoy tu transformación
                        </h2>
                        <p className="lead" style={{ fontSize: '1.4rem', fontWeight: 300 }}>
                            Planes de entrenamiento y alimentación adaptados a tus objetivos
                        </p>
                        
                        <Link to="/productos" className="btn btn-danger btn-lg mt-4" 
                        >
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
