import { Router } from 'express';
const router = Router();

// Ejemplo de ruta protegida
router.get('/perfil', (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;
