import Ticket from '../models/Ticket.js';

class TicketRepository {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return await ticket.save();
  }
}

export default new TicketRepository();