import styles from './OrderNumberBadge.module.scss';

/** Форматирует номер заказа в вид «№ 000128». */
function formatOrderNumber(id) {
  const str = String(id);
  return /^\d+$/.test(str) ? str.padStart(6, '0') : str;
}

export function OrderNumberBadge({ id, size = 'md' }) {
  return (
    <span className={`${styles.badge} ${styles[size]}`}>
      <span className={styles.mark}>№</span>
      {formatOrderNumber(id)}
    </span>
  );
}
