import express from 'express';
import { authorizeRoles } from '../middlewares/authorization.js';
import productRepository from '../repositories/ProductRepository.js';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), async (req, res) => {
  const product = await productRepository.create(req.body);
  res.status(201).json(product);
});

router.put('/:id', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), async (req, res) => {
  const product = await productRepository.update(req.params.id, req.body);
  res.json(product);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), async (req, res) => {
  await productRepository.delete(req.params.id);
  res.status(204).send();
});

export default router;