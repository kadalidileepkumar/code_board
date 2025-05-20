// src/components/Sidebar.tsx
import { Link, useRouterState } from '@tanstack/react-router';
import { FaThLarge, FaUsers } from 'react-icons/fa';

const users = [
  { id: 1, name: "Riti Shan", avatar: "/avatars/riti.jpg", commits: 2498 },
  { id: 2, name: "Chhavi Kishore", avatar: "/avatars/chhavi.jpg", commits: 245 },
  { id: 3, name: "Ilanthirayan Tak", avatar: "/avatars/ilanthirayan.jpg", commits: 1000 },
  // ...add more users as needed
];

export function Sidebar() {
  const { location } = useRouterState();

  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center h-16 px-4">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
      </div>
      {/* Nav Icons */}
      <nav className="flex flex-col items-center gap-4 mt-4">
        <Link to="/" className={`w-12 h-12 flex items-center justify-center rounded-lg ${location.pathname === "/" ? "bg-blue-600 text-white" : "text-gray-500"} hover:bg-blue-100`}>
          <FaThLarge size={22} />
        </Link>
        <Link to="/users" className={`w-12 h-12 flex items-center justify-center rounded-lg ${location.pathname.startsWith("/users") ? "bg-blue-600 text-white" : "text-gray-500"} hover:bg-blue-100`}>
          <FaUsers size={22} />
        </Link>
      </nav>
      {/* User List */}
      <div className="flex-1 px-2 mt-6 overflow-y-auto">
        <div className="font-semibold text-gray-600 mb-2">Users</div>
        <Link to="/users" className="flex items-center px-2 py-1 rounded hover:bg-blue-50 font-medium">
          <span className="flex-1">All</span>
          <span className="text-xs text-gray-400">{users.reduce((a, u) => a + u.commits, 0)}</span>
        </Link>
        {users.map(user => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className={`flex items-center px-2 py-1 rounded hover:bg-blue-50 ${location.pathname === `/users/${user.id}` ? "bg-blue-100" : ""}`}
          >
            <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full mr-2" />
            <span className="flex-1">{user.name}</span>
            <span className="text-xs text-gray-400">{user.commits}</span>
          </Link>
        ))}
      </div>
      {/* Add New User Button */}
      <div className="p-2">
        <Link
          to="/users/add-user"
          className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600"
        >
          + Add New User
        </Link>
      </div>
    </aside>
  );
}
