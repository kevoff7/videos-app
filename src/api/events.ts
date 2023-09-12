import { type CreateEventsProps } from '../interfaces/events';
import authApi from '../libs/axios';

export const getEvents = async () => {
  return await authApi.get('/events/');
};

export const createEvent = async (data: CreateEventsProps) => {
  return await authApi.post('/events/', data);
};
