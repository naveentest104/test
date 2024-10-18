// src/app/login/page.tsx
"use client"; // This directive is important for client-side functionality

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Utility for classnames

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Simulate an API call
    setTimeout(() => {
      alert(`Logged in as ${email}`);
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <motion.button
            type="submit"
            className={cn(
              "w-full p-2 text-white rounded-lg transition duration-200",
              isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
