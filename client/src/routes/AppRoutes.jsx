import {
  Routes,
  Route,
} from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AnnualPage from '../pages/AnnualPage';
import MonthlyPage from '../pages/MonthlyPage';
import CustomPage from '../pages/CustomPage';
import NotFound from '../pages/NotFound';

import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {

  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path='/login'
        element={<Login />}
      />

      <Route
        path='/register'
        element={<Register />}
      />

      {/* PROTECTED ROUTES */}

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path='/annual'
        element={
          <ProtectedRoute>
            <AnnualPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/monthly'
        element={
          <ProtectedRoute>
            <MonthlyPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/custom'
        element={
          <ProtectedRoute>
            <CustomPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route
        path='*'
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;