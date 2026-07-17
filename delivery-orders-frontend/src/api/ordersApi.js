import { httpClient } from './httpClient';
import { mockOrdersStore } from './mockOrdersStore';

// Локальный режим без бэкенда: включается через VITE_USE_MOCK_API=true
// в .env.local. Полезно, пока API на ASP.NET ещё не готов.
const useMock = import.meta.env.VITE_USE_MOCK_API === 'true';

/**
 * Контракт REST API, который ожидается от бэкенда (ASP.NET 9 + EF).
 * Бэкенд-разработчик может использовать этот файл как спецификацию
 * при проектировании контроллера/Swagger-схемы.
 *
 * GET    /api/orders          -> Order[]
 * GET    /api/orders/{id}     -> Order
 * POST   /api/orders          <- CreateOrderPayload  -> Order
 *
 * Order = {
 *   id: number | string,        // автогенерируемый номер заказа
 *   senderCity: string,
 *   senderAddress: string,
 *   recipientCity: string,
 *   recipientAddress: string,
 *   weightKg: number,
 *   pickupDate: string,          // ISO-строка даты (yyyy-MM-dd)
 *   createdAt?: string,          // ISO datetime, опционально — если бэкенд отдаёт
 * }
 *
 * CreateOrderPayload = {
 *   senderCity: string,
 *   senderAddress: string,
 *   recipientCity: string,
 *   recipientAddress: string,
 *   weightKg: number,
 *   pickupDate: string,
 * }
 */

export const ordersApi = useMock
  ? mockOrdersStore
  : {
      /** Получить список всех заказов. */
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
