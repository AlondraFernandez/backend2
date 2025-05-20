import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import UserDTO from '../dtos/user.dto.js'; 

const router = express.Router();

router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ message: 'Credenciales inválidas' });

    req.login(user, { session: false }, (err) => {
      if (err) return res.status(500).json({ message: 'Error al iniciar sesión' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ token });
    });
  })(req, res, next);
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
});

export default router;
