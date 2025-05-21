import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

export default function UserManagement() {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, [user]);

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((u) => u.email !== email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.username} ${u.email} ${u.role}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          

          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <input
              type="text"
              placeholder="Search by username, email or role"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-100 text-blue-800 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-blue-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 capitalize">{u.username}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4 capitalize">{u.role}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(u.email)}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-6 text-center text-gray-500 italic"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
