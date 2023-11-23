export const isLoggedIn = () => {
  const token = localStorage.getItem('loginToken');

  return !!token;
};
