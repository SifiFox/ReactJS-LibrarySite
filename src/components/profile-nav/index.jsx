import styles from './profile-nav.module.scss';

export function ProfileNav() {
  return (
    <div className={styles.root}>
      <ul>
        <li>Профиль</li>
        <li>Выход</li>
      </ul>
    </div>
  );
}
