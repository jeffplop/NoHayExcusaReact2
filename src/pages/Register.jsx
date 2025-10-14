// Register Page (register.html)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const initialFormData = {
    nombre: '', apellido: '', email: '', telefono: '', genero: '', fecha: '', password: ''
};
const initialErrors = {
    nombre: '', apellido: '', email: '', telefono: '', genero: '', fecha: '', password: ''
};

const Register = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Limpiar error al escribir
        if (errors[e.target.name]) {
             setErrors({ ...errors, [e.target.name]: '' });
        }
    };
    
    // Función de validación de formulario (lógica ya adaptada en el backend)
    // Aquí solo se validan campos requeridos antes de enviar
    const validateForm = () => {
        const newErrors = { ...initialErrors };
        let isValid = true;

        if (!formData.nombre) { newErrors.nombre = 'Campo requerido.'; isValid = false; }
        if (!formData.apellido) { newErrors.apellido = 'Campo requerido.'; isValid = false; }
        if (!formData.email) { newErrors.email = 'Campo requerido.'; isValid = false; }
        if (!formData.telefono) { newErrors.telefono = 'Campo requerido.'; isValid = false; }
        if (!formData.genero) { newErrors.genero = 'Selecciona una opción.'; isValid = false; }
        if (!formData.fecha) { newErrors.fecha = 'Campo requerido.'; isValid = false; }
        if (!formData.password) { newErrors.password = 'Campo requerido.'; isValid = false; }

        setErrors(newErrors);
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!validateForm()) {
            setMessage({ text: 'Corrige los errores en el formulario.', type: 'error' });
            return;
        }

        setMessage({ text: 'Procesando registro...', type: 'info' });

        // Enviar datos al Backend para validación y registro seguro
        const result = await registerUser(formData);
        
        if (result.success) {
            setMessage({ text: 'Registro exitoso.', type: 'success' });
            setFormData(initialFormData);
            setErrors(initialErrors);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } else {
            // Manejar errores de validación del Backend (ej: email ya registrado, menor de 18 años, etc.)
            const backendErrors = result.errors || {};
            setErrors(prev => ({...prev, ...backendErrors}));
            setMessage({ text: result.message || 'Error en el registro.', type: 'error' });
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
    
    const inputStyle = { backgroundColor: '#222', color: '#fff', borderColor: '#555' };
    const errorStyle = { color: '#e53935', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' };

    return (
        <main>
            <div className="form-container" style={formContainerStyle}>
                <h2 className="text-center text-danger mb-4">Registro de Usuario</h2>
                <form id="registerForm" onSubmit={handleSubmit}>
                    
                    {Object.keys(initialFormData).map((key) => (
                        <div className="mb-3" key={key}>
                            <label htmlFor={`register-${key}`} className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            {key === 'genero' ? (
                                <select 
                                    className="form-control" 
                                    id={`register-${key}`} 
                                    name={key} 
                                    value={formData[key]} 
                                    onChange={handleInputChange} 
                                    required
                                    style={inputStyle}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            ) : (
                                <input 
                                    type={key === 'email' ? 'email' : key === 'password' ? 'password' : key === 'fecha' ? 'date' : key === 'telefono' ? 'tel' : 'text'} 
                                    className="form-control" 
                                    id={`register-${key}`} 
                                    name={key} 
                                    value={formData[key]} 
                                    onChange={handleInputChange} 
                                    required 
                                    style={inputStyle}
                                />
                            )}
                            {errors[key] && <span style={errorStyle}>{errors[key]}</span>}
                        </div>
                    ))}

                    {message.text && (
                        <div className={`alert text-center fw-bold ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`} 
                            role="alert"
                            style={{ backgroundColor: message.type === 'error' ? '#e53935' : '#4CAF50', color: 'white' }}
                        >
                            {message.text}
                        </div>
                    )}
                    
                    <button type="submit" className="btn btn-danger w-100 mt-3" style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}>
                        Registrarse
                    </button>
                </form>
                
                <hr style={{ border: 0, borderTop: '1px solid #444', margin: '30px 0 15px' }} />
                <p style={{ textAlign: 'center', color: '#ccc' }}>
                    ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#e53935', textDecoration: 'none', fontWeight: 700 }}>Iniciar sesión</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
