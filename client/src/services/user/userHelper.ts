export interface UserLogin {
  email: string;
  password: string;
}

export enum Role {
  CEO = "CEO",
  STAFFTRANSACTION = "Staff Transaction",
  STAFFGATHERING = "Staff Gathering",
  LEADERTRANSACTION = "Leader Transaction",
  LEADERGATHERING = "Leader Gathering",
}

export interface User extends UserLogin {
  id: number;
  role: Role;
}
