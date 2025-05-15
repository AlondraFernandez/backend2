import Cart from '../models/Cart.js';

class CartRepository {
  async getById(id) {
    return await Cart.findById(id).populate('products.product');
  }
  async update(id, data) {
    return await Cart.findByIdAndUpdate(id, data, { new: true });
  }
}

export default new CartRepository();