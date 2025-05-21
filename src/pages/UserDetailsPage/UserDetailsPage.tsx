import UserDetails from '../../components/UserDetails/UserDetails';

export default function UserDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <UserDetails />
        </div>
      </div>
    </div>
  );
}