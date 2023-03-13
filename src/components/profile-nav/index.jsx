import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logOut } from '../../redux/slices/auth-slice';
import { hideMenu } from '../../redux/slices/menu-slice';

import styles from './profile-nav.module.scss';

export function ProfileNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(logOut());
    dispatch(hideMenu());
    navigate('/auth');
  }

  return (
    <div className={styles.root}>
      <ul>
        <li>Профиль</li>
        <li data-test-id='exit-button' role='presentation' onClick={logout}>
          Выход
        </li>
      </ul>
    </div>
  );
}
