import { Link } from 'react-router-dom';

import styles from './breadcrumbs.module.scss';

export function Breadcrumbs({ category, title }) {
  return (
    <div className={styles.root}>
      <div className={styles.breadcrumbsContent}>
        <ul className={styles.breadcrumbsList}>
          <li className={styles.breadcrumb}>
            <Link to='/books/all'>{category[0]}</Link>
          </li>
          <li className={styles.breadcrumb}>
            <Link to='#'>{title}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
