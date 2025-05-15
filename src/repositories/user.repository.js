import User from '../models/User.js';

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }
  async save(userData) {
    const user = new User(userData);
    return await user.save();
  }
}

export default new UserRepository();