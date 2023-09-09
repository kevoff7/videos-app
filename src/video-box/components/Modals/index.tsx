import { Button } from '..';
import { useTheme } from '../../../context/ThemeContext';
import { useAuthStore, useUiStore } from '../../../store';
import { useVideoBoxStore } from '../../../store/videoBox';
import styles from './styles.module.scss';

export const LogOutModal = () => {
  const { theme } = useTheme();
  const onModalCloseLogOut = useUiStore((state) => state.onModalCloseLogOut);

  const logOut = useAuthStore((state) => state.logOut);

  const handleClickLogOut = () => {
    logOut();
    onModalCloseLogOut();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onModalCloseLogOut();
  };
  return (
    <div className={`${styles.modalContainer}`} onClick={handleModalClick}>
      <div className={`${styles.cardLogOut} ${styles[theme]}`}>
        <p>
          Seguro que quieres salir de <br /> VideoBox?
        </p>
        <div>
          <Button text="Salir" type="primary" onClick={handleClickLogOut} />
          <Button text="Cancelar" onClick={onModalCloseLogOut} />
        </div>
      </div>
    </div>
  );
};

export const ImageProfileModal = ({ content }: { content: string }) => {
  const onModalCloseImageProfile = useUiStore(
    (state) => state.onModalCloseImageProfile
  );
  const onChangePhoto = useVideoBoxStore((state) => state.onChangePhoto);
  const onRemovePhoto = useVideoBoxStore((state) => state.onRemovePhoto);

  const { theme } = useTheme();

  const handleClickImageProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onModalCloseImageProfile();
  };
  return (
    <div
      className={`${styles.modalContainer}`}
      onClick={handleClickImageProfile}
    >
      <div className={`${styles.cardImageProfile} ${styles[theme]}`}>
        <header className={styles.header}>
          <h1>VideoBox</h1>
          <span>Foto de perfil</span>
          <p>
            Una foto ayudará a las personas a reconocerte y te permitirá saber
            cuando hayas accedido a la cuenta
          </p>
        </header>
        <div className={styles.containerImage}>
          <div className={styles.image}>{content}</div>
        </div>
        <div className={styles.buttons}>
          <Button text="Cambiar" onClick={onChangePhoto} />
          <Button text="Quitar" onClick={onRemovePhoto} />
        </div>
      </div>
    </div>
  );
};
