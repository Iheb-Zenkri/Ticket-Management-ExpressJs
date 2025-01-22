import User from '../db/models/user';

export interface CreateTeamDTO {
  name: string;
}

export interface UpdateTeamDTO {
  name?: string;
}

export interface TeamWithAssociations {
  id: number;
  name: string;
  users: User[];
}
