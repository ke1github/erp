'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNavigation from '@/components/TopNavigation';
import DeploymentsSection from '@/components/DeploymentsSection';
import '@/app/globals.css';

type Deployment = {
  project: string;
  status: string;
  timestamp: string;
  env: string;
};

export default function Dashboard() {
  const [deployments] = useState<Deployment[]>([
    { project: "Planetaria", status: "Deployed", timestamp: "3m ago", env: "Production" },
    { project: "Tailwind Labs", status: "Initiated", timestamp: "5m ago", env: "Preview" },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
    } else {
      alert(data.error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white p-3 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <TopNavigation />
        <div className="flex justify-center mt-8">
          <div className="w-full lg:w-2/3">
            <DeploymentsSection deployments={deployments} />
          </div>
        </div>
      </div>
    </div>
  );
}
