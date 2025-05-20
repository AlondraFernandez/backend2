import CartService from '../services/cart.service.js';

export const createCart = async (req, res) => {
  try {
    const newCart = await CartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear carrito' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await CartService.addProduct(cid, pid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito' });
  }
};
export const getCart = async (req, res) => {
  try {
    console.log('req.user:', req.user);  // <--- Agregar este log
    const cartId = req.user.cart;
    if (!cartId) {
      return res.status(400).json({ message: 'No se encontró carrito asociado al usuario' });
    }
    const cart = await CartService.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
};
