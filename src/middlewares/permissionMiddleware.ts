import { Response, NextFunction } from 'express';
import { PermissionService } from '../services/permissionService';

type PermissionLogic = 'AND' | 'OR';

export const checkPermission = (
  permissions: string | string[],
  logic: PermissionLogic = 'OR',
  options: { model?: any; idField?: string; ownershipField?: string } = {}
) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId; 
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }
      //// check if the user has permission by his role
      if (permissions.length > 0) {
        const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
        const permissionChecks = await Promise.all(
          permissionArray.map((permission) =>
            PermissionService.userHasPermission(userId, permission)
          )
        );
      
        const hasPermission =
          logic === 'AND'
            ? permissionChecks.every((result) => result === true) // All must be true
            : permissionChecks.some((result) => result === true); // At least one must be true
  
        if (hasPermission) {
          next();
          return ;
        }
      }

      //// check if the user has permission by his ownership
      if (options.model) {
        const idField = options.idField || 'id'; 
        const ownershipField = options.ownershipField || 'userId';
        const resourceId = req.params[idField];

        const resource = await options.model.findByPk(resourceId);
        if (!resource) {
          res.status(404).json({ message: 'Resource not found' });
          return;
        }

        if (resource[ownershipField] === userId) {
          return next();
        }
      }

      res.status(403).json({
        message: 'Access denied: insufficient permissions or ownership.',
      });

    } catch (error) {
      res.status(500).json({ message: 'An error occurred while checking permissions' });
    }
  };
};
