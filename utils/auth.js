// /utils/auth.js
export const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'sales', password: 'sales123', role: 'sales' },
  { username: 'viewer', password: 'viewer123', role: 'viewer' },
];

export function authenticate(username, password) {
  return users.find(
    (user) => user.username === username && user.password === password
  );
}
