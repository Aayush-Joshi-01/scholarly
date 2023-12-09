import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigateTo = useNavigate();
    const handleLogin = async () => {
      props.loading(true);
        if(username.length === 0)
        {
            setError('Username is required');
            return;
        }
        if(password.length === 0)
        {
            setError('Password is required');
            return;
        }
        let response = await fetch('https://scholarlybackend.adaptable.app/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({username,password})
        })
        const data = await response.json();
        console.log(data);
        if(data.token)
        {
            console.log(data.token);
            localStorage.setItem('token',data.token);
            props.setUsername(data.username);
            props.loading(false);
            navigateTo('/viewAll');
            return;
        }
        else
        {
            setError(data.message);
            props.loading(false);
            return;
        }
    }
  return (
        <div className="w-[100%] h-[111vh] bg-hero-pattern bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-secondary rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Welcome Back.
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your username
                </label>
                <input
                  placeholder="JohnDoe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value)}}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                />
              </div>
              <label className="block mb-2 text-sm font-medium text-red-500 text-center">
                  {error}
                </label>
              <button
                className="w-full bg-primary hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
  );
};

export default Login;
