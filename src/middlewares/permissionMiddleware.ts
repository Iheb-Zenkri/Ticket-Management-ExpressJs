import { Request, Response, NextFunction } from 'express';
import { PermissionService } from '../services/permissionService';


export const checkPermission = (permission: string, modelId?: number) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;  
      
      const hasPermission = await PermissionService.userHasPermission(userId, permission, modelId);

      if (!hasPermission) {
       res.status(403).json({ message: 'You do not have permission to perform this action' });
      }

      next(); 
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  };
};
