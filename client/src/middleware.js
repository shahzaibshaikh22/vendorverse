import jwtDecode from 'jwt-decode';
export const isAuthenticated = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  }
  return false;
};