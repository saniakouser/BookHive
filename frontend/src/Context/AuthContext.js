import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginWithToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now();
      const expiryTime = decoded.exp * 1000;

      if (currentTime < expiryTime) {
        setUser({ email: decoded.email, id: decoded.id });

        const timeLeft = expiryTime - currentTime;
        const logoutTimer = setTimeout(() => {
          localStorage.removeItem("token");
          setUser(null);
        }, timeLeft);

        return () => clearTimeout(logoutTimer);
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loginWithToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
