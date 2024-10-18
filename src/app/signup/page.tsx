'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Feather, Eye, EyeOff } from 'lucide-react';
import Layout from '../layout';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success('Signup successful!');
        router.push('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Signup failed');
      }
    } catch {
        toast.error('An error occurred during signup');
      }
  };

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-4"
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input id="email" name="email" type="email" placeholder="your@email.com" className="pl-10" />
                <Feather className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
