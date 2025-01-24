import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { checkPermission } from "../middlewares/permissionMiddleware";


const router: Router = Router();
 
router.post('/login', UserController.authenticateUser);
router.post('/register', UserController.createUser); 
router.put('/user/:id', authenticateToken,checkPermission(['manage-user', 'update-user']), UserController.updateUser); 
router.get('/user/:id', authenticateToken,checkPermission(['manage-user', 'get-user']), UserController.getUserWithAssociations); 
router.delete('/user/:id', authenticateToken,checkPermission(['manage-user', 'delete-user']), UserController.deleteUser); 

export default router;
