import styles from './RouteLine.module.scss';

/**
 * Фирменный элемент интерфейса: маршрут «город отправителя → город получателя»
 * в виде пунктирной линии с двумя точками. Используется и в списке заказов,
 * и в карточке просмотра — так пользователь считывает направление доставки
 * с первого взгляда, не читая подписи полей.
 */
export function RouteLine({ from, to, size = 'md' }) {
  return (
    <div className={`${styles.route} ${styles[size]}`}>
      <span className={styles.point} data-role="from" />
      <span className={styles.city}>{from}</span>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.point} data-role="to" />
      <span className={styles.city}>{to}</span>
    </div>
  );
}
