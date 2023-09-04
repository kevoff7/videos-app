import React from 'react';
import ReactDOM from 'react-dom/client';
import { VideosApp } from './VideosApp';

import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <VideosApp />
  // </React.StrictMode>
);
