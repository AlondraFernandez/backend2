import UserModel from '../models/user.model.js';

export default class UserDAO {
  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async createUser(userData) {
    return await UserModel.create(userData);
  }

  async updateUser(id, updates) {
    return await UserModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteUser(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  async getAllUsers() {
    return await UserModel.find();
  }
}
