import { AuthForm } from '../../components/forms/auth-form';
import styles from './auth-page.module.scss';

export function AuthPage() {
  return (
    <div className={styles.root}>
      <div className={styles.authTitle}>Cleverland</div>
      <div className={styles.formWrapper}>
        <AuthForm />
      </div>
    </div>
  );
}
