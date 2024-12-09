import axios from 'axios';

const API_URL = "BASE_URL";

export const loginApi = async (credentials: {
  client_id: string;
  client_secret: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data;
}