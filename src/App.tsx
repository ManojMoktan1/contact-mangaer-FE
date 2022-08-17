import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Contact from "./components/Contact/Contact";
import { createInterceptors } from "./utils/interceptor";
import ListContacts from "./pages/ListContacts";
import ContactUpdate from "./components/Contact/ContactUpdate";
import AuthRoute from "./AuthRoute/AuthRoute";
import { useDispatch } from "react-redux";
import { setIsUserLoggedIn } from "./components/reducers/authReducer";

function App() {
  const dispatch = useDispatch();
  dispatch(setIsUserLoggedIn(localStorage.getItem("is_logged_in")));
  createInterceptors();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<AuthRoute />}>
          <Route path="/contacts" element={<ListContacts />} />
          <Route path="/contacts/add" element={<Contact />} />
          <Route path="/contacts/update/:id" element={<ContactUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
