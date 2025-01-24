// routes/roleRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';
import { RoleController } from '../controllers/roleController';

const router: Router = Router();

router.post('/', authenticateToken, checkPermission(['manage-roles','create-role']), RoleController.createRole);
router.put('/:id', authenticateToken, checkPermission(['manage-roles','update-role']), RoleController.updateRole);
router.get('/', authenticateToken, checkPermission(['manage-roles','get-role']), RoleController.getRoles);
router.get('/:id', authenticateToken, checkPermission(['manage-roles','get-role']), RoleController.getRoleWithPermissions);
router.post('/aassign-permission/:roleId/:permissionId', authenticateToken, checkPermission(['manage-roles','manage-permission'],'AND'), RoleController.assignPermissionToRole);
router.delete('/:roleId', authenticateToken, checkPermission(['manage-roles','delete-role']), RoleController.deleteRole);

export default router;
