import { useTheme } from '../../../context/ThemeContext';
import { type Event } from '../../../interfaces/events';
import styles from './styles/cardVideo.module.scss';

type EventPick = Pick<Event, 'url'>;

interface CardVideoProps extends EventPick {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CardVideo = ({ url, children }: CardVideoProps) => {
  const { theme } = useTheme();
  return (
    <article className={`${styles.cardList} ${styles[theme]}`}>
      <iframe
        // width="100"
        // height="200"
        frameBorder="0"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      {children}
    </article>
  );
};
