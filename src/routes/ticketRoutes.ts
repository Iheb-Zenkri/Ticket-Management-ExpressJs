import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const router = Router();

router.post('/', authenticateToken, checkPermission('CREATE_TICKETS'), TicketController.createTicket);
router.get('/', authenticateToken, checkPermission('VIEW_TICKETS'), TicketController.getTickets);
router.get('/:id', authenticateToken, checkPermission('VIEW_TICKETS'), TicketController.getTicketById);
router.put('/:id', authenticateToken, checkPermission('UPDATE_TICKETS'), TicketController.updateTicket);
router.delete('/:id', authenticateToken, checkPermission('DELETE_TICKETS'), TicketController.deleteTicket);
router.put('/:id/status', authenticateToken, checkPermission('UPDATE_TICKETS'), TicketController.changeStatus);
router.put('/:id/reassign', authenticateToken, checkPermission('ASSIGN_TICKETS'), TicketController.reassignTicket);
router.get('/created-by/:userId', authenticateToken, checkPermission('VIEW_TICKETS'), TicketController.getTicketsCreatedByUser);
router.get('/assigned-to/:userId', authenticateToken, checkPermission('VIEW_TICKETS'), TicketController.getTicketsAssignedToUser);

export default router;
