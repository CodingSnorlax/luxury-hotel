export interface IUser {
  _id?: string;
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

export interface IUserLogin {
  email: string;
  password: string
}
