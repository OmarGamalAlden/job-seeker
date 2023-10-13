import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      {/* static commponent */}
      <Navbar />
      {/* dynamic commponent */}
      <div className="main-container">
        <Outlet></Outlet>
      </div>
    </>
  );
}
