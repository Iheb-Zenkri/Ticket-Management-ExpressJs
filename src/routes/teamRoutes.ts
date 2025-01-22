import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const router: Router = Router();

// Team routes
router.post('/teams',authenticateToken,checkPermission('CREATE_TEAMS'), TeamController.createTeam);  
router.get('/teams',authenticateToken,checkPermission('VIEW_TEAMS'),TeamController.getAllTeams);
router.get('/teams/:id',authenticateToken,checkPermission('VIEW_TEAMS'), TeamController.getTeamById); 
router.put('/teams/:id',authenticateToken,checkPermission('UPDATE_TEAMS'), TeamController.updateTeam);  
router.delete('/teams/:id',authenticateToken,checkPermission('DELETE_TEAMS'), TeamController.deleteTeam);  
router.post('/teams/:teamId/users/:userId',authenticateToken,checkPermission('MANAGE_TEAMS'),TeamController.addUserToTeam); 
router.delete('/teams/:teamId/users/:userId',authenticateToken,checkPermission('MANAGE_TEAMS'), TeamController.removeUserFromTeam); 
export default router;
