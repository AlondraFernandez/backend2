import UserModel from '../models/user.model.js';

export default class UserDAO {
  async create(data) {
    return await UserModel.create(data);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }
}
