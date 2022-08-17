import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const AuthRoute = () => {
  // Gets the login status from the local storage
  const isLoggedIn = JSON.parse(localStorage.getItem("is_logged_in") as string);

  /* Returns the child elements if the user is logged in
   * else navigate to the login page
   */
  return isLoggedIn ? (
    <div>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthRoute;
