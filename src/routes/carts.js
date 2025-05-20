import express from 'express';
import passport from 'passport';
import { createCart, addToCart , getCart} from '../controllers/carts.controller.js';


const router = express.Router();

router.get('/', passport.authenticate('current', { session: false }), getCart);
router.post('/add', passport.authenticate('current', { session: false }), addToCart);
router.post('/:cid/products/:pid', addToCart);
export default router;
