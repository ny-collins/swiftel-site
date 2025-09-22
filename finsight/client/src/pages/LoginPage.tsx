// In finsight/client/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      // Error is already handled and displayed by the context
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 animated-gradient">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h1 className="text-4xl font-black text-sky-400">FinSIGHT</h1>
          <p className="text-gray-400 mt-2">Welcome back, get insights into your finances.</p>
        </div>

        {error && <div className="text-center bg-red-500/20 text-red-300 p-3 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            required
          />
          <Button type="submit" isLoading={loading}>
            Sign In
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-sky-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
