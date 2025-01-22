import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';

const router: Router = Router();

// Team routes
router.post('/teams',authenticateToken,checkPermission('CREATE_TEAM'), TeamController.createTeam);  
router.get('/teams',authenticateToken,checkPermission('VIEW_TEAM'),TeamController.getAllTeams);
router.get('/teams/:id',authenticateToken,checkPermission('VIEW_TEAM'), TeamController.getTeamById); 
router.put('/teams/:id',authenticateToken,checkPermission('UPDATE_TEAM'), TeamController.updateTeam);  
router.delete('/teams/:id',authenticateToken,checkPermission('DELETE_TEAM'), TeamController.deleteTeam);  
router.post('/teams/:teamId/users/:userId',authenticateToken,checkPermission('MANAGE_TEAM'),TeamController.addUserToTeam); 
router.delete('/teams/:teamId/users/:userId',authenticateToken,checkPermission('MANAGE_TEAM'), TeamController.removeUserFromTeam); 
export default router;
