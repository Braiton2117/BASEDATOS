import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors' //importa los paquetes cors-- permisos de acceso
import path from 'path'
import { fileURLToPath } from 'url'

import clientesRoutes from './routes/clientes.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';
import pedidosdetRoutes from './routes/pedidosdet.routes.js';

import { login } from './authController.js'
import { authenticateToken } from './authMiddleware.js';
import { conmysql } from './db.js'; // Importa la conexión de db.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions={
    origin:'*',//la direccion ip/dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}

// Configuración de MySQL
/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_curso20242'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
}); */

// Prueba de conexión
async function testConnection() {
    try {
        await conmysql.getConnection();
        console.log('Conectado a la base de datos MySQL');
    } catch (err) {
        console.error('Error de conexión a MySQL:', err);
    }
}

testConnection();

app.use(cors(corsOptions))
app.use(bodyParser.json()); // para interpretar objetos JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));  //se añade para poder receptar formularios
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));

// Ruta para iniciar sesión y obtener el token
app.post('/login', login);

// Rutas protegidas con JWT (requieren token para el acceso)
app.use('/api', clientesRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', pedidosdetRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;
