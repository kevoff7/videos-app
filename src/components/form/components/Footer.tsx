import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { useTheme } from '../../../context/ThemeContext';

interface FooterProps {
  description: string;
  link: string;
  textLink: string;
}

export const Footer = ({ description, link, textLink }: FooterProps) => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.footer} ${styles[theme]}`}>
      <span className={`${styles.footerSpan} ${styles[theme]}`}>
        {description}
        <Link to={link}>{textLink}</Link>
      </span>
    </div>
  );
};
