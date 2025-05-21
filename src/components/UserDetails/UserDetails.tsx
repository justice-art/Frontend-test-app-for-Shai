import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User } from '../../types/User';
import { fetchUserById } from '../../api/userAPI';

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    fetchUserById(id)
      .then(setUser)
      .catch((e) => {
        console.error(e);
        setError('Failed to load user details');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          ← Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">User not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          ← Back to Users
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:text-blue-600 mb-6 flex items-center"
      >
        <span className="mr-1">←</span> Back to Users
      </button>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Age</p>
            <p className="text-gray-900">{user.age}</p>
          </div>
        </div>
      </div>
    </div>
  );
}