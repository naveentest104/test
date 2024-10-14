// pages/login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router'; // Change 'next/navigation' to 'next/router'
import { motion } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../components/ui/label";
import Layout from '../Layout';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        toast.success('Login successful');
        router.push('/home'); // Redirect to home page on successful login
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <Layout isLoginPage={true}>
      <div className="min-h-screen bg-amber-50 flex flex-col md:flex-row items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 mr-4">Publisher.ai</h1>
            <p className="text-xl text-black">Your AI-powered publishing assistant</p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-6 text-center">Welcome back, Author!</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-black">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Your username"
                      className="pl-10 border-black-300 focus:border-black-500 focus:ring-black-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 border-black-300 focus:border-black-500 focus:ring-black-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" size={18} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Log In
                </Button>
              </form>
            </div>
            {/* <motion.div
              className="mt-4 text-center text-orange-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              New to our library? <a href="#" className="text-orange-600 hover:underline">Sign up</a>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
