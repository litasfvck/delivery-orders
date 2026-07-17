const REQUIRED_MESSAGE = 'Обязательное поле';

/** today as yyyy-MM-dd, for the pickup date "min" constraint */
export function todayIso() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 10);
}

/**
 * Валидирует форму заказа. Возвращает объект ошибок по имени поля
 * (пустой объект — форма валидна).
 */
export function validateOrderForm(values) {
  const errors = {};

  const requiredTextFields = [
    'senderCity',
    'senderAddress',
    'recipientCity',
    'recipientAddress',
  ];

  for (const field of requiredTextFields) {
    if (!values[field] || !values[field].trim()) {
      errors[field] = REQUIRED_MESSAGE;
    }
  }

  if (!values.weightKg) {
    errors.weightKg = REQUIRED_MESSAGE;
  } else {
    const weight = Number(values.weightKg);
    if (Number.isNaN(weight)) {
      errors.weightKg = 'Введите число';
    } else if (weight <= 0) {
      errors.weightKg = 'Вес должен быть больше нуля';
    } else if (weight > 20000) {
      errors.weightKg = 'Проверьте значение — слишком большой вес';
    }
  }

  if (!values.pickupDate) {
    errors.pickupDate = REQUIRED_MESSAGE;
  } else if (values.pickupDate < todayIso()) {
    errors.pickupDate = 'Дата забора не может быть в прошлом';
  }

  return errors;
}
