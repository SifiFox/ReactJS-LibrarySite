import styles from './primary-btn.module.scss';

export function PrimaryBtn({ size, title, isDisabled, handleClickBtn }) {
  return (
    <button
      onClick={handleClickBtn}
      type='button'
      disabled={isDisabled && 'disabled'}
      className={size === 'full' ? styles.primaryBtnFull : styles.root}
    >
      {title}
    </button>
  );
}
