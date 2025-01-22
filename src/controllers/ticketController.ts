import { Response } from 'express';
import { TicketService } from '../services/ticketService';
import { TicketStatus } from '../db/models/ticket';

export class TicketController {
  // Create a new ticket
  static async createTicket(req: any, res: Response): Promise<void> {
    try {
      const ticket = await TicketService.createTicket(req.body);
      res.status(201).json(ticket);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
    }
  }

  // Get all tickets with optional filters
  static async getTickets(req: any, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const tickets = await TicketService.getTickets(filters);
      res.status(200).json(tickets);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
    }
  }

  // Get a single ticket by ID
  static async getTicketById(req: any, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      const ticket = await TicketService.getTicketById(ticketId);
      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }
      res.status(200).json(ticket);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
    }
  }

  // Update a ticket
  static async updateTicket(req: any, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      const updates = req.body;
      const ticket = await TicketService.updateTicket(ticketId, updates);
      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }
      res.status(200).json(ticket);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
    }
  }

  // Delete a ticket
  static async deleteTicket(req: any, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      await TicketService.deleteTicket(ticketId);
      res.status(204).send();
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
    }
  }

  // Change ticket status
  static async changeStatus(req: any, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      const { status } = req.body;
      if (!Object.values(TicketStatus).includes(status)) {
        res.status(400).json({ message: 'Invalid status value' });
        return;
      }
      const ticket = await TicketService.changeStatus(ticketId, status);
      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }
      res.status(200).json(ticket);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
    }
  }

  // Reassign ticket to another user
  static async reassignTicket(req: any, res: Response): Promise<void> {
    try {
        const ticketId = parseInt(req.params.id);
        const { assignedTo } = req.body;
        const ticket = await TicketService.reassignTicket(ticketId, assignedTo);
        if (!ticket) {
          res.status(404).json({ message: 'Ticket not found' });
          return;
        }
        res.status(200).json(ticket);
      } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
      }
    }
  
    // Get tickets created by a specific user
    static async getTicketsCreatedByUser(req: any, res: Response): Promise<void> {
      try {
        const userId = parseInt(req.params.userId);
        const tickets = await TicketService.getTicketsCreatedByUser(userId);
        res.status(200).json(tickets);
      } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
      }
    }
  
    // Get tickets assigned to a specific user
    static async getTicketsAssignedToUser(req: any, res: Response): Promise<void> {
      try {
        const userId = parseInt(req.params.userId);
        const tickets = await TicketService.getTicketsAssignedToUser(userId);
        res.status(200).json(tickets);
      } catch (error) {
        if(error instanceof Error)
            res.status(400).json({ error: error.message });
      }
    }
  }