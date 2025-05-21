import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const signup = (username, password, role, email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { username, password, role, email };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (username, password, role, email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === role &&
        u.email === email
    );
    if (matchedUser) {
      localStorage.setItem('user', JSON.stringify(matchedUser));
      setUser(matchedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
