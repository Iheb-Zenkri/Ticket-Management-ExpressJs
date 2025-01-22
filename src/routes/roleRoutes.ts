// routes/roleRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';
import { RoleController } from '../controllers/roleController';

const router: Router = Router();

router.post('/', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.createRole);
router.put('/:id', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.updateRole);
router.get('/', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.getRoles);
router.get('/:id', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.getRoleWithPermissions);
router.post('/aassign-permission/:roleId/:permissionId', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.assignPermissionToRole);
router.delete('/:roleId', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.deleteRole);

export default router;
