// routes/permissionRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';
import { PermissionController } from '../controllers/permissionController';

const router: Router = Router();

router.post('/permissions', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.createPermission);
router.get('/permissions', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.getPermissions);
router.put('/permissions/:id', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.updatePermission);
router.delete('/permissions/:id', authenticateToken, checkPermission('MANAGE_PERMISSIONS'), PermissionController.deletePermission);

export default router;
