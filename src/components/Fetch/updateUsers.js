import axios from 'axios';

axios.defaults.baseURL = 'https://6460db4afe8d6fb29e387a20.mockapi.io';

export async function updateUsers(userId, followers) {
  const response = await axios.put(`/users/${userId}`, { followers });
  return response;
}
