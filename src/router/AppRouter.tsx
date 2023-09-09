import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from '../auth/pages';
import { Status, useAuthStore } from '../store/auth';
import { useEffect } from 'react';
import { Home, Profile } from '../video-box/pages';

export const AppRouter = () => {
  const checkAuthToken = useAuthStore((state) => state.checkAuthToken);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    void checkAuthToken();
  }, []);

  if (status === Status.Checking) {
    return <h1>Cargando...</h1>;
  }
  return (
    <Routes>
      {status === Status.NotAuthenticated ? (
        <>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          <Route path="/*" element={<Navigate to={'/auth/login'} />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to={'/home'} />} />
        </>
      )}
      ;
    </Routes>
  );
};
