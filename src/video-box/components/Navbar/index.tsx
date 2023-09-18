import { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useUiStore, useAuthStore } from '../../../store';
import { NavLink, useLocation } from 'react-router-dom';
import { ProfileIcon, Home, LogOut, Like } from '../iconsSVG/Icons';
import { Modal } from '..';
import styles from './styles.module.scss';

export const Navbar = () => {
  const [handleModal, setHandleModal] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth
  });

  const profile = useAuthStore((state) => state.profile);
  const onModalOpenLogOut = useUiStore((state) => state.onModalOpenLogOut);
  const onModalOpenImageProfile = useUiStore(
    (state) => state.onModalOpenImageProfile
  );

  const onCloseModal = () => {
    setHandleModal(false);
  };

  const { theme, toggleTheme, themeLight } = useTheme();
  const { pathname } = useLocation();

  const colorIcon = (path: string) => {
    if (pathname.slice(1) === path) {
      return '#fb6d3a';
    }
    return themeLight ? '#6553b2' : '#4a4a4a';
  };

  const links = [
    {
      text: 'Videos',
      href: '/videos',
      img: <Home height="20" width="25" color={colorIcon('videos')} />
    },
    {
      text: 'Creator profile',
      href: '/profile',
      img: <ProfileIcon color={colorIcon('profile')} width="25" height="20" />
    },
    {
      text: 'Liked videos',
      href: '/listliked',
      img: <Like width="25" height="25" color={colorIcon('listliked')} />
    }
  ];

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.nameProfile}>
        {windowSize.width <= 750 && (
          <div
            className={styles.buttonMenu}
            onClick={() => {
              setHandleModal(!handleModal);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              height={35}
              width={35}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
        )}
        <div
          className={`${styles.spanProfile} ${styles[theme]}`}
          onClick={onModalOpenImageProfile}
        >
          {profile.imageUrl == null ? (
            profile.name[0]
          ) : (
            <img src={profile.imageUrl} alt="err" />
          )}
        </div>
        <p>{profile.name}</p>
      </div>
      <div className={styles.containerToggle}>
        <label className={styles.toggle}>
          <input
            className={styles['toggle-state']}
            onClick={toggleTheme}
            type="checkbox"
            defaultChecked={themeLight}
          />
          <div className={styles.indicator}></div>
        </label>
      </div>
      {windowSize.width <= 750 ? (
        handleModal && (
          <Modal content="start" onModalCLose={onCloseModal}>
            <ul className={`${styles.list} ${styles[theme]}`}>
              <li
                className={styles.buttonMenu}
                onClick={() => {
                  setHandleModal(!handleModal);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  height={35}
                  width={35}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </li>
              {links.map((link) => (
                <NavLink
                  key={link.text}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navActive} ${styles[theme]}`
                      : `${styles.navDefault} ${styles[theme]}`
                  }
                  to={link.href}
                >
                  {link.img}
                  {link.text}
                </NavLink>
              ))}
              <li className={`${styles.buttonNav} `}>
                <span
                  className={styles[theme]}
                  onClick={() => {
                    onModalOpenLogOut();
                    setHandleModal(false);
                  }}
                >
                  <LogOut />
                </span>
              </li>
            </ul>
          </Modal>
        )
      ) : (
        <ul className={styles.list}>
          {links.map((link) => (
            <NavLink
              key={link.text}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navActive} ${styles[theme]}`
                  : `${styles.navDefault} ${styles[theme]}`
              }
              to={link.href}
            >
              {link.img}
              {link.text}
            </NavLink>
          ))}
          <li className={`${styles.buttonNav} `}>
            <span
              className={styles[theme]}
              onClick={() => {
                onModalOpenLogOut();
              }}
            >
              <LogOut />
            </span>
          </li>
        </ul>
      )}
    </nav>
  );
};
