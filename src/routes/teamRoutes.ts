import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const router: Router = Router();

// Team routes
router.post('/',authenticateToken,checkPermission(['manage-team','create-team']), TeamController.createTeam);  
router.get('/',authenticateToken,checkPermission(['manage-team','view-team']),TeamController.getAllTeams);
router.get('/:id',authenticateToken,checkPermission(['manage-team','view-team']), TeamController.getTeamById); 
router.put('/:id',authenticateToken,checkPermission(['manage-team','update-team']), TeamController.updateTeam);  
router.delete('/:id',authenticateToken,checkPermission(['manage-team','delete-team']), TeamController.deleteTeam);  
router.post('/:teamId/users/:userId',authenticateToken,checkPermission(['manage-team','manage-team-members']),TeamController.addUserToTeam); 
router.delete('/:teamId/users/:userId',authenticateToken,checkPermission(['manage-team','manage-team-members']), TeamController.removeUserFromTeam); 
export default router;
