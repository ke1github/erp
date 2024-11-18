import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NewUser() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Admin' | 'Manager' | 'Employee'>('Employee');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role, isActive }),
    });
    router.push('/users');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow rounded max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>
      
      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-3 border rounded mb-4"
      />
      
      {/* Email Input */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-3 border rounded mb-4"
      />
      
      {/* Role Selection */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as 'Admin' | 'Manager' | 'Employee')}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
      </select>
      
      {/* Active Checkbox */}
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          className="mr-2"
        />
        Active
      </label>
      
      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded mt-6">
        Create User
      </button>
    </form>
  );
}
