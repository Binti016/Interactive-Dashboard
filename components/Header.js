import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';

function Header() {
  const { user } = useAuth();

  const displayName = user?.username || 'Guest';
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A';

  return (
    <header className="w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center rounded-b-md">
      <div className="flex items-center gap-3">
        <UserCircle size={28} className="text-blue-800" />
        <div>
          <h2 className="text-lg font-semibold text-slate-800 leading-tight">
             Welcome, <span className="capitalize text-blue-800">{displayName}!</span>
          </h2>
          
        </div>
      </div>

      <div className="text-sm">

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            displayRole === 'Admin'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {displayRole}
        </span>
      </div>
    </header>
  );
}

export default Header;
