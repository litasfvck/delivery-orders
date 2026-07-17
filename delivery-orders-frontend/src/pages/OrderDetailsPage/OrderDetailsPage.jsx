import { useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ordersApi } from '../../api/ordersApi';
import { Button } from '../../components/Button/Button';
import { OrderNumberBadge } from '../../components/OrderNumberBadge/OrderNumberBadge';
import { RouteLine } from '../../components/RouteLine/RouteLine';
import { StateMessage } from '../../components/StateMessage/StateMessage';
import { useAsync } from '../../hooks/useAsync';
import { formatDate, formatWeight } from '../../utils/formatters';
import styles from './OrderDetailsPage.module.scss';

function ReadOnlyField({ label, value }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  );
}

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const justCreated = Boolean(location.state?.justCreated);

  const fetchOrder = useCallback(() => ordersApi.getById(orderId), [orderId]);
  const { data: order, loading, error } = useAsync(fetchOrder, [orderId]);

  return (
    <section>
      <Button as={Link} to="/orders" variant="ghost" className={styles.back}>
        ← К списку заказов
      </Button>

      {loading && (
        <StateMessage title="Загружаем заказ…" description={`Номер: ${orderId}`} />
      )}

      {!loading && error && (
        <StateMessage
          tone="danger"
          title="Не удалось загрузить заказ"
          description={error.message}
        />
      )}

      {!loading && !error && order && (
        <>
          {justCreated && (
            <div className={styles.successBanner}>
              Заказ успешно создан и зарегистрирован в системе.
            </div>
          )}

          <div className={styles.head}>
            <div>
              <p className={styles.eyebrow}>Карточка заказа · только просмотр</p>
              <OrderNumberBadge orderNumber={order.orderNumber} size="lg" />
            </div>
            <RouteLine from={order.senderCity} to={order.receiverCity} size="lg" />
          </div>

          <div className={styles.grid}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <span className={styles.dot} data-role="from" />
                Отправитель
              </h2>
              <ReadOnlyField label="Город отправителя" value={order.senderCity} />
              <ReadOnlyField label="Адрес отправителя" value={order.senderAddress} />
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <span className={styles.dot} data-role="to" />
                Получатель
              </h2>
              <ReadOnlyField label="Город получателя" value={order.receiverCity} />
              <ReadOnlyField label="Адрес получателя" value={order.receiverAddress} />
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <span className={styles.dot} data-role="cargo" />
                Параметры груза
              </h2>
              <ReadOnlyField label="Вес груза" value={formatWeight(order.weight)} />
              <ReadOnlyField label="Дата забора груза" value={formatDate(order.pickupDate)} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
