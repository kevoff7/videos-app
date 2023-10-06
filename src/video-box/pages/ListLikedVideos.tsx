import { useEffect, useState } from 'react';
import { useAuthStore, useVideoBoxStore } from '../../store';
import { Layout } from '../components';
import { CardVideo } from './components/CardVideo';
import { Like } from '../components/iconsSVG/Icons';
import { Toaster, toast } from 'sonner';
import styles from '../../styles/listedVideos.module.scss';

export const ListLikedVideos = () => {
  const [shouldRunEffect, setShouldRunEffect] = useState(true);
  const { profile, messageLikeEvent } = useAuthStore((state) => state);

  const { events, startLoadingEvents } = useVideoBoxStore((state) => state);
  const { clearMessageLikeEvent, startLikeCreateEvents } = useAuthStore(
    (state) => state
  );
  useEffect(() => {
    if (shouldRunEffect) {
      setShouldRunEffect(false);
      return;
    }
    if (messageLikeEvent === undefined) return;
    toast.error(messageLikeEvent);
    return () => {
      clearMessageLikeEvent();
    };
  }, [messageLikeEvent, clearMessageLikeEvent, shouldRunEffect]);

  useEffect(() => {
    void startLoadingEvents();
  }, [startLoadingEvents]);
  return (
    <Layout>
      <Toaster richColors />
      <h2>List of videos you liked</h2>
      <section className={styles.sectionList}>
        {events.map(
          (event) =>
            profile.liked_videos != null &&
            profile.liked_videos.includes(event.id_video) && (
              <CardVideo key={event.id_video} url={event.url}>
                <div>
                  <h2>Title: {event.title}</h2>
                  <a
                    onClick={() => {
                      void startLikeCreateEvents(event.id_video);
                    }}
                  >
                    {profile.liked_videos != null &&
                    profile.liked_videos.includes(event.id_video) ? (
                      <Like color="#fb6d3a" height="35" width="35" />
                    ) : (
                      <Like height="35" width="35" />
                    )}
                  </a>
                </div>
              </CardVideo>
            )
        )}
      </section>
    </Layout>
  );
};
