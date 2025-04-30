import { createContext, useContext, useEffect, useState } from "react";
import { validateToken } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [credential, setCredential] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthState(false);
      return;
    }
    const validateUser = async () => {
      try {
        const { permanentCredential } = await validateToken(token);
        const payload = jwtDecode(token);
        setUserId(payload.id);

        setAuthState(true);
        setCredential(permanentCredential);
      } catch (e) {
        if (e) {
          setAuthState(false);
          console.error(e);
        }
      }
    };

    validateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, credential, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
