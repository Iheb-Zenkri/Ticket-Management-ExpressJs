import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const router = Router();

router.post('/', authenticateToken, checkPermission(['manage-tickets','create-ticket']), TicketController.createTicket);
router.get('/', authenticateToken, checkPermission(['manage-tickets','view-ticket']), TicketController.getTickets);
router.get('/:id', authenticateToken, checkPermission(['manage-tickets','view-ticket']), TicketController.getTicketById);
router.put('/:id', authenticateToken, checkPermission(['manage-tickets','update-ticket']), TicketController.updateTicket);
router.delete('/:id', authenticateToken, checkPermission(['manage-tickets','delete-ticket']), TicketController.deleteTicket);
router.put('/:id/status', authenticateToken,checkPermission(['manage-tickets','update-ticket']), TicketController.changeStatus);
router.put('/:id/reassign', authenticateToken, checkPermission(['manage-tickets','update-ticket']), TicketController.reassignTicket);
router.get('/created-by/:userId', authenticateToken,checkPermission(['manage-tickets','view-ticket']), TicketController.getTicketsCreatedByUser);
router.get('/assigned-to/:userId', authenticateToken, checkPermission(['manage-tickets','view-ticket']), TicketController.getTicketsAssignedToUser);

export default router;
