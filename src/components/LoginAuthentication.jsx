import React, { useState } from "react";
import backgroundImage from "../assets/backgroundImage.jpg";

export default function Login({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const validEmail = "user@example.com";
  const validPassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    if (email === validEmail && password === validPassword) {
      console.log("Authentication successful!");
      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg- flex items-center justify-center min-h-screen p-4 bg-cover bg-center font-sans bg-login-pattern">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md p-8 space-y-6 bg-white/20 rounded-lg shadow-2xl backdrop-blur-lg transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-white">
          Login to VMS
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <p className="text-red-300 text-center text-sm animate-fade-in">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-0 transition-colors duration-200 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-0 transition-colors duration-200 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-blue-600 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 transform hover:scale-105"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
