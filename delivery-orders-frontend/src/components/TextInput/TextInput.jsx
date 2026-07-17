import { forwardRef } from 'react';
import styles from './TextInput.module.scss';

export const TextInput = forwardRef(function TextInput(
  { invalid, className, ...rest },
  ref
) {
  const classes = [styles.input, invalid ? styles.invalid : '', className]
    .filter(Boolean)
    .join(' ');

  return <input ref={ref} className={classes} {...rest} />;
});
