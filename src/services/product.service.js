import ProductRepository from '../repositories/product.repository.js';
const productRepo = new ProductRepository();

export default class ProductService {
  async create(data) {
    return await productRepo.create(data);
  }

  async update(pid, data) {
    return await productRepo.update(pid, data);
  }

  async delete(pid) {
    return await productRepo.delete(pid);
  }

  async findAll() {
    return await productRepo.findAll();
  }
}
