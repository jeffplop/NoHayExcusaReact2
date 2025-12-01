import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/Context';
import { Container, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faEye, faEyeSlash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emailValid, setEmailValid] = useState(null);
    const { handleLogin, isAuthenticated } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    const validateEmail = (val) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(regex.test(val));
        setEmail(val);
    };

    if (isAuthenticated) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage({ text: 'Por favor completa todos los campos.', type: 'warning' });
            return;
        }

        setLoading(true);
        setMessage(null);
        
        const result = await handleLogin(email, password);
        setLoading(false);
        
        if (result.success) {
            navigate('/');
        } else {
            setMessage({ text: result.message, type: 'danger' });
        }
    };

    return (
        <main className="d-flex align-items-center min-vh-100 bg-black" style={{ marginTop: '-80px' }}>
            <Container className="d-flex justify-content-center">
                <Card className="p-4 shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '450px', backgroundColor: '#1a1a1a' }}>
                    <Card.Body>
                        <div className="text-center mb-4">
                            <h2 className="text-white fw-bold mb-1">Bienvenido</h2>
                            <p className="text-white-50">Ingresa a tu cuenta para continuar</p>
                        </div>

                        {message && <Alert variant={message.type} className="text-center border-0 small">{message.text}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 position-relative">
                                <Form.Label className="text-white-50 small">CORREO ELECTRÓNICO</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="nombre@ejemplo.com"
                                        value={email} 
                                        onChange={(e) => validateEmail(e.target.value)} 
                                        className="rounded-3 px-4"
                                        isValid={emailValid === true}
                                        isInvalid={emailValid === false && email.length > 0}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Ingresa un correo válido.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-white-50 small">CONTRASEÑA</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="rounded-start-3 px-4 border-end-0"
                                    />
                                    <Button 
                                        variant="outline-secondary"
                                        className="bg-dark text-white-50 border-start-0 border-secondary rounded-end-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            <Button 
                                variant="danger" 
                                type="submit" 
                                className="w-100 rounded-pill py-2 fw-bold shadow"
                                disabled={loading || emailValid === false}
                                style={{ background: 'linear-gradient(45deg, #e53935, #ff9800)', border: 'none' }}
                            >
                                {loading ? <Spinner size="sm" animation="border" /> : <><FontAwesomeIcon icon={faSignInAlt} /> INICIAR SESIÓN</>}
                            </Button>
                        </Form>

                        <div className="text-center mt-4 pt-3 border-top border-secondary">
                            <p className="text-white-50 mb-0 small">¿Aún no tienes cuenta?</p>
                            <Link to="/register" className="text-decoration-none text-warning fw-bold">
                                <FontAwesomeIcon icon={faUserPlus} /> Crear cuenta gratis
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </main>
    );
};

export default Login;