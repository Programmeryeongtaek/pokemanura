import axios from 'axios';

export const BASE_URL = 'https://1666e8fc-a58f-47ca-970c-9107006eae14.mock.pstmn.io';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})