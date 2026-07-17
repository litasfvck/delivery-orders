// Простой in-memory мок бэкенда — включается флагом VITE_USE_MOCK_API=true
// в .env.local. Нужен только для локальной демонстрации вёрстки, пока
// реальный ASP.NET API ещё не готов. Ничего из этого файла не участвует
// в работе, когда мок выключен.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let nextId = 4;
let orders = [
  {
    id: 1,
    senderCity: 'Москва',
    senderAddress: 'ул. Тверская, д. 12, офис 4',
    recipientCity: 'Казань',
    recipientAddress: 'ул. Баумана, д. 5',
    weightKg: 12.5,
    pickupDate: '2026-07-20',
  },
  {
    id: 2,
    senderCity: 'Санкт-Петербург',
    senderAddress: 'Невский пр-т, д. 100',
    recipientCity: 'Екатеринбург',
    recipientAddress: 'ул. Малышева, д. 51',
    weightKg: 340,
    pickupDate: '2026-07-22',
  },
  {
    id: 3,
    senderCity: 'Новосибирск',
    senderAddress: 'Красный пр-т, д. 28',
    recipientCity: 'Владивосток',
    recipientAddress: 'ул. Светланская, д. 8',
    weightKg: 2.2,
    pickupDate: '2026-07-19',
  },
];

export const mockOrdersStore = {
  async list() {
    await delay(350);
    return [...orders].sort((a, b) => b.id - a.id);
  },

  async getById(id) {
    await delay(250);
    const order = orders.find((item) => String(item.id) === String(id));
    if (!order) {
      const error = new Error('Заказ с таким номером не найден');
      error.status = 404;
      throw error;
    }
    return order;
  },

  async create(payload) {
    await delay(400);
    const order = { id: nextId++, ...payload };
    orders = [...orders, order];
    return order;
  },
};
