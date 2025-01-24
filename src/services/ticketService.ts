import { Op } from 'sequelize';
import db from '../db/models/index';
import Ticket, { TicketStatus } from '../db/models/ticket';
import { TicketData, TicketFilters, TicketUpdateData } from '../interfaces/ticketInterface';

export class TicketService {
  // Create a new ticket
  static async createTicket(data: TicketData): Promise<Ticket> {
    return db.Ticket.create(data);
  }

  // Get all tickets (with optional filters)
  static async getTickets(filters?: TicketFilters): Promise<Ticket[]> {
    const whereClause: any = {};
    if (filters?.status) whereClause.status = filters.status;
    if (filters?.createdBy) whereClause.createdBy = filters.createdBy;
    if (filters?.assignedTo) whereClause.assignedTo = filters.assignedTo;
    if (filters?.slaId) whereClause.slaId = filters.slaId;
    if (filters?.dueDate) whereClause.dueDate = filters.dueDate;
  
    const slaWhereClause: any = {};
    if (filters?.slaFilters?.priority) slaWhereClause.priority = filters.slaFilters.priority;
    if (filters?.slaFilters?.timeToRespond){
      const endOfDay = new Date(filters.slaFilters.timeToRespond );
      endOfDay.setUTCHours(23, 59, 59, 999);
       slaWhereClause.timeToRespond = { [Op.lte]: endOfDay};
      }
    if (filters?.slaFilters?.timeToResolve){
      const endOfDay = new Date(filters.slaFilters.timeToResolve);
      endOfDay.setUTCHours(23, 59, 59, 999);
      slaWhereClause.timeToResolve = { [Op.lte]: endOfDay };
    }
  
    return db.Ticket.findAll({
      where: whereClause,
      include: [
        { model: db.User, as: 'creator' },
        { model: db.User, as: 'assignee' },
        { model: db.SLA, where: slaWhereClause },
      ],
    });
  }
  

  // Get a single ticket by ID
  static async getTicketById(ticketId: number): Promise<Ticket | null> {
    return db.Ticket.findByPk(ticketId, {
      include: [
        { model: db.User, as: 'creator' },
        { model: db.User, as: 'assignee' },
        { model: db.SLA },
      ],
    });
  }

  // Update a ticket
  static async updateTicket(ticketId: number, updates: TicketUpdateData): Promise<Ticket | null> {
    const ticket = await db.Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    return ticket.update(updates);
  }

  // Delete a ticket
  static async deleteTicket(ticketId: number): Promise<void> {
    const ticket = await db.Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    await ticket.destroy();
  }

  // Change ticket status
  static async changeStatus(ticketId: number, status: TicketStatus): Promise<Ticket | null> {
    const ticket = await db.Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    return ticket.update({ status });
  }

  // Reassign ticket to another user
  static async reassignTicket(ticketId: number, newAssigneeId: number): Promise<Ticket | null> {
    const ticket = await db.Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    return ticket.update({ assignedTo: newAssigneeId });
  }

  // Get tickets created by a user
  static async getTicketsCreatedByUser(userId: number): Promise<Ticket[]> {
    return db.Ticket.findAll({
      where: { createdBy: userId },
      include: [
        { model: db.User, as: 'creator' },
        { model: db.User, as: 'assignee' },
        { model: db.SLA },
      ],
    });
  }

  // Get tickets assigned to a user
  static async getTicketsAssignedToUser(userId: number): Promise<Ticket[]> {
    return db.Ticket.findAll({
      where: { assignedTo: userId },
      include: [
        { model: db.User, as: 'creator' },
        { model: db.User, as: 'assignee' },
        { model: db.SLA },
      ],
    });
  }
}
