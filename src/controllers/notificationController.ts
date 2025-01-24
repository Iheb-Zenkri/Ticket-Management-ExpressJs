import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';

export class NotificationController {
  static async createNotification(req: any, res: Response): Promise<void> {
    try {
      const data = req.body;
      const notification = await NotificationService.createNotification(data);
      res.status(201).json(notification);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  static async getNotifications(req: any, res: Response): Promise<void> {
    try {
      const filter = req.query as { userId?: string; isRead?: string; ticketId?: string };
      const notifications = await NotificationService.getNotifications({
        userId: filter.userId ? parseInt(filter.userId) : undefined,
        isRead: filter.isRead ? filter.isRead === 'true' : undefined,
        ticketId: filter.ticketId ? parseInt(filter.ticketId) : undefined,
      });
      res.status(200).json(notifications);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  static async getNotificationById(req: any, res: Response): Promise<void> {
    try {
      const notificationId = parseInt(req.params.id);
      const notification = await NotificationService.getNotificationById(notificationId);
      if (!notification) {
        res.status(404).json({ message: 'Notification not found' });
        return ;
      }
        res.status(200).json(notification);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  static async markAsRead(req: any, res: Response): Promise<void> {
    try {
      const notificationId = parseInt(req.params.id);
      const notification = await NotificationService.markAsRead(notificationId);
      res.status(200).json(notification);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  static async updateNotification(req: any, res: Response): Promise<void> {
    try {
      const notificationId = parseInt(req.params.id);
      const updates = req.body;
      const updatedNotification = await NotificationService.updateNotification(notificationId, updates);
      res.status(200).json(updatedNotification);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  static async deleteNotification(req: any, res: Response): Promise<void> {
    try {
      const notificationId = parseInt(req.params.id);
      await NotificationService.deleteNotification(notificationId);
      res.status(204).send("Notification deleted succufully");
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  static async deleteNotificationsByUserOrTicket(req: any, res: Response): Promise<void> {
    try {
      const { userId, ticketId } = req.query;
      await NotificationService.deleteNotificationsByUserOrTicket(
        userId ? parseInt(userId as string) : undefined,
        ticketId ? parseInt(ticketId as string) : undefined
      );
      res.status(204).send();
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }
}
