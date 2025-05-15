import TicketModel from '../models/ticket.model.js';

export default class TicketDAO {
  async create(data) {
    return await TicketModel.create(data);
  }
}
