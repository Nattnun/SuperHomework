import { useState } from "react";
import LoginForm from "./layouts/LoginForm";
import useAuth from "./hooks/useAuth";

function App() {
  const { user, setUser } = useAuth();
  const [dark, setDark] = useState(false);

  // const toggle = () => {
  //   setDark(!dark);
  // };
  return (
    <div
      className="min-h-screen flex flex-col gp-3"
      data-theme={dark ? "dark" : "cupcake"}
    >
      <h1 className="text-3xl font-bold underline text-pink-600">
        Hello world!
      </h1>
      <input
        type="checkbox"
        className="toggle"
        // onClick={toggle}
        checked={dark}
        onChange={(e) => {
          setDark(e.target.checked);
        }}
      />
      <hr />
      {/* <RegisterForm /> */}
      <LoginForm />
    </div>
  );
}

export default App;
