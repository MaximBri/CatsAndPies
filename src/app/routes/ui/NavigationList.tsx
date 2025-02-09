import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC, memo } from 'react';

import { getExisting } from '@/entities/cat/model/CatSlice';
import { RootState } from '@/app/store';
import { getAuth } from '@/entities/user/authorization/model/AuthSlice';
import { routes } from '@/shared/config/routes';
import styles from './NavigationList.module.scss';

interface NavigationListProps {
  closeBurger?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationList: FC<NavigationListProps> = memo(
  ({ closeBurger }) => {
    const auth = useSelector<RootState, boolean>(getAuth);
    const catExisting = useSelector(getExisting);
    return (
      <>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${
              closeBurger ? styles['link--burger'] : styles['link--header']
            } ${isActive ? styles.active : ''}`
          }
          onClick={() => (closeBurger ? closeBurger(false) : {})}
          to={routes.main.catalog.path}
        >
          {routes.main.catalog.name}
        </NavLink>

        {auth && (
          <>
            {catExisting && (
              <NavLink
                onClick={() => (closeBurger ? closeBurger(false) : {})}
                className={({ isActive }) =>
                  `${styles.link} ${
                    closeBurger
                      ? styles['link--burger']
                      : styles['link--header']
                  } ${isActive ? styles.active : ''}`
                }
                to={routes.main.cat.path}
              >
                {routes.main.cat.name}
              </NavLink>
            )}
            <NavLink
              onClick={() => (closeBurger ? closeBurger(false) : {})}
              className={({ isActive }) =>
                `${styles.link} ${
                  closeBurger ? styles['link--burger'] : styles['link--header']
                } ${isActive ? styles.active : ''}`
              }
              to={routes.main.account.path}
            >
              {routes.main.account.name}
            </NavLink>
            <NavLink
              onClick={() => (closeBurger ? closeBurger(false) : {})}
              className={({ isActive }) =>
                `${styles.link} ${
                  closeBurger ? styles['link--burger'] : styles['link--header']
                } ${isActive ? styles.active : ''}`
              }
              to={routes.main.profile.path}
            >
              {routes.main.profile.name}
            </NavLink>
          </>
        )}
        <NavLink
          onClick={() => (closeBurger ? closeBurger(false) : {})}
          className={({ isActive }) =>
            `${styles.link} ${
              closeBurger ? styles['link--burger'] : styles['link--header']
            } ${isActive ? styles.active : ''}`
          }
          to={routes.main.about.path}
        >
          {routes.main.about.name}
        </NavLink>
      </>
    );
  }
);
