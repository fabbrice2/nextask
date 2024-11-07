import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      navigate("/home");
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-black h-screen text-white flex flex-col">
      <div className="h-1/12">
        <Header title="Create Account" />
      </div>
      <div className="flex-grow h-full bg-black flex items-center justify-center">
        <div className="border border-gray-500 flex rounded-lg overflow-hidden">
          <div className="p-5 flex flex-col justify-between">
            <h1 className="text-lg font-semibold mb-6">Sign In</h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email Address"
                className="w-full bg-black text-gray-400 border border-gray-600 rounded px-4 py-2 mb-4 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-black text-gray-400 border border-gray-600 rounded px-4 py-2 mb-6 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="flex justify-center items-center px-4 py-2 bg-white text-black rounded-full hover:bg-gray-300 transition"
                >
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right ml-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </button>
                <p className="text-sm text-gray-400 cursor-pointer hover:underline">
                  Forgot your password?
                </p>
              </div>
              {message && <p className="text-red-500 mt-4">{message}</p>}
            </form>
          </div>

          <div className="border-l border-gray-500 p-5 hidden flex-col justify-between md:flex">
            <h1 className="text-lg font-semibold mb-6">
              Why create an account?
            </h1>
            <ul className="space-y-2 text-gray-400">
              <li>It’s free</li>
              <li>Participate in the forums</li>
              <li>Updates on the products you use</li>
              <li>Exclusive offers and more</li>
            </ul>
            <a href="/register">
              <button
                type="button"
                className="mt-6 w-full flex justify-center items-center px-4 py-2 bg-white text-black rounded-full hover:bg-gray-300 transition"
              >
                Create an Account
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right ml-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="h-14 border-t border-[#ffffff36] flex items-center justify-center">
        <p className="text-[#ffffff1a] text-sm">
          © 2024 NexTask. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
