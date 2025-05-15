import { createUser, loginUser } from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = generateToken(user);
    res.cookie('jwt', token, { httpOnly: true }).json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const current = async (req, res) => {
  const { user } = req;
  res.json({
    name: user.name,
    email: user.email,
    role: user.role,
  }); // Enviamos un DTO simplificado
};
