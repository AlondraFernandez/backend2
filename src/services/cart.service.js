import CartDao from '../dao/cart.dao.js';

class CartService {
  async getCartById(id) {
    return await CartDao.getCartById(id);
  }

  async createCart() {
    return await CartDao.createCart();
  }

  async addProduct(cartId, productId, quantity) {
    return await CartDao.addProduct(cartId, productId, quantity);
  }
}

export default new CartService();
