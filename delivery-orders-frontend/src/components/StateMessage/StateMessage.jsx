import styles from './StateMessage.module.scss';

export function StateMessage({ tone = 'muted', title, description, action }) {
  return (
    <div className={`${styles.wrap} ${styles[tone]}`} role={tone === 'danger' ? 'alert' : undefined}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
