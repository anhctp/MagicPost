import { Role } from "../user/userHelper";

export enum Transfer {
    TRANSACTION = "Điểm giao dịch",
    GATHERING = "Điểm tập kết",
  }
  
  export enum Gender {
    MALE = 'male',
    FEMALE = "female",
    SECRET = 'secret',
  }

  
  export interface UserInfo {
    fullname: string;
    phone: string;
    email:  string,
    date_of_birth: Date,
    gender: Gender,
    role: Role
  }
  
  export enum Type {
    GATHERING = 'gathering offices',
    TRANSACTION = 'transaction offices',
  }

  export interface WarehouseInfo {
    location_id: number,
    type: Type,
  }
