import { Router } from 'express';
import passport from 'passport';
import { authRole } from '../middlewares/authMiddleware.js';
import { createTicket } from '../services/ticket.service.js';
import { CartModel } from '../models/cart.model.js';
import { ProductModel } from '../models/product.model.js';

const router = Router();
// Creamos el carrito
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    authRole('user'),
    async (req, res) => {
        const newCart = await CartModel.create({
            products: [],
            userEmail: req.user.email,
        });
        res.json(newCart);
    }
);

// Agregar producto al carrito 
router.post(
    '/:cid/product/:pid',
    passport.authenticate('jwt', { session: false }),
    authRole('user'),
    async (req, res) => {
        const { cid, pid } = req.params;

        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const product = await ProductModel.findById(pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

        const index = cart.products.findIndex((p) => p.product.equals(pid));

        if (index !== -1) {
            cart.products[index].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json(cart);
    }
);

// Mostrar un carrito 
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
});

// Comprar carrito 
router.post(
    '/:cid/purchase',
    passport.authenticate('jwt', { session: false }),
    authRole('user'),
    async (req, res) => {
        try {
            const { cid } = req.params;

            const cart = await CartModel.findById(cid).populate('products.product');
            if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

            let total = 0;
            const productosNoProcesados = [];

            for (const item of cart.products) {
                const product = item.product;
                if (item.quantity <= product.stock) {
                    total += product.price * item.quantity;

                    product.stock -= item.quantity;
                    await product.save();
                } else {
                    productosNoProcesados.push(product._id.toString());
                }
            }

            let ticket = null;
            if (total > 0) {
                ticket = await createTicket(total, req.user.email);
            }

            cart.products = cart.products.filter(p =>
                productosNoProcesados.includes(p.product._id.toString())
            );
            await cart.save();

            res.json({
                ticket,
                productosNoProcesados,
                carritoActualizado: cart.products
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al finalizar la compra' });
        }
    }
);

export default router