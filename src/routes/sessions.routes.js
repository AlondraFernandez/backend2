import { Router } from 'express';
import passport from 'passport'
import jwt from 'jsonwebtoken'

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'coderSecretKey'

const loginSuccess = async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
};

const currentUser = (req, res) => {
    const { _id, email, first_name, last_name, role } = req.user;
    res.json({ id: _id, email, fullName: `${first_name} ${last_name}`, role });
};

router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
    res.json({ message: 'Usuario registrado correctamente' })
})

router.post('/login', passport.authenticate('login', { session: false }), loginSuccess)

router.get('/current', passport.authenticate('jwt', { session: false }), currentUser)

export default router;