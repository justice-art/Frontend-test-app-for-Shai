import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserTable from "../../components/UserTable/UserTable";
import { fetchAllUsers, searchUsers } from "../../api/userAPI";

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return loadUsers();
    setLoading(true);
    try {
      const data = await searchUsers(query);
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          User Directory
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SearchBar
            query={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
          <div className="mt-6">
            {loading ? (
              <p>Loading...</p>
            ) : users.length > 0 ? (
              <UserTable users={users} />
            ) : query.trim() ? (
              <div className="mt-4 text-center">
                <p className="text-gray-500 mb-2">
                  No users found for "{query}"
                </p>
                <button
                  className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
                  onClick={() => {
                    setQuery("");
                    loadUsers();
                  }}
                >
                  Reset
                </button>
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No users available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
