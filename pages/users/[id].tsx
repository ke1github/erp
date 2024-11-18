import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: User = await response.json();
      setUser(data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow p-6 rounded-lg max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">User Profile</h2>
        {user && (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
          </>
        )}
      </div>
    </div>
  );
}
