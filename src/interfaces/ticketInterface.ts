export interface TicketData {
    title: string;
    description: string;
    status: TicketStatus;
    createdBy: number;
    assignedTo: number;
    slaId: number;
    dueDate: Date;
  }
  
  export interface TicketFilters {
    status?: TicketStatus;
    createdBy?: number;
    assignedTo?: number;
    slaId?: number;
    dueDate?: Date;
  }
  
  export interface TicketUpdateData {
    title?: string;
    description?: string;
    status?: TicketStatus;
    assignedTo?: number;
    slaId?: number;
    dueDate?: Date;
  }
  