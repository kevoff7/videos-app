import { useEffect } from 'react';
import { useAuthStore, useUiStore, useVideoBoxStore } from '../../store';
import { ButtonModal, Layout } from '../components';
import { useTheme } from '../../context/ThemeContext';
import { Toaster, toast } from 'sonner';

import styles from '../../styles/profile.module.scss';
import { type Event } from '../../interfaces/events';
import { VideoModal } from './components/VideoModal';
import { CardVideo } from './components/CardVideo';
import { Loader } from '../../components/Loader/Loader';

export const Profile = () => {
  const { theme } = useTheme();

  const profile = useAuthStore((state) => state.profile);

  const events = useVideoBoxStore((state) => state.events);
  const messageEvent = useVideoBoxStore((state) => state.messageEvent);
  const check = useVideoBoxStore((state) => state.check);

  const isModalOpenVideoDetails = useUiStore(
    (state) => state.isModalOpenVideoDetails
  );

  const onModalOpenVideoDetails = useUiStore(
    (state) => state.onModalOpenVideoDetails
  );
  const onModalCloseVideoDetails = useUiStore(
    (state) => state.onModalCloseVideoDetails
  );

  const startLoadingEvents = useVideoBoxStore(
    (state) => state.startLoadingEvents
  );
  const startSavingEvents = useVideoBoxStore(
    (state) => state.startSavingEvents
  );
  const startPublishEvents = useVideoBoxStore(
    (state) => state.startPublishEvents
  );
  const setActiveEvents = useVideoBoxStore((state) => state.setActiveEvents);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    void startSavingEvents({ url, title });
    form.reset();
  };

  const handleClickPublish = ({
    idVideo,
    idUser,
    published
  }: {
    idVideo: number;
    idUser: number;
    published: boolean;
  }) => {
    void startPublishEvents({
      idVideo,
      dataVideo: { published: !published, idUser }
    });
  };

  const handleClickVideoDetails = (valueVideo: Event) => {
    setActiveEvents(valueVideo);
    onModalOpenVideoDetails();
  };

  useEffect(() => {
    void startLoadingEvents();
  }, [startLoadingEvents]);

  useEffect(() => {
    if (messageEvent === undefined) return;
    if (messageEvent.ok) {
      toast.success(messageEvent.msg[0].message);
      onModalCloseVideoDetails();
      return;
    }

    messageEvent.msg.map((event) => toast.error(event.message));
  }, [messageEvent, onModalCloseVideoDetails]);
  return (
    <Layout>
      {isModalOpenVideoDetails && <VideoModal />}
      <Toaster expand richColors />
      <header className={styles.header}>
        <h1>To save a video</h1>
        <p>
          Go to a Yotube video, click on the share button and copy the link.
        </p>
      </header>
      <h2>Your videos</h2>
      <main className={styles.sectionList}>
        <article className={`${styles.cardList} ${styles[theme]}`}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <p>Video</p>
            </div>
            <label>
              Url:
              <input
                name="url"
                type="url"
                placeholder="Enter the url of the video"
              />
            </label>
            <label>
              Title:
              <input
                name="title"
                type="text"
                placeholder="Enter the title of the video"
              />
            </label>
            <button type="submit" className={styles.cssbuttonsIoButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>
              <span>{check ? <Loader /> : 'Add video'}</span>
            </button>
          </form>
        </article>
        {events.map((event) => {
          return (
            event.id === profile.id && (
              <CardVideo key={event.id_video} url={event.url}>
                <div className={styles.cardListTitles}>
                  <h2>Title: {event.title}</h2>
                  <p>Saved the: {event.date.split('T', 1)}</p>
                </div>
                <div className={styles.buttons}>
                  {event.published ? (
                    <ButtonModal
                      text="Unpublish"
                      type="button2"
                      onClick={() => {
                        handleClickPublish({
                          published: event.published,
                          idVideo: event.id_video,
                          idUser: event.id
                        });
                      }}
                    />
                  ) : (
                    <ButtonModal
                      text="Publish"
                      type="button1"
                      onClick={() => {
                        handleClickPublish({
                          published: event.published,
                          idVideo: event.id_video,
                          idUser: event.id
                        });
                      }}
                    />
                  )}
                  <ButtonModal
                    text="Details video"
                    type="button3"
                    onClick={() => {
                      handleClickVideoDetails(event);
                    }}
                  />
                </div>
              </CardVideo>
            )
          );
        })}
      </main>
    </Layout>
  );
};
