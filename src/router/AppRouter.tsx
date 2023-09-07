import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from '../auth/pages';
import { Status, useAuthStore } from '../store/auth';
import { useEffect } from 'react';

export const AppRouter = () => {
  const checkAuthToken = useAuthStore((state) => state.checkAuthToken);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    void checkAuthToken();
  }, []);

  if (status === Status.Checking) {
    console.log(1);
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
          <Route path="/*" element={<h1>g3</h1>} />
        </>
      )}
      ;
    </Routes>
  );
};
