// routes/permissionRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/permissionMiddleware';
import { PermissionController } from '../controllers/permissionController';

const router: Router = Router();

router.post('/', authenticateToken, checkPermission(['manage-permission','create-permission']), PermissionController.createPermission);
router.get('/', authenticateToken, checkPermission(['manage-permission','get-permission']), PermissionController.getPermissions);
router.put('/:id', authenticateToken, checkPermission(['manage-permission','update-permission']), PermissionController.updatePermission);
router.delete('/:id', authenticateToken,  checkPermission(['manage-permission','delete-permission']), PermissionController.deletePermission);

export default router;
