import styles from './primary-btn.module.scss';

export function PrimaryBtn({ size, title }) {
  return <div className={size === 'full' ? styles.primaryBtnFull : styles.root}>{title}</div>;
}
