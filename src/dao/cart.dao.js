import CartModel from '../models/cart.model.js';

export default class CartDAO {
  async getById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async addProduct(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    const index = cart.products.findIndex(p => p.product.toString() === productId);

    if (index >= 0) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async update(cartId, data) {
    return await CartModel.findByIdAndUpdate(cartId, data, { new: true });
  }
}
