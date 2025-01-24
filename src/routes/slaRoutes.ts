import { Router } from "express";
import { SLAController } from "../controllers/slaController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { checkPermission } from "../middlewares/permissionMiddleware";

const slaRouter = Router();

slaRouter.get('/', authenticateToken, checkPermission(['manage-sla','view-sla']), SLAController.getSLAs);
slaRouter.get('/:id', authenticateToken, checkPermission(['manage-sla','view-sla']), SLAController.getSLAById);
slaRouter.post('/', authenticateToken, checkPermission(['manage-sla','create-sla']), SLAController.createSLA);
slaRouter.put('/:id', authenticateToken, checkPermission(['manage-sla','update-sla']), SLAController.updateSLA);
slaRouter.delete('/:id', authenticateToken, checkPermission(['manage-sla','delete-sla']), SLAController.deleteSLA);

export default slaRouter;
