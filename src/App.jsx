import { useState } from "react";
import LoginForm from "./layouts/LoginForm";
import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const { loading, dark } = useAuth();

  // const toggle = () => {
  //   setDark(!dark);
  // };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center align-middle">
        <span className="loading loading-ring loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col gp-3"
      data-theme={dark ? "dark" : "cupcake"}
    >
      <hr />
      <AppRouter />
    </div>
  );
}

export default App;
