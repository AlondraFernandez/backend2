import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';

const cartRepo = new CartRepository();
const productRepo = new ProductRepository();
const ticketRepo = new TicketRepository();

export default class CartService {
  async addProduct(cartId, productId, quantity) {
    return await cartRepo.addProduct(cartId, productId, quantity);
  }

  async purchase(cartId) {
    const cart = await cartRepo.getById(cartId);
    const purchased = [];
    const notPurchased = [];

    for (const item of cart.products) {
      const product = await productRepo.getById(item.product);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productRepo.update(product._id, product);
        purchased.push({ product: item.product, quantity: item.quantity });
      } else {
        notPurchased.push(item.product);
      }
    }

    const amount = purchased.reduce((acc, p) => acc + p.quantity * p.product.price, 0);
    const ticket = await ticketRepo.create({
      code: crypto.randomUUID(),
      purchase_datetime: new Date(),
      amount,
      purchaser: cart.user,
    });

    await cartRepo.update(cartId, {
      products: cart.products.filter(p => notPurchased.includes(p.product)),
    });

    return {
      ticket,
      notPurchased,
    };
  }
}
