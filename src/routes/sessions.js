import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import passport from 'passport';
import UserDTO from '../dtos/user.dto.js'; // ✅ IMPORTADO

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email ya registrado' });

    const hashedPassword = bcrypt.hashSync(req.body.password, 10); // 🔐 Hash seguro
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = generateToken(user);
  res
    .cookie('jwt', token, { httpOnly: true })
    .json({ message: 'Login exitoso' });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
  }
);

export default router;
