import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const notificationRouter = Router();

notificationRouter.post('/', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.createNotification);
notificationRouter.get('/', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.getNotifications);
notificationRouter.get('/:id', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.getNotificationById);
notificationRouter.put('/:id', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.updateNotification);
notificationRouter.put('/mark-read/:id', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.markAsRead);
notificationRouter.delete('/:id', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.deleteNotification);
notificationRouter.delete('/', authenticateToken, checkPermission('MANAGE_NOTIFICATIONS'), NotificationController.deleteNotificationsByUserOrTicket);

export default notificationRouter;
