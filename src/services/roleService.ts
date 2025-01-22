import db from '../db/models/index'
import Role from '../db/models/role';
import RolePermission from '../db/models/rolePermission';

export class RoleService {
  // Create a new role
  static async createRole(name: string): Promise<Role> {
    const role = await db.Role.create({ name });
    return role;
  }

  // Update an existing role
  static async updateRole(roleId: number, name: string): Promise<Role | null> {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    role.name = name;
    await role.save();
    return role;
  }

  // Assign permission to a role
  static async assignPermissionToRole(roleId: number, permissionId: number): Promise<RolePermission> {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    const permission = await db.Permission.findByPk(permissionId);
    if (!permission) {
      throw new Error('Permission not found');
    }

    // Check if the permission is already assigned to the role
    const existingRolePermission = await db.RolePermission.findOne({
      where: { roleId, permissionId },
    });

    if (existingRolePermission) {
      throw new Error('Permission already assigned to this role');
    }

    const rolePermission = await db.RolePermission.create({ roleId, permissionId });
    return rolePermission;
  }

  // Get all roles
  static async getRoles(): Promise<Role[]> {
    return db.Role.findAll();
  }

  // Get a role with its permissions
  static async getRoleWithPermissions(roleId: number): Promise<any> {
    try {
      const role = await db.Role.findByPk(roleId, {
        include: [
          {
              model: db.RolePermission,
              include: [
                  {
                      model: db.Permission, 
                  },
              ],
          },
      ],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const permissions = role.rolePermissions.map((rp: any) => rp.permission);

    return {
      id: role.id,
      name: role.name,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      permissions,
    };

    } catch (error) {
      if(error instanceof Error)
      throw new Error(`Failed to fetch role with permissions: ${error.message}`);

    }
   
  }

  // delete a role 
  static async deleteRole(roleId: number): Promise<void> {
    const role = await db.Role.findByPk(roleId);

    if (!role) {
      throw new Error('Role not found');
    }

    const associatedUsers = await db.User.findAll({ where: { roleId } });
    if (associatedUsers.length > 0) {
      throw new Error('Role cannot be deleted because it is associated with users');
    }

    await db.RolePermission.destroy({ where: { roleId } });

    await db.Role.destroy({ where: { id: roleId } });
  }
}
