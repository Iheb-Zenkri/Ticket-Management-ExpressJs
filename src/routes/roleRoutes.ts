// routes/roleRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';
import { RoleController } from '../controllers/roleController';

const router: Router = Router();

router.post('/roles', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.createRole);
router.put('/roles/:id', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.updateRole);
router.get('/roles', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.getRoles);
router.get('/roles/:id', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.getRoleWithPermissions);
router.post('/roles/aassign-permission/:roleId/:permissionId', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.assignPermissionToRole);
router.delete('/roles/:roleId', authenticateToken, checkPermission('MANAGE_ROLES'), RoleController.deleteRole);

export default router;
