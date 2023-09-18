import { useTheme } from '../../../context/ThemeContext';
import { useUiStore, useVideoBoxStore } from '../../../store';
import { ButtonModal, Modal } from '../../components';
import { CardVideo } from './CardVideo';
import styles from './styles/video.module.scss';

export const VideoModal = () => {
  const { theme } = useTheme();

  const activeEvent = useVideoBoxStore((state) => state.activeEvent);

  const onModalCloseVideoDetails = useUiStore(
    (state) => state.onModalCloseVideoDetails
  );
  const startUpdateEvents = useVideoBoxStore(
    (state) => state.startUpdateEvents
  );
  const startDeleteEvents = useVideoBoxStore(
    (state) => state.startDeleteEvents
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const newForm = new FormData(form);
    const url = newForm.get('url') as string;
    const title = newForm.get('title') as string;
    if (activeEvent !== null) {
      const dataVideo = {
        url,
        title,
        idUser: activeEvent.id
      };
      void startUpdateEvents({ id: activeEvent.id_video, dataVideo });
      form.reset();
    }
  };

  const handleClickDelete = () => {
    if (activeEvent !== null) {
      void startDeleteEvents(activeEvent.id_video);
      onModalCloseVideoDetails();
    }
  };
  return (
    <Modal onModalCLose={onModalCloseVideoDetails}>
      <div className={`${styles.modalCard} ${styles[theme]}`}>
        {activeEvent !== null && (
          <CardVideo url={activeEvent.url}>
            <form onSubmit={onSubmit} className={styles.formCard}>
              <h2>Ingrese los datos a editar</h2>
              <label>
                Nueva url:
                <input name="url" type="url" placeholder="Url del video" />
              </label>
              <label>
                Nuevo titulo:
                <input
                  name="title"
                  type="text"
                  placeholder="Titulo del video"
                />
              </label>
              <ButtonModal text="Editar" typeButton="submit" type="button1" />
            </form>
            <ButtonModal
              text="Borrar video"
              type="button2"
              onClick={handleClickDelete}
            />
          </CardVideo>
        )}
      </div>
    </Modal>
  );
};
