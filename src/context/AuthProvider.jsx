import { createContext, useContext, useEffect, useState } from "react";
import { validateToken } from "../services/AuthService";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [credential, setCredential] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthState(false);
      return;
    }
    const validateUser = async () => {
      try {
        const { permanentCredential } = await validateToken(token);
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
    <AuthContext.Provider value={{ authState, credential }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
