import ProductDao from '../dao/product.dao.js';

class ProductService {
  async getAll() {
    return await ProductDao.getAll();
  }

  async getById(id) {
    return await ProductDao.getById(id);
  }

  async create(product) {
    return await ProductDao.create(product);
  }

  async update(id, data) {
    return await ProductDao.update(id, data);
  }

  async delete(id) {
    return await ProductDao.delete(id);
  }
}

export default new ProductService();
