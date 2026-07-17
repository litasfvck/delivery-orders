import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersApi } from '../../api/ordersApi';
import { FormField } from '../../components/FormField/FormField';
import { TextInput } from '../../components/TextInput/TextInput';
import { Button } from '../../components/Button/Button';
import { StateMessage } from '../../components/StateMessage/StateMessage';
import { validateOrderForm, todayIso } from '../../utils/validateOrder';
import styles from './CreateOrderPage.module.scss';

const EMPTY_FORM = {
  senderCity: '',
  senderAddress: '',
  recipientCity: '',
  recipientAddress: '',
  weightKg: '',
  pickupDate: '',
};

export function CreateOrderPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function handleChange(field) {
    return (event) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      // убираем ошибку поля сразу при исправлении, не дожидаясь повторной отправки
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateOrderForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const created = await ordersApi.create({
        ...values,
        weightKg: Number(values.weightKg),
      });
      navigate(`/orders/${created.id}`, {
        state: { justCreated: true },
      });
    } catch (error) {
      setSubmitError(error.message || 'Не удалось создать заказ. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <div className={styles.head}>
        <p className={styles.eyebrow}>Приёмка груза</p>
        <h1 className={styles.title}>Новый заказ на доставку</h1>
        <p className={styles.lead}>
          Заполните все поля манифеста. Номер заказа будет присвоен автоматически
          после сохранения.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <fieldset className={styles.group}>
          <legend className={styles.groupTitle}>
            <span className={styles.groupDot} data-role="from" />
            Отправитель
          </legend>
          <div className={styles.row}>
            <FormField label="Город отправителя" htmlFor="senderCity" required error={errors.senderCity}>
              <TextInput
                id="senderCity"
                name="senderCity"
                placeholder="например, Москва"
                value={values.senderCity}
                onChange={handleChange('senderCity')}
                invalid={Boolean(errors.senderCity)}
                autoComplete="off"
              />
            </FormField>
            <FormField
              label="Адрес отправителя"
              htmlFor="senderAddress"
              required
              error={errors.senderAddress}
            >
              <TextInput
                id="senderAddress"
                name="senderAddress"
                placeholder="улица, дом, офис/квартира"
                value={values.senderAddress}
                onChange={handleChange('senderAddress')}
                invalid={Boolean(errors.senderAddress)}
                autoComplete="off"
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.groupTitle}>
            <span className={styles.groupDot} data-role="to" />
            Получатель
          </legend>
          <div className={styles.row}>
            <FormField
              label="Город получателя"
              htmlFor="recipientCity"
              required
              error={errors.recipientCity}
            >
              <TextInput
                id="recipientCity"
                name="recipientCity"
                placeholder="например, Казань"
                value={values.recipientCity}
                onChange={handleChange('recipientCity')}
                invalid={Boolean(errors.recipientCity)}
                autoComplete="off"
              />
            </FormField>
            <FormField
              label="Адрес получателя"
              htmlFor="recipientAddress"
              required
              error={errors.recipientAddress}
            >
              <TextInput
                id="recipientAddress"
                name="recipientAddress"
                placeholder="улица, дом, офис/квартира"
                value={values.recipientAddress}
                onChange={handleChange('recipientAddress')}
                invalid={Boolean(errors.recipientAddress)}
                autoComplete="off"
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.groupTitle}>
            <span className={styles.groupDot} data-role="cargo" />
            Параметры груза
          </legend>
          <div className={styles.row}>
            <FormField
              label="Вес груза, кг"
              htmlFor="weightKg"
              required
              error={errors.weightKg}
              hint="Укажите вес в килограммах"
            >
              <TextInput
                id="weightKg"
                name="weightKg"
                type="number"
                min="0.1"
                step="0.1"
                inputMode="decimal"
                placeholder="0.0"
                value={values.weightKg}
                onChange={handleChange('weightKg')}
                invalid={Boolean(errors.weightKg)}
              />
            </FormField>
            <FormField
              label="Дата забора груза"
              htmlFor="pickupDate"
              required
              error={errors.pickupDate}
            >
              <TextInput
                id="pickupDate"
                name="pickupDate"
                type="date"
                min={todayIso()}
                value={values.pickupDate}
                onChange={handleChange('pickupDate')}
                invalid={Boolean(errors.pickupDate)}
              />
            </FormField>
          </div>
        </fieldset>

        {submitError && (
          <StateMessage tone="danger" title="Заказ не сохранён" description={submitError} />
        )}

        <div className={styles.actions}>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Сохраняем…' : 'Создать заказ'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={submitting}
            onClick={() => {
              setValues(EMPTY_FORM);
              setErrors({});
              setSubmitError(null);
            }}
          >
            Очистить форму
          </Button>
        </div>
      </form>
    </section>
  );
}
