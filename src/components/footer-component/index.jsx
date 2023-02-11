import React from 'react';

import styles from './footer-component.module.scss';

import fb from '../../assets/icons/fb.svg';
import inst from '../../assets/icons/inst.svg';
import vk from '../../assets/icons/vk.svg';
import linkedin from '../../assets/icons/linkedin.svg';

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.footerCopyrite}>© 2020-2023 Cleverland. Все права защищены.</div>
      <div className={styles.footerIcons}>
        <div className={styles.iconWrapper}>
          <img src={fb} alt='' className='icon' />
        </div>
        <div className={styles.iconWrapper}>
          <img src={inst} alt='' className='icon' />
        </div>
        <div className={styles.iconWrapper}>
          <img src={vk} alt='' className='icon' />
        </div>
        <div className={styles.iconWrapper}>
          <img src={linkedin} alt='' className='icon' />
        </div>
      </div>
    </footer>
  );
}
