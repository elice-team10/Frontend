export const isLoggedIn = () => {
  const token = localStorage.getItem('auth');

  return !!token;
};
