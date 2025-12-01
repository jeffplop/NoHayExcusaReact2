import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { Container, Card, Form, Button, Alert, Spinner, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialFormData = { nombre: '', apellido: '', email: '', telefono: '', genero: '', fecha: '', password: '' };

const countryCodes = [
    { code: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: '+51', flag: '🇵🇪', name: 'Perú' },
    { code: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: '+55', flag: '🇧🇷', name: 'Brasil' },
    { code: '+52', flag: '🇲🇽', name: 'México' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+34', flag: '🇪🇸', name: 'España' }
];

const Register = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [prefix, setPrefix] = useState('+56');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [passStrength, setPassStrength] = useState(0);
    const [passVariant, setPassVariant] = useState('danger');
    const [passText, setPassText] = useState('');

    const navigate = useNavigate();

    const calculateStrength = (password) => {
        let score = 0;
        if (password.length > 5) score += 20;
        if (password.length > 10) score += 20;
        if (/[A-Z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 20;

        setPassStrength(score);

        if (score < 40) {
            setPassVariant('danger');
            setPassText('Débil');
        } else if (score < 80) {
            setPassVariant('warning');
            setPassText('Media');
        } else {
            setPassVariant('success');
            setPassText('Fuerte');
        }
    };

    const validateField = (name, value) => {
        let error = null;
        switch (name) {
            case 'nombre':
            case 'apellido':
                if (value.length < 2) error = 'Mínimo 2 caracteres';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
                break;
            case 'telefono':
                if (!/^\d{8,15}$/.test(value)) error = 'Solo números (8-15 dígitos)';
                break;
            case 'password':
                if (value.length < 6) error = 'Mínimo 6 caracteres';
                break;
            default:
                if (!value) error = 'Campo requerido';
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (name === 'password') calculateStrength(value);

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, formData[name]);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const hasErrors = Object.keys(formData).some(key => validateField(key, formData[key]));
        if (hasErrors) {
            setTouched({ nombre: true, apellido: true, email: true, telefono: true, genero: true, fecha: true, password: true });
            setMessage({ text: 'Por favor corrige los errores antes de continuar.', type: 'warning' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const finalData = {
            ...formData,
            telefono: `${prefix} ${formData.telefono}`
        };

        const result = await registerUser(finalData);
        setLoading(false);
        
        if (result.success) {
            setMessage({ text: '¡Cuenta creada con éxito! Redirigiendo...', type: 'success' });
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setMessage({ text: result.message, type: 'danger' });
        }
    };

    const getInputState = (name) => {
        if (!touched[name]) return null;
        return !errors[name];
    };

    return (
        <main className="bg-black min-vh-100 py-5">
            <Container className="d-flex justify-content-center">
                <Card className="p-4 shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#1a1a1a' }}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link to="/login" className="text-secondary"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                            <h2 className="text-white fw-bold m-0 text-uppercase text-danger">Crear Cuenta</h2>
                            <div style={{width: 20}}></div>
                        </div>

                        {message && <Alert variant={message.type} className="text-center border-0">{message.text}</Alert>}

                        <Form onSubmit={handleSubmit} noValidate>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Control 
                                        name="nombre" 
                                        placeholder="Nombre" 
                                        onChange={handleInputChange} 
                                        onBlur={handleBlur}
                                        isValid={getInputState('nombre') === true}
                                        isInvalid={getInputState('nombre') === false}
                                        className="rounded-3" 
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Control 
                                        name="apellido" 
                                        placeholder="Apellido" 
                                        onChange={handleInputChange} 
                                        onBlur={handleBlur}
                                        isValid={getInputState('apellido') === true}
                                        isInvalid={getInputState('apellido') === false}
                                        className="rounded-3" 
                                    />
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    placeholder="Correo Electrónico" 
                                    onChange={handleInputChange} 
                                    onBlur={handleBlur}
                                    isValid={getInputState('email') === true}
                                    isInvalid={getInputState('email') === false}
                                    className="rounded-3" 
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <InputGroup>
                                        <Form.Select 
                                            value={prefix} 
                                            onChange={(e) => setPrefix(e.target.value)} 
                                            style={{ maxWidth: '100px', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                            className="bg-dark text-white border-secondary"
                                        >
                                            {countryCodes.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.flag} {country.code}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control 
                                            type="tel" 
                                            name="telefono" 
                                            placeholder="9 1234 5678" 
                                            onChange={handleInputChange} 
                                            onBlur={handleBlur}
                                            isValid={getInputState('telefono') === true}
                                            isInvalid={getInputState('telefono') === false}
                                            className="rounded-3" 
                                            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Select 
                                        name="genero" 
                                        onChange={handleInputChange} 
                                        onBlur={handleBlur}
                                        isValid={getInputState('genero') === true}
                                        isInvalid={getInputState('genero') === false}
                                        required 
                                        className="rounded-3 text-white"
                                    >
                                        <option value="" className="text-muted">Selecciona Género</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="otro">Otro</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label className="text-white-50 small ms-2">Fecha de Nacimiento</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="fecha" 
                                    onChange={handleInputChange} 
                                    onBlur={handleBlur}
                                    isValid={getInputState('fecha') === true}
                                    isInvalid={getInputState('fecha') === false}
                                    className="rounded-3" 
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <InputGroup hasValidation>
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"}
                                        name="password" 
                                        placeholder="Contraseña segura" 
                                        onChange={handleInputChange} 
                                        onBlur={handleBlur}
                                        isValid={getInputState('password') === true}
                                        isInvalid={getInputState('password') === false}
                                        className="rounded-start-3 border-end-0" 
                                    />
                                    <Button 
                                        variant="outline-secondary"
                                        className="bg-dark text-white-50 border-start-0 border-secondary rounded-end-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </Button>
                                    <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                                </InputGroup>
                                
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="text-white-50 small">Fuerza:</span>
                                            <span className={`text-${passVariant} small fw-bold`}>{passText}</span>
                                        </div>
                                        <ProgressBar 
                                            now={passStrength} 
                                            variant={passVariant} 
                                            style={{ height: '5px' }} 
                                        />
                                    </div>
                                )}
                            </Form.Group>

                            <Button 
                                variant="light" 
                                type="submit" 
                                className="w-100 rounded-pill py-2 fw-bold"
                                disabled={loading}
                            >
                                {loading ? <Spinner size="sm" animation="border" /> : <><FontAwesomeIcon icon={faUserCheck} /> REGISTRARME</>}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </main>
    );
};

export default Register;