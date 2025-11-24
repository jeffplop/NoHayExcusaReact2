import React, { useEffect, useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { getVentas } from '../services/api';

const Vendedor = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVentas = async () => {
            const data = await getVentas();
            setVentas(data);
            setLoading(false);
        };
        fetchVentas();
    }, []);

    if (loading) return <Container className="my-5 text-white text-center"><p>Cargando ventas...</p></Container>;

    return (
        <main>
            <Container className="my-5 text-white">
                <h1 className="text-info mb-4">Panel de Ventas (Vendedor)</h1>
                {ventas.length === 0 ? (
                    <Alert variant="info">No hay ventas registradas.</Alert>
                ) : (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th># Boleta</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{new Date(venta.fecha).toLocaleString()}</td>
                                    <td>{venta.usuario ? venta.usuario.nombre : 'Desconocido'}</td>
                                    <td>${venta.total.toLocaleString('es-CL')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </main>
    );
};

export default Vendedor;