import { useLocalStorage } from "react-use";

function AuthProvider() {
  const [token, setToken, removeToken] = useLocalStorage('cachedToken', null);
  const [errorLoginMessage, setErrorLoginMessage, removeErrorLoginMessage] = useLocalStorage('errorLoginMessage', null);

  async function login(email, password, callback) {
    const body = {
      email: email,
      senha: password
    }

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorLoginMessage(data);
        return;
      }
      setToken(data.token);
      callback();
    } catch (error) {
      console.log(error);
    }
  }

  function logout(callback) {
    removeToken();
    callback();
  }

  return {
    token, setToken, login, logout, errorLoginMessage, setErrorLoginMessage, removeErrorLoginMessage
  }
}

export default AuthProvider;