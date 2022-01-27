import axios, { AxiosError } from "axios";
import { store } from "../../app/store";
import { setAccessToken } from "../../features/user/userSlice";
// import { setAccessToken } from "../../features/user/userSlice";
import { refreshAPI } from "../account";


const _handleResponse = (res: any) => {
  if(String(res.status).startsWith('20')){
    res.isSuccess = true;
  }
  return res;
};

const _handleError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    const res = await refreshAPI();
    store.dispatch(setAccessToken(res.data.access));
    if(res.status === 200){
      // retry request
      return await api.request(error.config)
    }
    return error.response;
  }else{
    // error.response?.isSuccess = false;
    return error.response;
  }
}

const _handleAuthError = async (error: AxiosError) => {
  // console.log(error.response);
  switch (error.response?.status) {
    // case 401:
    //   return error.response;
    default:
      // error.response?.isSuccess = false;
      if(error.response?.config.url === "auth/refresh"){
        return error;
      }
      return error.response;
  }
}

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
  },
  withCredentials:true
});

authAPI.interceptors.response.use(_handleResponse, _handleAuthError);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
  },
  withCredentials:true
});
api.interceptors.request.use(async config => {
  
  let accessToken = store.getState().user.accessToken;
  if(!accessToken){
    const res: any = await refreshAPI();
    
    store.dispatch(setAccessToken(res.data.access));
    if(!res.isSuccess){
      return config;
    }
  }
  accessToken = store.getState().user.accessToken;
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`
  };
  return config;
});

// error message 表示させたい
// password違うとか
// 関数化してauthAPIでも使いたい(isSuccess)
// accessToken期限切れならリトライ

api.interceptors.response.use(_handleResponse, _handleError);

export { api, authAPI };
