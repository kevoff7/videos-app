import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { useTheme } from '../../../context/ThemeContext';
import { useAuthStore } from '../../../store/auth';

interface FooterProps {
  description: string;
  link: string;
  textLink: string;
}

export const Footer = ({ description, link, textLink }: FooterProps) => {
  const clearMessageEvent = useAuthStore((state) => state.clearMessageEvent);
  const { theme } = useTheme();

  return (
    <div className={`${styles.footer} ${styles[theme]}`}>
      <span className={`${styles.footerSpan} ${styles[theme]}`}>
        {description}
        <Link to={link} onClick={clearMessageEvent}>
          {textLink}
        </Link>
      </span>
    </div>
  );
};
