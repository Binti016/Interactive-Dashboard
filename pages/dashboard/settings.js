import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function SettingsPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [editableUser, setEditableUser] = useState({ username: '', email: '' });

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const notify = localStorage.getItem('notifications');
    setDarkMode(theme === 'dark');
    setNotifications(notify !== 'false');

    if (user) {
      setEditableUser({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.classList.toggle('dark', newTheme);
  };

  const handleNotificationToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', newValue.toString());
  };

  const handleExport = (key, filename) => {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}.csv`;
    a.click();
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const keys = Object.keys(data[0]);
    const rows = data.map(obj => keys.map(k => `"${obj[k] ?? ''}"`).join(','));
    return [keys.join(','), ...rows].join('\n');
  };

  const handleResetUsers = () => {
    if (window.confirm('Are you sure you want to delete all users?')) {
      localStorage.removeItem('users');
      alert('Users cleared from localStorage');
    }
  };

  const handleProfileUpdate = () => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u =>
        u.email === user.email ? { ...u, ...editableUser } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Profile updated!');
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 max-w-5xl mx-auto w-full">

          <section className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  value={editableUser.username}
                  onChange={(e) => setEditableUser({ ...editableUser, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={editableUser.email}
                  onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <input
                  type="text"
                  value={user.role}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                />
              </div>
            </div>
            <button
              onClick={handleProfileUpdate}
              className="mt-5 bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md  shadow"
            >
              Save Changes
            </button>
          </section>

        
          <section className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Preferences</h2>
            <div className="space-y-6">
           
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleThemeToggle}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-full"></div>
                </label>
              </div>

         
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={handleNotificationToggle}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-full"></div>
                </label>
              </div>
            </div>
          </section>

       
          {user.role === 'admin' && (
            <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Admin Controls</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleExport('users', 'users')}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-2 rounded-md shadow"
                >
                  Export Users
                </button>
               
                <button
                  onClick={handleResetUsers}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow"
                >
                  Reset All Users
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
