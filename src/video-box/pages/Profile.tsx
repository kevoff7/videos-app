import { useEffect } from 'react';
import { useVideoBoxStore } from '../../store';
import { Layout } from '../components';

// import styles from '../../styles/profile.module.scss';

export const Profile = () => {
  const events = useVideoBoxStore((state) => state.events);

  const startLoadingEvents = useVideoBoxStore(
    (state) => state.startLoadingEvents
  );
  const startSavingEvents = useVideoBoxStore(
    (state) => state.startSavingEvents
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    void startSavingEvents({ url, title });
    form.reset();
  };

  useEffect(() => {
    void startLoadingEvents();
  }, []);
  return (
    <Layout>
      <div>
        Mostrar videos del creador y permitir crear nuevos videos
        <br />
        dos botones PUBLICAR y DETALLES DEL VIDEO donde mostraremos una card
        para eliminar o editarlo
      </div>
      <h1>Para guardar un video</h1>
      <p>
        Ve a un video de Yotube, toca el boton de compartir, copia el enlace y
        pegalo acá
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Url:
          <input name="url" type="url" placeholder="Ingrese la url del video" />
        </label>
        <label>
          Titulo:
          <input
            name="title"
            type="text"
            placeholder="Ingrese el titulo de el video"
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <section>
        {events.map((event) => (
          <article key={event.id_video}>
            <iframe
              width="315"
              frameBorder="0"
              height="215"
              src={event.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </article>
        ))}
      </section>
    </Layout>
  );
};
