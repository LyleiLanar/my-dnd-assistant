import axios from 'axios';

export async function getNotebooks() {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/onenote/notebooks',
      {
        withCredentials: true,
      }
    );
    console.log('Notebooks:', response.data.value);
    return response.data.value;
  } catch (error) {
    console.error('Error fetching notebooks:', error);
    return [];
  }
}
