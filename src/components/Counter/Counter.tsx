import React from 'react';
import styles from './Counter.module.scss';

interface Props {
  count: number;
}

export const Counter: React.FC<Props> = React.memo(function Counter({ count }) {
  return (
    <div className={styles.counter}>
      <span className={styles.counter__text}>{count}</span>
    </div>
  );
});
Counter.displayName = 'Counter';
