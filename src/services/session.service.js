import UserDao from '../dao/user.dao.js';

class SessionService {
  async register(userData) {
    return await UserDao.createUser(userData);
  }

  async login(email) {
    return await UserDao.getUserByEmail(email);
  }

  async getCurrent(user) {
    return user; // ya viene del JWT
  }
}

export default new SessionService();
