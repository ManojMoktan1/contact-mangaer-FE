import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/contacts">
          CM
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/contacts">
            List Contacts
          </Link>
          <Link className="nav-link" to="/contacts/add">
            Add Contact
          </Link>
          <button
            className="nav-link-logout"
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.setItem("is_logged_in", "false");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
