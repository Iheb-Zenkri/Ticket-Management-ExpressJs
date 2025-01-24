import { Request, Response, NextFunction } from 'express';
import { PermissionService } from '../services/permissionService';

type PermissionLogic = 'AND' | 'OR';

export const checkPermission = (
  permissions: string | string[],
  logic: PermissionLogic = 'OR',
  modelId?: number
) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId; 
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const permissionArray = Array.isArray(permissions) ? permissions : [permissions];

      const permissionChecks = await Promise.all(
        permissionArray.map((permission) =>
          PermissionService.userHasPermission(userId, permission, modelId)
        )
      );

      const hasPermission =
        logic === 'AND'
          ? permissionChecks.every((result) => result === true) // All must be true
          : permissionChecks.some((result) => result === true); // At least one must be true

      if (!hasPermission) {
        res.status(403).json({
          message: 'You do not have the required permissions to perform this action',
        });
        return ;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while checking permissions' });
    }
  };
};
