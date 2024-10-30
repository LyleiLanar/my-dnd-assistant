import axios from 'axios';

export async function checkAuthStatus() {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/auth/status',
      {
        withCredentials: true, // Ez biztosítja, hogy a cookie elküldésre kerüljön
      }
    );
    return response.data.isAuthenticated; // true vagy false attól függően, hogy be van-e jelentkezve
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
}

export const logout = async (setIsAuthenticated) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
