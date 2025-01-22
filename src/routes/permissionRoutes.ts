// routes/permissionRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';
import { PermissionController } from '../controllers/permissionController';

const router: Router = Router();

router.post('/', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.createPermission);
router.get('/', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.getPermissions);
router.put('/:id', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.updatePermission);
router.delete('/:id', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.deletePermission);

export default router;
