import { Router } from "express";
import { SLAController } from "../controllers/slaController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { checkPermission } from "../middlewares/permissionMiddleware";

const slaRouter = Router();

slaRouter.get('/', authenticateToken, checkPermission('MANAGE_SLA'), SLAController.getSLAs);
slaRouter.get('/:id', authenticateToken, checkPermission('MANAGE_SLA'), SLAController.getSLAById);
slaRouter.post('/', authenticateToken, checkPermission('MANAGE_SLA'), SLAController.createSLA);
slaRouter.put('/:id', authenticateToken, checkPermission('MANAGE_SLA'), SLAController.updateSLA);
slaRouter.delete('/:id', authenticateToken, checkPermission('MANAGE_SLA'), SLAController.deleteSLA);

export default slaRouter;
