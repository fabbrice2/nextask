import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to register.");
    }
  };

  return (
    <div className="bg-black h-screen text-white flex flex-col">
      <div className="h-1/12">
        <Header title="Login" />
      </div>
      <div className="flex-grow h-full bg-black flex items-center justify-center mb-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-400 mb-8">
            Existing user?{" "}
            <span className="text-white font-semibold cursor-pointer hover:underline">
              <a href="/login"> Sign In</a>
            </span>
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleRegister}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-black text-gray-400 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black text-gray-400 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full bg-black text-gray-400 border border-gray-600 rounded px-4 py-2 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-white text-black rounded-full hover:bg-gray-300 transition"
            >
              Sign Up
            </button>
          </form>
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

export default Register;
