import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAPI } from "../apis/account";

type IfAuthRedirectProps = {
  children: ReactNode
}

const IfAuthRedirect = ({ children }: IfAuthRedirectProps): JSX.Element => {

  const navigate = useNavigate();

  useEffect(() => {
    const setup = async(): Promise<void> => {
      const res: any = await refreshAPI();
      if(res.isSuccess){
        navigate('projects');
      }
    };

    setup();
    
  }, [navigate]);

  return <>{ children }</>

};

export default IfAuthRedirect;