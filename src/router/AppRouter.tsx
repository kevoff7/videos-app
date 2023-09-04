import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from '../auth/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
    </Routes>
  );
};
