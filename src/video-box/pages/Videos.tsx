import { useEffect, useRef } from 'react';
import { useAuthStore, useVideoBoxStore } from '../../store';
import { Layout } from '../components/layout';
import { CardVideo } from './components/CardVideo';
import { Like } from '../components/iconsSVG/Icons';
import { Toaster, toast } from 'sonner';

import styles from '../../styles/videos.module.scss';

export const Videos = () => {
  const refInit = useRef(true);

  const profile = useAuthStore((state) => state.profile);
  const messageLikeEvent = useAuthStore((state) => state.messageLikeEvent);
  const clearMessageLikeEvent = useAuthStore(
    (state) => state.clearMessageLikeEvent
  );

  const events = useVideoBoxStore((state) => state.events);

  const startLoadingEvents = useVideoBoxStore(
    (state) => state.startLoadingEvents
  );
  const startLikeCreateEvents = useAuthStore(
    (state) => state.startLikeCreateEvents
  );

  useEffect(() => {
    void startLoadingEvents();
  }, [startLoadingEvents]);

  useEffect(() => {
    if (refInit.current) {
      refInit.current = false;
      clearMessageLikeEvent();
      return;
    }
    if (messageLikeEvent === undefined) return;
    toast.success(messageLikeEvent);
  }, [messageLikeEvent, clearMessageLikeEvent]);

  return (
    <Layout>
      <Toaster richColors></Toaster>
      <h2>Video posted by the community</h2>
      <section className={styles.sectionList}>
        {events.map((event) => {
          return (
            event.published && (
              <CardVideo key={event.id_video} url={event.url}>
                <h2>Title: {event.title}</h2>
                <div className={styles.containerButtons}>
                  <a
                    onClick={() => {
                      void startLikeCreateEvents(event.id_video);
                    }}
                  >
                    {profile.liked_videos.includes(event.id_video) ? (
                      <Like color="#fb6d3a" height="35" width="35" />
                    ) : (
                      <Like height="35" width="35" />
                    )}
                  </a>
                </div>
              </CardVideo>
            )
          );
        })}
      </section>
    </Layout>
  );
};
