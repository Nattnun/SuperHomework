import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const [input, setInput] = useState({
    code: "",
    password: "",
  });

  const { setUser } = useAuth();

  const handleChangeInput = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let codeFor = input.code.toLowerCase().startsWith("t")
        ? "t_code"
        : "s_code";
      const output = {
        [codeFor]: input.code,
        password: input.password,
      };
      console.log(output);
      const response = await axios.post(
        "http://localhost:9999/auth/login",
        output
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      const rs1 = await axios.get("http://localhost:9999/auth/me", {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });
      setUser(rs1.data.user);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">let's login</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">your Code</span>
              </label>
              <input
                type="text"
                placeholder="your code"
                className="input input-bordered"
                required
                name="code"
                value={input.code}
                onChange={handleChangeInput}
                // pattern="/^[st]\d{3}$/"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                name="password"
                value={input.password}
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
