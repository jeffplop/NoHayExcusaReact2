import React from 'react';
import { Container } from 'react-bootstrap';

const Admin = () => {
    return (
        <main>
            <Container className="my-5 text-white text-center">
                <h1 className="text-warning mb-4">Panel de Administración</h1>
                <p className="lead">Bienvenido, Administrador. Aquí podrás gestionar tu tienda.</p>
                <div className="p-5 bg-dark rounded shadow-sm border border-warning">
                    <h3>Funcionalidades de Gestión</h3>
                    <p className="text-white-50">Esta sección es exclusiva para usuarios con rol ADMIN.</p>
                </div>
            </Container>
        </main>
    );
};

export default Admin;