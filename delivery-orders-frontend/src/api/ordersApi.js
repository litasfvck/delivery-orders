import { httpClient } from './httpClient';

export const ordersApi = {
  
      async list() {
        const { data } = await httpClient.get('/orders');
        return data;
      },

      /** Получить один заказ по номеру. */
      async getById(id) {
        const { data } = await httpClient.get(`/orders/${encodeURIComponent(id)}`);
        return data;
      },

      /** Создать новый заказ. */
      async create(payload) {
        const { data } = await httpClient.post('/orders', payload);
        return data;
      },
    };
