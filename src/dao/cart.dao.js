import CartModel from '../models/cart.model.js';

export default class CartDAO {
  async getCartById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async createCart() {
    return await CartModel.create({ products: [] });
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.equals(productId));

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);
    cart.products = [];
    return await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    const product = cart.products.find(p => p.product.equals(productId));
    if (product) product.quantity = quantity;
    return await cart.save();
  }

  async removeProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    cart.products = cart.products.filter(p => !p.product.equals(productId));
    return await cart.save();
  }
}
