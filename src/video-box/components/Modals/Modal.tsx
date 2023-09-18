import styles from './styles.module.scss';

interface ModalProps {
  children: React.ReactNode;
  onModalCLose: () => void;
  content?: 'center' | 'start';
}

export const Modal = ({
  children,
  onModalCLose,
  content = 'center'
}: ModalProps) => {
  const handleModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;
    onModalCLose();
  };
  return (
    <div
      className={`${styles.modalContainer} ${styles[content]}`}
      onClick={handleModal}
    >
      {children}
    </div>
  );
};
