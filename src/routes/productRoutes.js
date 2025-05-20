import express from 'express';
import passport from 'passport';
import { authorizeRole } from '../middlewares/authMiddleware.js';
import { getAllProducts, createProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), createProduct);

export default router;
