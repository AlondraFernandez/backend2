import { ProductModel } from '../models/product.model.js';

export class ProductService {
    async getAll() {
        return ProductModel.find();
    }

    async getById(pid) {
        return ProductModel.findById(pid);
    }

    async create(data) {
        return ProductModel.create(data);
    }

    async update(pid, data) {
        return ProductModel.findByIdAndUpdate(pid, data, { new: true });
    }

    async delete(pid) {
        return ProductModel.findByIdAndDelete(pid);
    }
}
