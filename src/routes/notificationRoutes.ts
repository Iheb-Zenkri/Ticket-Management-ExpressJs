import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const notificationRouter = Router();

notificationRouter.post('/', authenticateToken, checkPermission(['manage-notifications','create-notifications']), NotificationController.createNotification);
notificationRouter.get('/', authenticateToken, checkPermission(['manage-notifications','view-notifications']), NotificationController.getNotifications);
notificationRouter.get('/:id', authenticateToken, checkPermission(['manage-notifications','view-notifications']), NotificationController.getNotificationById);
notificationRouter.put('/:id', authenticateToken, checkPermission(['manage-notifications','update-notifications']), NotificationController.updateNotification);
notificationRouter.put('/mark-read/:id', authenticateToken, checkPermission(['manage-notifications','update-notifications']), NotificationController.markAsRead);
notificationRouter.delete('/:id', authenticateToken,checkPermission(['manage-notifications','delete-notifications']), NotificationController.deleteNotification);
notificationRouter.delete('/', authenticateToken, checkPermission(['manage-notifications','delete-notifications']), NotificationController.deleteNotificationsByUserOrTicket);

export default notificationRouter;
