import express, { Router } from 'express';
import userRoutes from './userRoutes';  
import teamRoutes from './teamRoutes'
import roleRoutes from './roleRoutes';
import permissionRoutes from './permissionRoutes';
import ticketRouter from './ticketRoutes';
import slaRouter from './slaRoutes' ;
import notificationRouter from './notificationRoutes' ;

const router : Router = express.Router();

router.use('/users', userRoutes);
router.use('/tickets', ticketRouter);
router.use('/sla',slaRouter);
router.use('/teams',teamRoutes);
router.use('/roles',roleRoutes);
router.use('/permissions',permissionRoutes);
router.use('/notifications',notificationRouter);

export default router;
