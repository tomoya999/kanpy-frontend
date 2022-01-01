import { authAPI } from "../base";

export type loginAPIParams = {
  email: string
  password: string
};

const loginAPI = async(email: string, password: string) => {
  const url = 'v1/auth/login';
  const param = { email, password };
  return await authAPI.post(url, param)
};


const logoutAPI = async() => {
  const url = 'v1/auth/logout';
  return await authAPI.post(url, {})
};

const refreshAPI = async() => {
  const url = 'v1/auth/refresh';
  return await authAPI.post(url, {})
};

export {
  loginAPI,
  logoutAPI,
  refreshAPI,
};