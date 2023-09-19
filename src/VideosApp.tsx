import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppRouter } from './router/AppRouter';

export const VideosApp = () => {
  return (
    <ThemeProvider>
      {/* <BrowserRouter> */}
      <HashRouter>
        <AppRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </ThemeProvider>
  );
};
