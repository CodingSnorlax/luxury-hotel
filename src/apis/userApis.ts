import req from "./https";
import { IUser, IUserForgot } from "../interface/User";

// User
const apiGetUser = () => req("get", "/api/v1/user");
const apiCheckUser = () => req("get", "/api/v1/user/check");
const apiSignup = (data: IUser) => req("post", "/api/v1/user/signup/", data);
const apiLogin = ({ email, password }: IUser) =>
  req("post", "/api/v1/user/login/", { email, password });
const apiForgot = (data: IUserForgot) =>
  req("post", "/api/v1/user/forgot/", data);
const apiPutUser = (data: Partial<IUser>) => req("put", `/api/v1/user`, data);
const apiPatchUserRole = (id: string, { isAdmin }: { isAdmin: boolean }) =>
  req("patch", `/api/v1/user/${id}/role/`, { isAdmin });

export {
  apiGetUser,
  apiCheckUser,
  apiSignup,
  apiLogin,
  apiForgot,
  apiPutUser,
  apiPatchUserRole,
};
