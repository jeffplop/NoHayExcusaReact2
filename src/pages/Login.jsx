// Login Page (login.html)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/Context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const { handleLogin, isAuthenticated } = useAppContext();
    const navigate = useNavigate();

    // Redirigir si ya está autenticado
    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setMessage({ text: 'Completa todos los campos.', type: 'error' });
            return;
        }

        setMessage({ text: 'Iniciando sesión...', type: 'info' });
        
        const result = await handleLogin(email, password);
        
        if (result.success) {
            setMessage({ text: 'Iniciando sesión...', type: 'success' });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            // El mensaje de error viene del backend (ej: 'Credenciales incorrectas.')
            setMessage({ text: result.message, type: 'error' });
        }
    };

    // Estilo para el contenedor del formulario (adaptado de style.css)
    const formContainerStyle = {
        maxWidth: '500px',
        margin: '2rem auto',
        backgroundColor: '#333',
        padding: '2rem',
        borderRadius: '10px',
        textAlign: 'left',
        color: '#fff',
    };

    return (
        <main>
            <div className="form-container" style={formContainerStyle}>
                <h2 className="text-center text-danger mb-4">Iniciar sesión</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="login-email" className="form-label">E-mail</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="login-email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={{ backgroundColor: '#222', color: '#fff', borderColor: '#555' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="login-password" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="login-password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={{ backgroundColor: '#222', color: '#fff', borderColor: '#555' }}
                        />
                    </div>
                    
                    {message.text && (
                        <div className={`alert text-center fw-bold ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`} 
                            role="alert" 
                            style={{ backgroundColor: message.type === 'error' ? '#e53935' : '#4CAF50', color: 'white' }}
                        >
                            {message.text}
                        </div>
                    )}
                    
                    <button type="submit" className="btn btn-danger w-100 mt-3" style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontSize: '1.1rem', fontWeight: 700 }}>
                        Iniciar sesión
                    </button>
                </form>
                
                <hr style={{ border: 0, borderTop: '1px solid #444', margin: '30px 0 15px' }} />
                <p style={{ textAlign: 'center', color: '#ccc' }}>
                    ¿Eres un usuario nuevo? <Link to="/register" style={{ color: '#e53935', textDecoration: 'none', fontWeight: 700 }}>Crear cuenta</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
