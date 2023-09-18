import { Button, Modal } from '..';
import { useTheme } from '../../../context/ThemeContext';
import { useAuthStore, useUiStore } from '../../../store';
import styles from './styles/logOut.module.scss';

export const LogOutModal = () => {
  const { theme } = useTheme();
  const onModalCloseLogOut = useUiStore((state) => state.onModalCloseLogOut);

  const logOut = useAuthStore((state) => state.logOut);

  const handleClickLogOut = () => {
    logOut();
    onModalCloseLogOut();
  };

  return (
    <Modal onModalCLose={onModalCloseLogOut}>
      <div className={`${styles.cardLogOut} ${styles[theme]}`}>
        <p>
          Surely you want to leave <br /> VideoBox?
        </p>
        <div>
          <Button text="Exit" type="primary" onClick={handleClickLogOut} />
          <Button text="Cancel" onClick={onModalCloseLogOut} />
        </div>
      </div>
    </Modal>
  );
};
