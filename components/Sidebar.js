import {LayoutDashboard, Settings,Users,LogOut,Info,Menu,X,} from 'lucide-react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Head from 'next/head';
import { useState } from 'react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'User Management',
      icon: Users,
      path: '/dashboard/users',
      roles: ['admin'],
    },
    {
      id: 3,
      name: 'About Us',
      icon: Info,
      path: '/dashboard/analytics',
      roles: ['admin', 'sales'],
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings',
      roles: ['admin', 'sales', 'viewer'],
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="h-full w-64 bg-white border-r border-slate-200 shadow-lg flex flex-col justify-between">
      <div className="p-5">
        <h1
          className="text-3xl mb-6 ml-2 text-blue-800"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Renalytics
        </h1>
        <hr className="my-5 border-slate-300" />

        {menuList
          .filter(menu => !menu.roles || menu.roles.includes(user?.role))
          .map(menu => (
            <div
              key={menu.id}
              onClick={() => {
                router.push(menu.path);
                setIsOpen(false); 
              }}
              className={`flex items-center gap-3 p-4 text-md text-slate-600 hover:bg-blue-900 hover:text-white cursor-pointer rounded-lg my-2 ${
                router.pathname === menu.path ? 'bg-blue-100' : ''
              }`}
            >
              <menu.icon className="w-5 h-5" />
              <span>{menu.name}</span>
            </div>
          ))}

        {user && (
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 text-md text-slate-600 hover:bg-blue-900 hover:text-white cursor-pointer rounded-lg my-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        )}
      </div>

      {user && (
        <div className="p-5 text-sm text-center text-gray-700">
          <div className="capitalize font-semibold">
            {user?.username} ({user?.role})
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

     
      <div className="md:hidden fixed top-4 left-6 z-50 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-md shadow border"
        >
          {isOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}

        </button>
      </div>

   
      <div
        className={`fixed inset-0 z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <SidebarContent />
      </div>

     
      <div className="hidden md:block">
        <SidebarContent />
      </div>
    </>
  );
}
