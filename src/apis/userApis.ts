import req from "./https";
import { IUser, IUserForgot, IUserLogin } from "../interface/User";

// User
const apiGetUser = () => req("get", "/api/v1/user");
const apiCheckUser = () => req("get", "/api/v1/user/check");
const apiSignup = (data: IUser) => req("post", "/api/v1/user/signup/", data);
const apiLogin = (data: IUserLogin) =>
  req("post", "/api/v1/user/login/", data);
const apiForgot = (data: IUserForgot) =>
  req("post", "/api/v1/user/forgot/", data);
const apiPutUser = (data: Partial<IUser>) => req("put", `/api/v1/user`, data);
const apiPatchUserRole = (id: string, { isAdmin }: { isAdmin: boolean }) =>
  req("patch", `/api/v1/user/${id}/role/`, { isAdmin });

const apiGetUserOrder = () => req("get", "/api/v1/order");
const apiDeleteUser = (id: string) => req("delete", `/api/v1/order/${id}`);

export {
  apiGetUser,
  apiCheckUser,
  apiSignup,
  apiLogin,
  apiForgot,
  apiPutUser,
  apiPatchUserRole,
  apiGetUserOrder,
  apiDeleteUser,
};
