import ProductModel from '../models/product.model.js';

export default class ProductDAO {
  async getAllProducts() {
    return await ProductModel.find();
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  async updateProduct(id, updates) {
    return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
