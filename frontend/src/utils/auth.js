import axios from 'axios';

export async function checkAuthStatus() {
  try {
    const response = await axios.get('http://localhost:666/auth/status', {
      withCredentials: true, // Ez biztosítja, hogy a cookie elküldésre kerüljön
    });
    return response.data.isAuthenticated; // true vagy false attól függően, hogy be van-e jelentkezve
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
}
