import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const router: Router = Router();

// Team routes
router.post('/',authenticateToken,checkPermission('CREATE_TEAMS'), TeamController.createTeam);  
router.get('/',authenticateToken,checkPermission('VIEW_TEAMS'),TeamController.getAllTeams);
router.get('/:id',authenticateToken,checkPermission('VIEW_TEAMS'), TeamController.getTeamById); 
router.put('/:id',authenticateToken,checkPermission('UPDATE_TEAMS'), TeamController.updateTeam);  
router.delete('/:id',authenticateToken,checkPermission('DELETE_TEAMS'), TeamController.deleteTeam);  
router.post('/:teamId/users/:userId',authenticateToken,checkPermission('MANAGE_TEAMS'),TeamController.addUserToTeam); 
router.delete('/:teamId/users/:userId',authenticateToken,checkPermission('MANAGE_TEAMS'), TeamController.removeUserFromTeam); 
export default router;
