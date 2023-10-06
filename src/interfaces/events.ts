export interface Event {
  id_video: number;
  url: string;
  title: string;
  createdAt: string;
  published: boolean;
  id: number;
}

export interface CreateEventsProps {
  url: string;
  title: string;
}

export interface PublishedEventsProps {
  idVideo: number;
  dataVideo: {
    idUser: number;
    published: boolean;
  };
}

interface UpdateEventsData extends CreateEventsProps {
  idUser: number;
}
export interface UpdateEventsProps {
  id: number;
  dataVideo: UpdateEventsData;
}
