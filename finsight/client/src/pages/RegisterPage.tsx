// In finsight/client/src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ firstName, email, password });
    } catch (err) {
       // Error is handled by the context
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 animated-gradient">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h1 className="text-4xl font-black text-sky-400">Create an Account</h1>
          <p className="text-gray-400 mt-2">Join FinSIGHT and take control of your finances.</p>
        </div>

        {error && <div className="text-center bg-red-500/20 text-red-300 p-3 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="First Name"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={<User className="w-5 h-5 text-gray-400" />}
            required
          />
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
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-sky-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
