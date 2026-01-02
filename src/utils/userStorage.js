// Simple local storage utility for managing registered users
// In a real app, this would be handled by the backend

export const saveUser = (userData) => {
  const users = getUsers();
  const newUser = {
    ...userData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return newUser;
};

export const getUsers = () => {
  const users = localStorage.getItem('registeredUsers');
  return users ? JSON.parse(users) : [];
};

export const findUser = (username, password) => {
  const users = getUsers();
  return users.find(user => user.username === username && user.password === password);
};

export const userExists = (username, email) => {
  const users = getUsers();
  return users.some(user => user.username === username || user.email === email);
};