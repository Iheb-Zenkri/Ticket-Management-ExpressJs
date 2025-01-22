import db from '../db/models/index';
import Notification from '../db/models/notification';

interface NotificationData {
  message: string;
  userId: number;
  ticketId: number;
  isRead?: boolean;
}

export class NotificationService {
  // Create a new notification
  static async createNotification(data: NotificationData): Promise<Notification | void> {
    try {
      const notification = await db.Notification.create(data);
      return notification;
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error creating notification: ${error.message}`);
    }
  }

  // Get all notifications with optional filtering (e.g., userId, isRead)
  static async getNotifications(filter?: Partial<NotificationData>): Promise<Notification[] | void> {
    try {
      const whereClause: any = {};

      if (filter?.userId) {
        whereClause.userId = filter.userId;
      }

      if (filter?.isRead !== undefined) {
        whereClause.isRead = filter.isRead;
      }

      if (filter?.ticketId) {
        whereClause.ticketId = filter.ticketId;
      }

      const notifications = await db.Notification.findAll({ where: whereClause });
      return notifications;
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error fetching notifications: ${error.message}`);
    }
  }

  // Get a single notification by ID
  static async getNotificationById(notificationId: number): Promise<Notification | void> {
    try {
      const notification = await db.Notification.findByPk(notificationId);
      return notification;
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error fetching notification: ${error.message}`);
    }
  }

  // Mark a notification as read
  static async markAsRead(notificationId: number): Promise<Notification | void> {
    try {
      const notification = await db.Notification.findByPk(notificationId);
      if (!notification) {
        throw new Error('Notification not found');
      }
      notification.isRead = true;
      await notification.save();
      return notification;
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error marking notification as read: ${error.message}`);
    }
  }

  // Update a notification (e.g., change message, isRead status)
  static async updateNotification(notificationId: number, updates: Partial<NotificationData>): Promise<Notification | void> {
    try {
      const notification = await db.Notification.findByPk(notificationId);
      if (!notification) {
        throw new Error('Notification not found');
      }
      await notification.update(updates);
      return notification;
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error updating notification: ${error.message}`);
    }
  }

  // Delete a notification by ID
  static async deleteNotification(notificationId: number): Promise<void> {
    try {
      const notification = await db.Notification.findByPk(notificationId);
      if (!notification) {
        throw new Error('Notification not found');
      }
      await notification.destroy();
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error deleting notification: ${error.message}`);
    }
  }

  // Delete notifications by userId or ticketId
  static async deleteNotificationsByUserOrTicket(userId?: number, ticketId?: number): Promise<void> {
    try {
      const whereClause: any = {};
      if (userId) whereClause.userId = userId;
      if (ticketId) whereClause.ticketId = ticketId;

      await db.Notification.destroy({ where: whereClause });
    } catch (error) {
        if(error instanceof Error)
            throw new Error(`Error deleting notifications: ${error.message}`);
    }
  }
}
