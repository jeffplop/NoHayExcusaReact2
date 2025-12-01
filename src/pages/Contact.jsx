import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <main className="bg-black min-vh-100 py-5">
            <Container>
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-white text-uppercase">Contáctanos</h1>
                    <p className="lead text-white-50">Estamos aquí para ayudarte en tu proceso de transformación.</p>
                </div>

                <Row className="justify-content-center g-4">
                    {/* Información de Contacto */}
                    <Col lg={4}>
                        <Card className="h-100 bg-dark border-secondary text-white shadow">
                            <Card.Body className="p-4 d-flex flex-column justify-content-center">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-danger rounded-circle p-3 me-3"><FontAwesomeIcon icon={faEnvelope} size="lg" /></div>
                                    <div><h5 className="mb-0">Email</h5><p className="mb-0 text-white-50">contacto@nohayexcusa.cl</p></div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-danger rounded-circle p-3 me-3"><FontAwesomeIcon icon={faPhone} size="lg" /></div>
                                    <div><h5 className="mb-0">Teléfono</h5><p className="mb-0 text-white-50">+56 9 1234 5678</p></div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="bg-danger rounded-circle p-3 me-3"><FontAwesomeIcon icon={faMapMarkerAlt} size="lg" /></div>
                                    <div><h5 className="mb-0">Ubicación</h5><p className="mb-0 text-white-50">Santiago, Chile</p></div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Formulario */}
                    <Col lg={6}>
                        <Card className="bg-dark border-secondary shadow">
                            <Card.Body className="p-4">
                                <h3 className="text-white mb-4">Envíanos un mensaje</h3>
                                {success && <Alert variant="success" className="border-0 bg-success text-white">¡Mensaje enviado correctamente!</Alert>}
                                
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white">Tu Nombre</Form.Label>
                                        <Form.Control type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white">Tu Email</Form.Label>
                                        <Form.Control type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-white">Mensaje</Form.Label>
                                        <Form.Control as="textarea" rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                                    </Form.Group>
                                    <Button variant="outline-light" type="submit" className="w-100 py-2 fw-bold">
                                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" /> ENVIAR
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default Contact;