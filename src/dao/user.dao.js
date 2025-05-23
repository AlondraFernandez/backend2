import { UserModel } from '../models/user.model.js';

export class UserDAO {
    async getById(id) {
        return UserModel.findById(id);
    }

    async getByEmail(email) {
        return UserModel.findOne({ email });
    }

    async create(userData) {
        return UserModel.create(userData);
    }

    async getAll() {
        return UserModel.find();
    }
}
