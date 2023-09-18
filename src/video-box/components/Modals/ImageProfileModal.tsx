import { useEffect, useState } from 'react';
import { Button, Modal } from '..';
import { useTheme } from '../../../context/ThemeContext';
import { useAuthStore, useUiStore } from '../../../store';
import { Toaster, toast } from 'sonner';
import styles from './styles/imageProfile.module.scss';

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

  const handleClickClose = () => {
    onModalCloseImageProfile();
    clearMessageEvent();
  };

  const handleClickSave = () => {
    void startSavingEvent(url);
  };

  const handleClickChange = () => {
    setChangeImageProfile(!changeImageProfile);
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
    <Modal onModalCLose={handleClickClose}>
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
          <span>Profile photo</span>
          <p>A photo will help to know when you have accessed the account</p>
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
                  placeholder="Enter your image URL"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                />
              </label>
              <div className={styles.buttons}>
                <Button text="Saved" onClick={handleClickSave} />
                <Button
                  text="Cancel"
                  type="primary"
                  onClick={handleClickChange}
                />
              </div>
            </div>
          ) : (
            <>
              <div className={styles.buttons}>
                <Button text="Change" onClick={handleClickChange} />
                <Button
                  text="Remove"
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
    </Modal>
  );
};
