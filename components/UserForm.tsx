import { useState } from 'react';
import { User } from '@/types';

interface UserFormProps {
  user?: User;
  onSubmit: (data: Omit<User, '_id'>) => void;
}

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState<'Admin' | 'Manager' | 'Employee'>(user?.role || 'Employee');
  const [isActive, setIsActive] = useState<boolean>(user?.isActive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, role, isActive });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">{user ? 'Edit User' : 'Create User'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'Admin' | 'Manager' | 'Employee')}
          className="w-full p-3 border rounded"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          className="mr-2"
        />
        Active
      </label>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
        {user ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
