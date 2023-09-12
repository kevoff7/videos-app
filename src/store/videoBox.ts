import { create } from 'zustand';
import { createEvent, getEvents } from '../api/events';
import { type CreateEventsProps } from '../interfaces/events';
import { parseVideoUrl } from '../helpers/parseVideoUrl';

interface Event {
  id_video: number;
  url: string;
  title: string;
  date: string;
  published: boolean;
  id: number;
}

interface State {
  events: Event[];
}
interface Actions {
  startLoadingEvents: () => Promise<void>;
  startSavingEvents: (value: CreateEventsProps) => Promise<void>;
}

export const useVideoBoxStore = create<State & Actions>((set) => {
  return {
    events: [],
    startLoadingEvents: async () => {
      try {
        const { data } = await getEvents();
        set({ events: data.events });
      } catch (error) {
        console.log(error);
        console.log('Error al cargar los eventos');
      }
    },
    startSavingEvents: async (videoEvent) => {
      const url = parseVideoUrl(videoEvent.url);
      try {
        const { data } = await createEvent({ url, title: videoEvent.title });
        set((state) => ({
          events: state.events.concat(data.event)
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };
});
