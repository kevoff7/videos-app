import { useEffect, useState } from 'react';
import { Button } from '..';
import { useTheme } from '../../../context/ThemeContext';
import { useAuthStore, useUiStore } from '../../../store';
import styles from './styles.module.scss';
import { Toaster, toast } from 'sonner';

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
  const { theme } = useTheme();

  const [changeImageProfile, setChangeImageProfile] = useState(false);
  const [url, setUrl] = useState('');

  const messageEvent = useAuthStore((state) => state.messageEvent);
  const clearMessageEvent = useAuthStore((state) => state.clearMessageEvent);

  const onModalCloseImageProfile = useUiStore(
    (state) => state.onModalCloseImageProfile
  );
  const startSavingEvent = useAuthStore((state) => state.startSavingEvent);
  const startDeletingEvent = useAuthStore((state) => state.startDeletingEvent);

  const handleClickImageProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    onModalCloseImageProfile();
    clearMessageEvent();
  };
  const handleClickClose = () => {
    onModalCloseImageProfile();
    clearMessageEvent();
  };

  const handleClickSave = () => {
    void startSavingEvent(url);
  };

  const handleClickCancel = () => {
    setChangeImageProfile(false);
  };

  const handleClickChange = () => {
    setChangeImageProfile(true);
  };
  useEffect(() => {
    if (messageEvent === undefined) return;
    if (messageEvent.ok === true) {
      toast.success(messageEvent.msg);
      return;
    }
    toast.error(messageEvent.msg[0].message);
  }, [messageEvent]);
  return (
    <div
      className={`${styles.modalContainer}`}
      onClick={handleClickImageProfile}
    >
      <Toaster richColors />
      <div className={`${styles.cardImageProfile} ${styles[theme]}`}>
        <header className={styles.header}>
          <div className={`${styles.head}`}>
            <button onClick={handleClickClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={26}
                height={26}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h1>VideoBox</h1>
          </div>
          <span>Foto de perfil</span>
          <p>Una foto ayudará a saber cuando hayas accedido a la cuenta</p>
        </header>
        <main className={styles.containerImage}>
          <div className={`${styles.image} ${styles[theme]}`}>
            {content.length > 1 ? (
              <img src={content} alt="Image profile user" />
            ) : (
              <div>{content}</div>
            )}
          </div>
        </main>
        <footer>
          {changeImageProfile ? (
            <div className={styles.containerFooter}>
              <label>
                Url:
                <input
                  type="url"
                  placeholder="Ingrese la URL de su imagen"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                />
              </label>
              <div className={styles.buttons}>
                <Button text="Guardar" onClick={handleClickSave} />
                <Button
                  text="Cancelar"
                  type="primary"
                  onClick={handleClickCancel}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.buttons}>
                <Button text="Cambiar" onClick={handleClickChange} />
                <Button
                  text="Quitar"
                  type="primary"
                  onClick={() => {
                    void startDeletingEvent();
                  }}
                />
              </div>
            </>
          )}
        </footer>
      </div>
    </div>
  );
};
