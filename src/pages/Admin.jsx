import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Spinner } from 'react-bootstrap';
import { getProducts, getUsers, deleteProduct } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faTrash, faUserShield } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const [usersData, productsData] = await Promise.all([getUsers(), getProducts()]);
        setUsers(usersData);
        setProducts(productsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            await deleteProduct(id);
            fetchData();
        }
    };

    if (loading) return <Container className="my-5 text-center text-white"><Spinner animation="border" /></Container>;

    return (
        <main className="bg-black min-vh-100 py-5">
            <Container>
                <h1 className="text-warning mb-4 display-5 fw-bold"><FontAwesomeIcon icon={faUserShield} /> Panel de Administración</h1>
                
                <Row className="mb-5 g-4">
                    <Col md={6}>
                        <Card bg="dark" text="white" className="border-warning h-100 shadow">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h2 className="display-4 fw-bold text-warning">{users.length}</h2>
                                    <p className="mb-0 text-white-50">Usuarios Registrados</p>
                                </div>
                                <FontAwesomeIcon icon={faUsers} size="3x" className="text-warning opacity-50" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card bg="dark" text="white" className="border-danger h-100 shadow">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h2 className="display-4 fw-bold text-danger">{products.length}</h2>
                                    <p className="mb-0 text-white-50">Productos en Catálogo</p>
                                </div>
                                <FontAwesomeIcon icon={faBoxOpen} size="3x" className="text-danger opacity-50" />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="mb-5 p-4 bg-dark rounded border border-secondary">
                    <h3 className="text-white mb-3">👥 Usuarios del Sistema</h3>
                    <Table responsive variant="dark" hover className="mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Badge bg={user.role === 'ADMINISTRADOR' ? 'warning' : user.role === 'VENDEDOR' ? 'info' : 'secondary'} text="dark">
                                            {user.role}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className="p-4 bg-dark rounded border border-secondary">
                    <h3 className="text-white mb-3">📦 Inventario de Productos</h3>
                    <Table responsive variant="dark" hover className="mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={prod.imagen} alt="" style={{width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px', borderRadius: '4px'}} />
                                            {prod.nombre}
                                        </div>
                                    </td>
                                    <td>${prod.precio.toLocaleString('es-CL')}</td>
                                    <td>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(prod.id)}>
                                            <FontAwesomeIcon icon={faTrash} /> Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </main>
    );
};

export default Admin;