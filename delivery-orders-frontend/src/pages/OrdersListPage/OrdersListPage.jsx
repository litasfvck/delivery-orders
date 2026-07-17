import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../../api/ordersApi';
import { Button } from '../../components/Button/Button';
import { OrderNumberBadge } from '../../components/OrderNumberBadge/OrderNumberBadge';
import { RouteLine } from '../../components/RouteLine/RouteLine';
import { StateMessage } from '../../components/StateMessage/StateMessage';
import { useAsync } from '../../hooks/useAsync';
import { formatDate, formatWeight } from '../../utils/formatters';
import styles from './OrdersListPage.module.scss';

export function OrdersListPage() {
  const fetchOrders = useCallback(() => ordersApi.list(), []);
  const { data: orders, loading, error, refetch } = useAsync(fetchOrders, []);

  return (
    <section>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Реестр отправлений</p>
          <h1 className={styles.title}>Список заказов</h1>
        </div>
        <Button as={Link} to="/orders/new">
          + Новый заказ
        </Button>
      </div>

      {loading && (
        <StateMessage title="Загружаем заказы…" description="Это займёт пару секунд" />
      )}

      {!loading && error && (
        <StateMessage
          tone="danger"
          title="Не удалось загрузить список заказов"
          description={error.message}
          action={
            <Button variant="secondary" onClick={refetch}>
              Повторить попытку
            </Button>
          }
        />
      )}

      {!loading && !error && (!orders || orders.length === 0) && (
        <StateMessage
          title="Заказов пока нет"
          description="Создайте первый заказ на доставку — он появится в этом списке."
          action={
            <Button as={Link} to="/orders/new" variant="secondary">
              Создать заказ
            </Button>
          }
        />
      )}

      {!loading && !error && orders && orders.length > 0 && (
        <ul className={styles.list}>
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/orders/${order.id}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <OrderNumberBadge orderNumber={order.orderNumber} />
                  <span className={styles.date}>Забор: {formatDate(order.pickupDate)}</span>
                </div>
                <RouteLine from={order.senderCity} to={order.receiverCity} />
                <div className={styles.cardBottom}>
                  <span className={styles.addressPair}>
                    <span>{order.senderAddress}</span>
                    <span className={styles.arrow}>→</span>
                    <span>{order.receiverAddress}</span>
                  </span>
                  <span className={styles.weight}>{formatWeight(order.weight)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
