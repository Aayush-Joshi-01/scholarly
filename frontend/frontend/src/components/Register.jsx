import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [gmail, setGmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const handleRegister = async () => {
    props.loading(true);
    if (username.length === 0) {
      setError("Username is required");
      return;
    }
    if (password.length === 0) {
      setError("Password is required");
      return;
    }
    if (confPassword.length === 0) {
      setError("Please confirm password");
      return;
    }
    if (password !== confPassword) {
      setError("Password is not matching");
      return;
    }
    if (gmail.length === 0) {
      setError("Gmail is required");
      return;
    }
    if (terms === false) {
      setError("Terms and conditions are not applied");
      return;
    }
    console.log(username)
    console.log(password)
    console.log(gmail)
    let response = await fetch("https://scholarlybackend.adaptable.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password,gmail }),
    });
    const data = await response.json();
    console.log(data);
    if (data.token) {
      console.log(data.token);
      localStorage.setItem('token',data.token);
      props.setUsername(data.username);
      props.loading(false);
      navigateTo('/viewAll');
    } else {
      setError(data.message);
      props.loading(false);
    }
  };
  return (
    <div>
      <div className="w-[100%] h-[111vh] bg-hero-pattern bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-secondary rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your gmail
              </label>
              <input
                placeholder="JohnDoe@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="gmail"
                type="text"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="confirmPassword"
                type="password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                  type="checkbox"
                  aria-describedby="terms"
                  id="terms"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500 text-gray-300">
                  I accept the
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <label className="block mb-2 text-sm font-medium text-red-500 text-center">
              {error}
            </label>
            <button
              className="w-full bg-primary hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
