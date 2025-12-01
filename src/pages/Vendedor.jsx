import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { getVentas, getProducts, updateProduct } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faMoneyBillWave, faReceipt, faEye, faBoxOpen, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const Vendedor = () => {
    const [ventas, setVentas] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({ nombre: '', stock: 0, descuento: 0 });

    const fetchData = async () => {
        const [ventasData, productsData] = await Promise.all([getVentas(), getProducts()]);
        setVentas(ventasData);
        setProducts(productsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowDetail = (venta) => {
        setSelectedVenta(venta);
        setShowDetailModal(true);
    };

    const handleEditProduct = (prod) => {
        setEditingProduct(prod);
        setEditForm({ nombre: prod.nombre, stock: prod.stock, descuento: prod.descuento || 0 });
        setShowEditModal(true);
    };

    const handleSaveProduct = async () => {
        if (editingProduct) {
            const updatedData = { ...editingProduct, ...editForm };
            const result = await updateProduct(editingProduct.id, updatedData);
            if (result.success) {
                fetchData();
                setShowEditModal(false);
            } else {
                alert('Error al actualizar producto');
            }
        }
    };

    const totalIngresos = ventas.reduce((acc, curr) => acc + curr.total, 0);

    if (loading) return <Container className="my-5 text-center text-white"><Spinner animation="grow" variant="info" /></Container>;

    return (
        <main className="bg-black min-vh-100 py-5">
            <Container>
                <div className="d-flex align-items-center mb-4">
                    <h1 className="text-info display-5 fw-bold me-3"><FontAwesomeIcon icon={faCashRegister} /> Panel de Ventas</h1>
                    <Badge bg="dark" className="border border-info text-info">VISTA VENDEDOR</Badge>
                </div>

                <Row className="mb-5">
                    <Col md={6} lg={4}>
                        <Card bg="dark" text="white" className="border-info shadow h-100">
                            <Card.Body>
                                <h6 className="text-uppercase text-muted mb-2">Ingresos Totales</h6>
                                <h2 className="text-info display-6 fw-bold">
                                    <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                                    ${totalIngresos.toLocaleString('es-CL')}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} lg={4}>
                        <Card bg="dark" text="white" className="border-secondary shadow h-100">
                            <Card.Body>
                                <h6 className="text-uppercase text-muted mb-2">Órdenes Completadas</h6>
                                <h2 className="text-white display-6 fw-bold">
                                    <FontAwesomeIcon icon={faReceipt} className="me-2" />
                                    {ventas.length}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="bg-dark p-4 rounded border border-secondary mb-5">
                    <h3 className="text-white mb-4">📜 Historial de Transacciones</h3>
                    {ventas.length === 0 ? (
                        <Alert variant="info" className="bg-opacity-25 bg-info text-white border-0">
                            No se han registrado ventas en el sistema.
                        </Alert>
                    ) : (
                        <Table responsive striped bordered hover variant="dark" className="align-middle">
                            <thead>
                                <tr className="text-info">
                                    <th># Boleta</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map((venta) => (
                                    <tr key={venta.id}>
                                        <td className="fw-bold">#{venta.id}</td>
                                        <td>{new Date(venta.fecha).toLocaleString('es-CL')}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-secondary rounded-circle me-2 d-flex justify-content-center align-items-center" style={{width: '30px', height: '30px'}}>
                                                    {venta.usuario?.nombre?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                {venta.usuario ? venta.usuario.nombre : <span className="text-muted fst-italic">Usuario Eliminado</span>}
                                            </div>
                                        </td>
                                        <td className="text-end fw-bold text-success">
                                            ${venta.total.toLocaleString('es-CL')}
                                        </td>
                                        <td>
                                            <Button variant="outline-info" size="sm" onClick={() => handleShowDetail(venta)}>
                                                <FontAwesomeIcon icon={faEye} /> Ver Detalle
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>

                <div className="bg-dark p-4 rounded border border-secondary">
                    <h3 className="text-white mb-4"><FontAwesomeIcon icon={faBoxOpen} /> Gestión de Inventario</h3>
                    <Table responsive variant="dark" hover size="sm" className="align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Stock</th>
                                <th>Descuento</th>
                                <th>Precio Final</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((prod) => {
                                const finalPrice = prod.precio - (prod.precio * (prod.descuento || 0) / 100);
                                return (
                                    <tr key={prod.id}>
                                        <td>{prod.id}</td>
                                        <td>{prod.nombre}</td>
                                        <td>
                                            <Badge bg={prod.stock > 10 ? 'success' : prod.stock > 0 ? 'warning' : 'danger'}>
                                                {prod.stock} u.
                                            </Badge>
                                        </td>
                                        <td>{prod.descuento > 0 ? <Badge bg="danger">-{prod.descuento}%</Badge> : '-'}</td>
                                        <td>${finalPrice.toLocaleString('es-CL')}</td>
                                        <td>
                                            <Button variant="outline-warning" size="sm" onClick={() => handleEditProduct(prod)}>
                                                <FontAwesomeIcon icon={faEdit} /> Editar
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered size="lg">
                    <Modal.Header closeButton className="bg-dark text-white border-secondary">
                        <Modal.Title>Detalle de Boleta #{selectedVenta?.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white">
                        {selectedVenta && (
                            <Table variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Cant.</th>
                                        <th className="text-end">Precio Unit.</th>
                                        <th className="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedVenta.detalles?.map((detalle) => (
                                        <tr key={detalle.id}>
                                            <td>{detalle.producto?.nombre}</td>
                                            <td className="text-center">{detalle.cantidad}</td>
                                            <td className="text-end">${detalle.precioUnitario.toLocaleString('es-CL')}</td>
                                            <td className="text-end">${(detalle.cantidad * detalle.precioUnitario).toLocaleString('es-CL')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Modal.Body>
                </Modal>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton className="bg-dark text-white border-secondary">
                        <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={editForm.nombre} 
                                    onChange={(e) => setEditForm({...editForm, nombre: e.target.value})}
                                    className="bg-secondary text-white border-0"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Stock Disponible</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={editForm.stock} 
                                    onChange={(e) => setEditForm({...editForm, stock: parseInt(e.target.value)})}
                                    className="bg-secondary text-white border-0"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Porcentaje de Descuento (%)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={editForm.descuento} 
                                    onChange={(e) => setEditForm({...editForm, descuento: parseInt(e.target.value)})}
                                    className="bg-secondary text-white border-0"
                                    min="0" max="100"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="bg-dark border-secondary">
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                        <Button variant="warning" onClick={handleSaveProduct}><FontAwesomeIcon icon={faSave} /> Guardar Cambios</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </main>
    );
};

export default Vendedor;