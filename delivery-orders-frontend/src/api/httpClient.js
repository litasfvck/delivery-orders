import axios from 'axios';

// Базовый адрес API задаётся через переменную окружения VITE_API_BASE_URL
// (см. файл .env.example). Если переменная не задана, запросы уходят
// на относительный путь /api — удобно, если бэкенд отдаётся с того же хоста
// или запросы проксируются через dev-сервер Vite.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Единая нормализация ошибок, чтобы UI мог полагаться на предсказуемую форму.
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
