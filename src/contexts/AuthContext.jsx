import axios from "axios";
import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState({ id: 1 });

  useEffect(() => {
    const run = async () => {
      try {
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
      }
    };
    run();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
