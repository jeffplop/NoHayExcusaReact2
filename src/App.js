// App.js - Componente principal de React con enrutamiento
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { AppProvider } from './context/Context';

// Importar los estilos de Bootstrap y los estilos globales
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'; 

function App() {
    return (
        // El proveedor de contexto envuelve toda la aplicación
        <AppProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100 bg-black">
                    <Header />
                    <div className="flex-grow-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/nosotros" element={<AboutUs />} />
                            <Route path="/productos" element={<Products />} />
                            <Route path="/contacto" element={<Contact />} />
                            <Route path="/carrito" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            {/* Ruta de fallback para 404 */}
                            <Route path="*" element={<main className="container my-5 text-center text-danger"><h2>404: Página no encontrada</h2></main>} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
