import UserRepository from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

const userRepo = new UserRepository();

export const createUser = async (userData) => {
  const hashed = await hashPassword(userData.password);
  return await userRepo.create({ ...userData, password: hashed });
};

export const loginUser = async (email, password) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Contraseña incorrecta');
  return user;
};
