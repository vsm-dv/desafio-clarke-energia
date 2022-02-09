import useAuthProvider from '../../hooks/useAuthProvider';
import AuthContext from './index';

function AuthProvider({ children }) {
  const authentication = useAuthProvider();

  return (
    <AuthContext.Provider value={authentication}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;