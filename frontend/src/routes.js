import './App.css';
import SignUp from './pages/SignUp';
import SignInSide from './pages/SignIn';
import Home from './pages/Home';
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from './hooks/useAuth';
import AuthProvider from './contexts/AuthContext/AuthProvider';

function ProtectedRoute({ children, redirectTo }) {
  const authentication = useAuth();

  return authentication.token ? children : <Navigate to={redirectTo} />
}

function CustomRoutes() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<SignInSide />} />
        <Route path='/login' element={<SignInSide />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={
          <ProtectedRoute redirectTo={'/login'}>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default CustomRoutes;
