import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAccessToken, selectStatus, setAccessTokenAsync } from "../features/user/userSlice";
import LoadingIcon from "./LoadingIcon";

type LoginRequiredProp = {
  children: ReactNode
};

const LoginRequired = ({ children }: LoginRequiredProp): JSX.Element => {

  const accessToken = useAppSelector(selectAccessToken);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setup = async() => {
      try{
        await dispatch(setAccessTokenAsync());
      }catch(e){
        console.log(e);
      }
    };

    if(accessToken === ''){
      setup();
    }
  }, [accessToken, dispatch]);


  if(status === 'loading'){
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <LoadingIcon />
      </div>
    );
  }

  if(status === 'rejected' && accessToken === ''){
    return <Navigate to="/" />
  }

  return <div>{ children }</div>
};

export default LoginRequired;