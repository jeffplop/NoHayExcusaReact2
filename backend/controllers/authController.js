// Archivo: backend/controllers/authController.js
const { registerUser, findUserAndValidate } = require('../data/mockData');
const jwt = require('jsonwebtoken'); // Se usa para generar tokens de sesión

// Clave secreta para JWT (TOKEN de SESIÓN). 
// ⚠️ En producción, esta clave debería estar en una variable de entorno (.env)
const JWT_SECRET = 'my_secure_secret_key_nohayexcusa'; 

/**
 * Función para validar los datos del formulario de registro.
 * (Adaptada de las validaciones de js/login.js)
 * @param {object} data - Datos enviados desde el formulario de registro.
 * @returns {object} Objeto con 'isValid' (boolean) y 'errors' (object).
 */
function validateRegistration(data) {
    const errors = {};
    let isValid = true;

    if (!data.nombre || data.nombre.length < 2) {
        errors.nombre = 'Mínimo 2 caracteres.';
        isValid = false;
    }
    if (!data.apellido || data.apellido.length < 2) {
        errors.apellido = 'Mínimo 2 caracteres.';
        isValid = false;
    }
    // Validación de formato de email (adaptada de js/login.js)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Email inválido.';
        isValid = false;
    }
    if (!data.telefono) {
        errors.telefono = 'Campo requerido.';
        isValid = false;
    }
    if (!data.genero) {
        errors.genero = 'Selecciona una opción.';
        isValid = false;
    }
    
    // Validación de Edad (mayor de 18 años, adaptada de js/login.js)
    if (!data.fecha) {
        errors.fecha = 'Campo requerido.';
        isValid = false;
    } else {
        const hoy = new Date();
        const nacimiento = new Date(data.fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        
        if (edad < 18) {
            errors.fecha = 'Debes ser mayor de 18 años.'; 
            isValid = false;
        }
    }
    
    if (!data.password || data.password.length < 6) {
        errors.password = 'Mínimo 6 caracteres.'; 
        isValid = false;
    }

    return { isValid, errors };
}


// POST /api/register - Endpoint para el registro de nuevos usuarios
exports.register = (req, res) => {
    const userData = req.body;
    const { isValid, errors } = validateRegistration(userData);

    if (!isValid) {
        // Devuelve los errores específicos de validación al Frontend
        return res.status(400).json({ success: false, message: 'Corrige los errores.', errors });
    }

    const newUser = registerUser(userData);

    if (!newUser) {
        // Manejo de "Email ya registrado" (Lógica de mockData.js)
        errors.email = 'Email ya registrado.';
        return res.status(409).json({ success: false, message: 'Email ya registrado.', errors });
    }

    // Registro exitoso
    res.status(201).json({ success: true, message: 'Registro exitoso.', user: newUser });
};

// POST /api/login - Endpoint para iniciar sesión
exports.login = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        // Error: Campos incompletos (Adaptado de js/login.js)
        return res.status(400).json({ success: false, message: 'Completa todos los campos.' });
    }

    const user = findUserAndValidate(email, password);

    if (user) {
        // Generar JWT para gestionar la sesión (Reemplaza localStorage.setItem('isAuthenticated'))
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '1h' } // Token expira en 1 hora
        );
        
        res.json({ 
            success: true, 
            message: 'Iniciando sesión...', 
            token, 
            user: { email: user.email, nombre: user.nombre } 
        });
    } else {
        // Error de credenciales incorrectas (Adaptado de js/login.js)
        res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
    }
};
