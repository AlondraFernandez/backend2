import UserService from '../services/user.service.js';
import { generateToken } from '../utils/jwt.js';
import UserDTO from '../dtos/user.dto.js';

export const login = async (req, res) => {
  const user = req.user;
  const token = generateToken(user);
  res.cookie('jwt', token, { httpOnly: true }).json({ message: 'Login exitoso' });
};

export const register = async (req, res) => {
  res.status(201).json({ message: 'Registro exitoso' });
};

export const current = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
};

export const logout = (req, res) => {
  res.clearCookie('jwt').json({ message: 'Sesión finalizada' });
};
