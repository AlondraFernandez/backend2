import TicketModel from '../models/Ticket.js';

export default class TicketDAO {
  async createTicket(ticketData) {
    return await TicketModel.create(ticketData);
  }

  async getTicketByCode(code) {
    return await TicketModel.findOne({ code });
  }

  async getAllTickets() {
    return await TicketModel.find();
  }
}
