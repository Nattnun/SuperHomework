import axios from "axios";
import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const rs = await axios.get("http://localhost:9999/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(rs.data.user);
        setUser(rs.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, dark, setDark }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
