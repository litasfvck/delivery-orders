import styles from './StateMessage.module.scss';

/**
 * Единое отображение для состояний «загрузка / ошибка / пусто»,
 * чтобы список и карточка заказа не изобретали разметку заново.
 */
export function StateMessage({ tone = 'muted', title, description, action }) {
  return (
    <div className={`${styles.wrap} ${styles[tone]}`} role={tone === 'danger' ? 'alert' : undefined}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
