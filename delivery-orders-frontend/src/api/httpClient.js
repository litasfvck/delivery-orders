import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.message ||
      'Не удалось выполнить запрос';

    return Promise.reject({
      message,
      status: error.response?.status ?? null,
      original: error,
    });
  }
);
