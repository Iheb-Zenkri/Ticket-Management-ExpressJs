import Team  from '../db/models/team';
import Role  from '../db/models/role';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  roleId?: number;
}

export interface UserDTO {
  name?: string;
  email?: string;
  role: string;
}
export interface UserWithAssociations {
  id: number;
  name: string;
  email: string;
  role: Role;
  teams: Team[];
}
