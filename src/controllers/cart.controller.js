import CartService from '../services/cart.service.js';
const cartService = new CartService();

export const addProductToCart = async (req, res) => {
  try {
    const result = await cartService.addProduct(req.params.cid, req.body.productId, req.body.quantity);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const result = await cartService.purchase(req.params.cid);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
