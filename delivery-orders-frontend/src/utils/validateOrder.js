const REQUIRED_MESSAGE = 'Обязательное поле';

export function todayIso() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 10);
}

export function validateOrderForm(values) {
  const errors = {};

  const requiredTextFields = [
    'senderCity',
    'senderAddress',
    'receiverCity',
    'receiverAddress',
  ];

  for (const field of requiredTextFields) {
    if (!values[field] || !values[field].trim()) {
      errors[field] = REQUIRED_MESSAGE;
    }
  }

  if (!values.weight) {
    errors.weight = REQUIRED_MESSAGE;
  } else {
    const weight = Number(values.weight);
    if (Number.isNaN(weight)) {
      errors.weight = 'Введите число';
    } else if (weight <= 0) {
      errors.weight = 'Вес должен быть больше нуля';
    } else if (weight > 20000) {
      errors.weight = 'Проверьте значение — слишком большой вес';
    }
  }

  if (!values.pickupDate) {
    errors.pickupDate = REQUIRED_MESSAGE;
  } else if (values.pickupDate < todayIso()) {
    errors.pickupDate = 'Дата забора не может быть в прошлом';
  }

  return errors;
}
