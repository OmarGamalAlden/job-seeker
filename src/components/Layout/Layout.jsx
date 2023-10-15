import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({ user, setUser }) {
  // handel logout case
  let navigate = useNavigate();
  function logOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <>
      {/* static commponent */}
      <Navbar logOut={logOut} user={user} />
      {/* dynamic commponent */}
      <div className="main-container">
        <Outlet></Outlet>
      </div>
    </>
  );
}
