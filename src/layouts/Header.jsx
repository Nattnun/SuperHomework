import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

const guestNav = [
  { to: "/login", text: "Login" },
  { to: "/register", text: "Register" },
];

const teacherNav = [
  { to: "/", text: "Home(T)" },
  { to: "/new", text: "New Homework" },
];

const studentNav = [
  { to: "/", text: "Home(S)" },
  { to: "/profile", text: "Profile" },
];

export default function Header() {
  const { user, logout, dark, setDark } = useAuth();
  const navigate = useNavigate();
  //   const [finalNav, setFinalNav] = useState([]);

  //   useEffect(() => {
  //     setFinalNav(
  //       !user?.role
  //         ? guestNav
  //         : user?.role === "teacher"
  //         ? teacherNav
  //         : studentNav
  //     );
  //   }, [user?.role]);
  const finalNav = !user?.role
    ? guestNav
    : user.role === "teacher"
    ? teacherNav
    : studentNav;

  const hdlLogout = () => {
    logout();
    alert("Logout OK");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Hi,{user?.firstname}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.role && (
            <li>
              <Link to="#" onClick={hdlLogout}>
                Logout
              </Link>
            </li>
          )}
          <li className="flex flex-col justify-center">
            {" "}
            <input
              type="checkbox"
              className="toggle"
              // onClick={toggle}
              checked={dark}
              onChange={(e) => {
                setDark(e.target.checked);
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
