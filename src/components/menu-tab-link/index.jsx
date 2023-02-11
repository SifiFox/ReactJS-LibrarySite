import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link, useMatch } from 'react-router-dom';
import { MenuTabInner } from '../menu-tab-inner';

import {
  hideMenu,
  hideInnerMenu,
  setMenuActive,
  setMenuInnerActive,
  showInnerMenu,
} from '../../redux/slices/menu-slice';

export function MenuTabLink({ to, ...props }) {
  const match = useMatch(to);

  const dispatch = useDispatch();
  const isBooksAll = props.title === 'Витрина книг';

  const currentTitle = props.title;

  const { innerMenuActive } = useSelector((state) => state.menu);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  const handleMenuClick = () => (isBooksAll ? dispatch(setMenuInnerActive()) : dispatch(hideInnerMenu()));

  const [testId, setTestId] = React.useState();

  React.useEffect(() => {
    if (currentTitle === 'Витрина книг') {
      if (windowWidth <= 768) {
        setTestId('burger-showcase');
      } else setTestId('navigation-showcase');
    }
    if (currentTitle === 'Правила пользования') {
      if (windowWidth <= 768) {
        setTestId('burger-terms');
      } else setTestId('navigation-terms');
    }
    if (currentTitle === 'Договор оферты') {
      if (windowWidth <= 768) {
        setTestId('burger-contract');
      } else setTestId('navigation-contract');
    }
  }, [currentTitle, windowWidth]);

  return (
    <div className={match ? props.menuActiveTab : props.menuTab}>
      <Link
        data-test-id={testId}
        onClick={handleMenuClick}
        to={to}
        className={
          // match ? (props.innerItems ? props.menuActiveInnerContent : props.menuActiveTabTitle) : props.menuTabTitle
          match
            ? props.innerItems
              ? innerMenuActive
                ? props.menuActiveInnerContent
                : props.menuHideInnerContent
              : props.menuActiveTabTitle
            : props.menuTabTitle
        }
      >
        {props.title}
      </Link>

      {props.innerItems && innerMenuActive ? (
        <MenuTabInner showed={true} defaultActive={props.innerItems[0]} data={props.innerItems} />
      ) : (
        <MenuTabInner data={props.innerItems} showed={false} />
      )}
    </div>
  );
}
