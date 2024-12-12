import axios from 'axios';

export const BASE_URL = 'https://cdc1f545-da3c-449f-baba-837b6ab4d3c1.mock.pstmn.io';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})