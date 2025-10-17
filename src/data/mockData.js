const bcrypt = require('bcryptjs');

const users = []; 

const products = [
    { id: 1, nombre: "Proteína en Polvo", precio: 25000, imagen: "/images/proteina.jpg" }, 
    { id: 2, nombre: "Bandas de Resistencia", precio: 15000, imagen: "/images/banda.jpg" },
    { id: 3, nombre: "Mancuernas Ajustables", precio: 50000, imagen: "/images/mancuernas.jpg" },
    { id: 4, nombre: "Ropa Deportiva", precio: 30000, imagen: "/images/ropa.jpg" }
];

const userCarts = {};
function registerUser(userData) {
    if (users.find(u => u.email === userData.email)) {
        return null;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);
    const newUser = {
        ...userData,
        password: hashedPassword,
        id: users.length + 1
    };

    users.push(newUser);
    return { 
        id: newUser.id, 
        nombre: newUser.nombre, 
        email: newUser.email 
    }; 
}

function findUserAndValidate(email, password) {
    const user = users.find(u => u.email === email);

    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const { password, ...safeUser } = user;
            return safeUser;
        }
    }
    return null;
}

module.exports = {
    products,
    registerUser,
    findUserAndValidate,
    userCarts
};