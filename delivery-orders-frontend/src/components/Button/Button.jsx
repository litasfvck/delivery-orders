import styles from './Button.module.scss';

export function Button({
  variant = 'primary',
  as: Component = 'button',
  className,
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
