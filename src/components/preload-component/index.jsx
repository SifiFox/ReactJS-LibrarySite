import styles from './preloader.module.scss';

import loaderImage from '../../assets/icons/loader.svg';

export function Preloader() {
  return (
    <div data-test-id='loader' className={styles.root}>
      <img src={loaderImage} alt='preloader' />
    </div>
  );
}
