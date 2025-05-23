import { TicketModel } from '../models/Ticket.model.js';
import crypto from 'crypto';

export const createTicket = async (amount, purchaser) => {
    const code = crypto.randomBytes(6).toString('hex'); // codigo unico
    const ticket = await TicketModel.create({
        code,
        amount,
        purchaser,
    });
    return ticket;
};
