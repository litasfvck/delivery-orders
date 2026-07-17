import styles from './RouteLine.module.scss';

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
