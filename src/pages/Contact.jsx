import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        let valid = true;
        
        if (!formData.name) {
            newErrors.name = 'El nombre es requerido.';
            valid = false;
        } else if (formData.name.length > 100) {
            newErrors.name = 'El nombre no puede exceder los 100 caracteres.';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
            valid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Formato de correo electrónico inválido.';
            valid = false;
        } else if (formData.email.length > 100) {
            newErrors.email = 'El correo electrónico no puede exceder los 100 caracteres.';
            valid = false;
        }

        if (!formData.message) {
            newErrors.message = 'El mensaje es requerido.';
            valid = false;
        } else if (formData.message.length > 500) {
            newErrors.message = 'El mensaje no puede exceder los 500 caracteres.';
            valid = false;
        }

        setErrors(newErrors);
        setSuccessMessage('');
        return valid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setSuccessMessage('¡Mensaje enviado con éxito!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };
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
            <section id="contacto" className="container my-5 text-center">
                <h2 className="text-danger">Contacto</h2>
                <p className="text-white-50">¿Tienes alguna pregunta? Envíanos un mensaje y te responderemos a la brevedad.</p>
                
                <div className="form-container" style={formContainerStyle}>
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="contact-name" className="form-label">Nombre:</label>
                            <input type="text" className="form-control" id="contact-name" name="name" value={formData.name} onChange={handleInputChange} style={inputStyle} />
                            {errors.name && <span style={errorStyle}>{errors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact-email" className="form-label">Correo Electrónico:</label>
                            <input type="email" className="form-control" id="contact-email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyle} />
                            {errors.email && <span style={errorStyle}>{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact-message" className="form-label">Mensaje:</label>
                            <textarea className="form-control" id="contact-message" name="message" rows="5" value={formData.message} onChange={handleInputChange} style={inputStyle}></textarea>
                            {errors.message && <span style={errorStyle}>{errors.message}</span>}
                        </div>
                        
                        {successMessage && (
                            <div className="alert alert-success text-center fw-bold" 
                                role="alert" 
                                style={{ backgroundColor: '#4CAF50', color: 'white' }}
                            >
                                {successMessage}
                            </div>
                        )}

                        <button type="submit" className="btn btn-danger w-100 mt-3" style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}>
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Contact;
