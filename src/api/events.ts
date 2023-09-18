import {
  type PublishedEventsProps,
  type CreateEventsProps,
  type UpdateEventsProps
} from '../interfaces/events';
import authApi from '../libs/axios';

export const getEventsRequest = async () => {
  return await authApi.get('/events/');
};

export const createEventRequest = async (events: CreateEventsProps) => {
  return await authApi.post('/events/', events);
};

export const publishedEventsRequest = async ({
  idVideo,
  dataVideo
}: PublishedEventsProps) => {
  return await authApi.put(`/events/published/${String(idVideo)}`, dataVideo);
};

export const updateEventsRequest = async ({
  id,
  dataVideo
}: UpdateEventsProps) => {
  return await authApi.put(`/events/${id}`, dataVideo);
};

export const deleteEventsRequest = async (id: number) => {
  return await authApi.delete(`/events/${id}`);
};

export const createLikeEventsRequest = async (id: number) => {
  return await authApi.post(`/events/like/${id}`);
};
