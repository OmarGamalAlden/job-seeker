import React from "react";
import mainlogo from "../../images/logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ user, logOut }) {
  return (
    <>
      <nav className="top_navbar d-flex align-items-center justify-content-between px-5">
        <div className="left_nav d-flex align-items-center">
          <Link to="/">
            <img src={mainlogo} alt="website logo" />
          </Link>
          <span className="fs-5">JOB SEEKER</span>
        </div>
        <div className="right_nav">
          <ul className="list-unstyled d-flex align-items-center m-0">
            {user ? (
              <>
                <li className="mx-2">
                  <Link to="/home">Home</Link>
                </li>
                <li className="mx-2">
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={logOut} className="mx-2">
                  <span>Logout</span>
                </li>
              </>
            ) : (
              <>
                <li className="mx-2">
                  <Link to="/">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
