import styles from './FormField.module.scss';

/**
 * Обёртка поля формы: подпись, обязательность, текст ошибки.
 * Сам input/textarea передаётся через children, чтобы поле оставалось
 * универсальным для text/number/date и т.д.
 */
export function FormField({ label, htmlFor, required, error, hint, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
