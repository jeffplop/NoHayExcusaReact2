import React from 'react';

const Footer = () => {
    const footerStyle = {
        textAlign: 'center',
        padding: '1.5rem',
        backgroundColor: '#000',
        color: '#fff',
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; 2025 NOHAYEXCUSA.CL - Todos los derechos reservados</p>
        </footer>
    );
};

export default Footer;
