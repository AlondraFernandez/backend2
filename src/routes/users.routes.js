// src/routes/users.routes.js
import { Router } from 'express';
import { UserDAO } from '../dao/user.dao.js';
import { UserDTO } from '../dtos/user.dto.js';

const router = Router();
const userDao = new UserDAO();

// Simulación de autenticación
router.get('/current', async (req, res) => {
    try {
        // Simulamos que tenemos un usuario logueado con Iid fijo
        const user = await userDao.getById('681a6cbea868bc04c14636f2'); // poné un ID real de prueba

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const safeUser = new UserDTO(user);
        res.json(safeUser);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await userDao.getAll(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});


export default router;