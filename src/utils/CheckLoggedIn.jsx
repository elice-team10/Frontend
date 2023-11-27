export const CheckLoggedIn = () => {
  const token = localStorage.getItem('auth');

  return !!token;
};
