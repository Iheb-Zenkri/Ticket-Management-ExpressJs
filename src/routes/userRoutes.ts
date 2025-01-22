import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";


const router: Router = Router();
 
router.post('/login', UserController.authenticateUser);
router.post('/register', UserController.createUser); 
router.put('/user/:id', authenticateToken, UserController.updateUser); 
router.get('/user/:id', authenticateToken, UserController.getUserWithAssociations); 
router.delete('/user/:id', authenticateToken, UserController.deleteUser); 

export default router;
