import type { User } from '../../types/User';
import { useNavigate } from 'react-router-dom';

type Props = {
  users: User[];
};

export default function UserTable({ users }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-8 text-left text-sm font-semibold text-gray-600">
          <div>Name</div>
          <div>Email</div>
          <div>Age</div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="grid grid-cols-3 gap-8 px-8 py-5 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <div className="text-base font-medium text-gray-900">{user.name}</div>
            <div className="text-base text-gray-600">{user.email}</div>
            <div className="text-base text-gray-600">{user.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}