import styles from './primary-btn.module.scss';

export function PrimaryBtn({ size, title, isDisabled }) {
  return (
    <button
      type='button'
      disabled={isDisabled && 'disabled'}
      className={size === 'full' ? styles.primaryBtnFull : styles.root}
    >
      {title}
    </button>
  );
}
