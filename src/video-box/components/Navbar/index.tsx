import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { ProfileIcon, Home, LogOut } from '../iconsSVG/Icons';
import styles from './styles.module.scss';
import { useUiStore, useAuthStore } from '../../../store';

export const Navbar = () => {
  const profile = useAuthStore((state) => state.profile);
  const onModalOpenLogOut = useUiStore((state) => state.onModalOpenLogOut);
  const onModalOpenImageProfile = useUiStore(
    (state) => state.onModalOpenImageProfile
  );

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
      text: 'Home',
      href: '/home',
      img: <ProfileIcon color={colorIcon('home')} width="25" height="20" />
    },
    {
      text: 'Perfil',
      href: '/profile',
      img: <Home height="20" width="25" color={colorIcon('profile')} />
    }
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.nameProfile}>
        <span
          className={`${styles.spanProfile} ${styles[theme]}`}
          onClick={onModalOpenImageProfile}
        >
          {profile?.name[0]}
        </span>
        <p>{profile?.name}</p>
      </div>
      <label className={styles.toggle}>
        <input
          className={styles['toggle-state']}
          onClick={toggleTheme}
          type="checkbox"
          defaultChecked={themeLight}
        />
        <div className={styles.indicator}></div>
      </label>
      <ul className={`${styles.list}`}>
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
    </nav>
  );
};
