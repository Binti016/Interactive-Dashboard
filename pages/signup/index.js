import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Head from 'next/head';

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    username: '',
    email: '',
    role: 'admin', 
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form.username, form.password, form.role, form.email);
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Sign Up | Renalytics</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex w-full max-w-5xl h-[600px]">
        
          <div className="w-1/2 bg-gradient-to-b from-yellow-50 to-white p-10 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2
                className="text-3xl font-semibold text-blue-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Create Account
              </h2>
             
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={form.username}
                onChange={handleChange}
                className="w-full px-1 pb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all bg-transparent"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-1 pb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all bg-transparent"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-1 pb-2 border-b border-gray-300 focus:outline-none focus:border-blue-800 transition-all bg-transparent text-slate-700"
              >
                <option value="admin">Admin</option>
                <option value="sales">Sales Representative</option>
              </select>

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-1 pb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-all bg-transparent"
              />

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 transition-all text-white py-3 rounded-lg font-semibold mt-4"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm mt-6 text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-800 hover:underline">
                Login
              </a>
            </p>
          </div>

          
          <div className="w-1/2 relative">
            <img
              src="/Renata.jpeg"
              alt="Team working"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="text-white text-6xl"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                }}
              >
                Renalytics
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
