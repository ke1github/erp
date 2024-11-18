'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
type UserRole = 'Admin' | 'Manager' | 'Employee';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState<UserRole>('Employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as UserRole;
    setRole(value);
  };
 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Check if passwords match
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    setLoading(false);
    return;
  }

  // Construct the payload for the request
  const payload = {
    name,
    username, // <-- Include the username in the payload
    email,
    password,
    department,
    role,
  };

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      if (data.token) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        // Redirect to dashboard
        router.push('/login');
      }
    } else {
      setError(data.error || 'Registration failed');
    }
  } catch (err) {
    console.error('Registration Error:', err);
    setLoading(false);
    setError('Something went wrong. Please try again.');
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full p-3 border rounded mb-4"
  required
/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <select value={role} onChange={handleRoleChange} className="w-full p-3 border rounded mb-4">
  <option value="Employee">Employee</option>
  <option value="Manager">Manager</option>
  <option value="Admin">Admin</option>
</select>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}
