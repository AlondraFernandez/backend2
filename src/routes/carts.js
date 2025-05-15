import express from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/authorization.js';
import CartRepository from '../repositories/CartRepository.js';
import ProductRepository from '../repositories/ProductRepository.js';
import TicketRepository from '../repositories/TicketRepository.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), authorizeRoles('user'), async (req, res) => {
  const cart = await CartRepository.getById(req.params.cid);
  let amount = 0;
  const unavailable = [];
  const purchasedProducts = [];

  for (let item of cart.products) {
    const product = await ProductRepository.getById(item.product._id);
    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      amount += product.price * item.quantity;
      purchasedProducts.push(item);
      await product.save();
    } else {
      unavailable.push(product._id);
    }
  }

  const ticket = await TicketRepository.create({
    code: uuidv4(),
    amount,
    purchaser: req.user.email
  });

  cart.products = cart.products.filter(p => unavailable.includes(p.product._id));
  await cart.save();

  res.json({ ticket, unavailable });
});

export default router;