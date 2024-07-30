export interface IUser {
  fullname: string;
  email: string;
  password?: string;
}

export enum EUserGender {
  Male = "Male",
  Female = "Female",
}

export interface IUserFilterOptions {
  userId?: string;
  email?: string;
}
