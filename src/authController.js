import jwt from 'jsonwebtoken';

const SECRET_KEY = 'Payaso2117';

export async function login(req, res) {
    const { username, password } = req.body;

    // Simulación de autenticación de usuario (reemplaza con la lógica adecuada)
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
}

