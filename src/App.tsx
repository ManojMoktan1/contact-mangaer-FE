import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Contact from './components/Contact/Contact';
import axios, { AxiosRequestConfig } from 'axios';
import { createInterceptors } from './utils/interceptor';
import ListContacts from './pages/ListContacts';
import NavBar from './components/NavBar/NavBar';

function App() {
  createInterceptors();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contacts' element={<NavBar />} >
          <Route index element={<ListContacts />} />
          <Route path='/contacts/add' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
