import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../context/Context';

const Header = () => {
    const { isAuthenticated, currentUserEmail, totalItems, handleLogout } = useAppContext();
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/');
    };

    const logoPath = `${process.env.PUBLIC_URL}/images/logo.jpg`;

    const navStyle = {
        backgroundColor: '#000',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    };
    const linkStyle = { color: '#fff', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s ease' };
    const linkHoverStyle = { color: '#e53935' };
    const logoStyle = { height: 'auto', width: '120px' };

    return (
        <header style={navStyle}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark container" style={{ padding: '1rem 0' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logoPath} alt="Logo de NOHAYEXCUSA.CL" style={logoStyle} />
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-3" id="main-nav-links">
                            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/nosotros">Quiénes somos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/carrito" style={linkStyle}
                                    onMouseOver={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                                    onMouseOut={(e) => e.currentTarget.style.color = linkStyle.color}
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} /> Carrito ({totalItems})
                                </Link>
                            </li>

                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link text-white-50">Hola, {currentUserEmail?.split('@')[0] || 'Usuario'}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={onLogout} className="btn btn-danger btn-sm" style={{ backgroundColor: '#e53935', borderColor: '#e53935' }}>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/register">Registro</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
