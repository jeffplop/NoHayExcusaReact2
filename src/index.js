// index.js - Punto de entrada de la aplicación
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as bootstrap from 'bootstrap'; // Importar Bootstrap JS

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
