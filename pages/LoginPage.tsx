
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 topo-bg relative p-4">
      <div className="topo-lines"></div>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Mail Portal</h2>
          <p className="text-slate-500 mt-2">Sign in with your @mrt.lk account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="username@mrt.lk"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 font-semibold hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            &larr; Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
