import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Home = () => {
    const backgroundParallaxStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'brightness(0.4)'
    };

    return (
        <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <div style={backgroundParallaxStyle}></div>
            
            <div className="d-flex align-items-center justify-content-center" style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
                <Container className="text-center text-white">
                    <h1 className="display-1 fw-bold text-uppercase mb-3" style={{ letterSpacing: '3px', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                        <span className="text-danger">No Hay</span> Excusas
                    </h1>
                    <p className="lead mb-5 fs-3 fw-light text-white-50">
                        Tu transformación física empieza con la decisión correcta.
                    </p>
                    
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                        <Link to="/productos">
                            <Button variant="danger" size="lg" className="px-5 py-3 rounded-pill fw-bold shadow-lg" style={{ fontSize: '1.2rem' }}>
                                Ver Catálogo
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline-light" size="lg" className="px-5 py-3 rounded-pill fw-bold" style={{ fontSize: '1.2rem' }}>
                                Únete Ahora
                            </Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </main>
    );
};

export default Home;