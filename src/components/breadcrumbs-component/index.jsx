import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useGetCategoriesQuery } from '../../redux/slices/api-slice';
import { setCategoriesList } from '../../redux/slices/categories-slice';

import { baseBooksUrl } from '../../constants/constants';
import styles from './breadcrumbs.module.scss';

export function Breadcrumbs({ title }) {
  const [categoryName, setCategoryName] = React.useState('Все книги');
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPrevCategory = location.pathname.split('/').filter(Boolean)[1];

  const linkPrev = baseBooksUrl + currentPrevCategory;

  const { data = [], isLoading, error } = useGetCategoriesQuery();

  React.useEffect(() => {
    if (!isLoading) {
      console.log(currentPrevCategory);
      if (currentPrevCategory === 'all') {
        setCategoryName('Все книги');
      } else {
        const categoryNameFiltred = data.filter((category) => category.path === currentPrevCategory)[0].name;
        setCategoryName(categoryNameFiltred);
      }
    }
  }, [isLoading, currentPrevCategory, data]);

  return (
    <div className={styles.root}>
      <div className={styles.breadcrumbsContent}>
        <ul className={styles.breadcrumbsList}>
          <li className={styles.breadcrumb}>
            <Link data-test-id='breadcrumbs-link' to={linkPrev}>
              {categoryName}
            </Link>
          </li>
          <li className={styles.breadcrumb}>
            <Link data-test-id='book-name' to='#'>
              {title}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
