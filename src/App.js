import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'; 

const RouteWrapper = () => {
    const location = useLocation();

    return (
        <SwitchTransition>
            <CSSTransition
                key={location.pathname}
                classNames="page-transition"
                timeout={300}
            >
                <div className="position-relative w-100 h-100">
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/nosotros" element={<AboutUs />} />
                        <Route path="/productos" element={<Products />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<main className="container my-5 text-center text-danger"><h2>404: Página no encontrada</h2></main>} />
                    </Routes>
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100 bg-black">
                    <Header />
                    <div className="flex-grow-1">
                        <RouteWrapper />
                    </div>
                    <Footer />
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
