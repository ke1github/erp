import Link from 'next/link';
import { User } from '@/types';

interface UserListProps {
  users: User[];
  onDelete: (userId: string) => void;
}

export default function UserList({ users, onDelete }: UserListProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              <td className="py-3 px-6">{user.role}</td>
              <td className="py-3 px-6">
                <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-3 px-6">
                <Link href={`/users/${user._id}`} className="text-blue-600 mr-4">View</Link>
                <button onClick={() => onDelete(user._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
