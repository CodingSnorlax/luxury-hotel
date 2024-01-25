export interface IUser {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
  password?: string;
  newPassword?: string;
}

export interface IUserForgot {
  email: string;
  code: string;
  newPassword: string;
}
