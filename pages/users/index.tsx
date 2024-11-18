import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/index';
import UserList from '@/components/UserList';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to delete a user
  const handleDelete = async (userId: string) => {
    try {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      // Refresh the user list after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Filter users based on search input
  const filteredUsers = users
  .filter((user) => typeof user.name === 'string')
  .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));



  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
        <Link href="/users/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Add New User
          </button>
        </Link>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="border p-3 rounded mb-6 w-full md:w-1/3"
      />

      {/* User List Component */}
      <UserList users={filteredUsers} onDelete={handleDelete} />
    </div>
  );
}
