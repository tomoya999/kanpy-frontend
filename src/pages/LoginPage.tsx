import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../apis/account";

const LoginPage = (): JSX.Element => {

  // const email: string = 'tomoya999@zohomail.com';
  // const password: string = '3Tapgdmw028';
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClick = async(): Promise<void> => {
    const res: any = await loginAPI(email, password);
    if(res.isSuccess){
      navigate('projects');
    }
  }
  
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-violet-900 via-yellow-100 to-rose-300">
      <div className="border rounded-xl bg-white bg-opacity-90 py-20 h-auto w-4/6">
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-gray-600 font-sans text-center pb-8">
            Kanpy Login
          </div>
          <form action="w-1/2">
            <div className="flex flex-col justify-center items-center pb-8">
              <input
                value={ email }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                type="email"
                className="border focus:border-blue-400 w-1/2 px-3 py-2 bg-slate-50 rounded-xl mb-1"
                placeholder="メールアドレス"
              />
              <input
                value={ password }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                type="password"
                className="border focus:border-blue-400 w-1/2 px-3 py-2 px-3 py-2 bg-slate-50 rounded-xl"
                placeholder="パスワード"
              />
            </div>
          </form>
          <div className="grow flex justify-center items-start">
            <button
              className="bg-blue-400 hover:bg-blue-300 text-white px-14 py-3 rounded-3xl"
              onClick={() => handleClick()}
            >
              ログインする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
