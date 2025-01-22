import express, { Router } from 'express';
import userRoutes from './userRoutes';  
import teamRoutes from './teamRoutes'
import roleRoutes from './roleRoutes';
import permissionRoutes from './permissionRoutes';

const router : Router = express.Router();

router.use('/users', userRoutes);
router.use(teamRoutes);
router.use(roleRoutes);
router.use(permissionRoutes);

export default router;
