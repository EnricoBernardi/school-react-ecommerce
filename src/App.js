import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import NewProduct from './components/NewProduct';
import ShoppingCart from './components/ShoppingCart';
import Login from './components/Login'

import { UserProvider } from './components/UserContext';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  const [seller, setSeller] = useState(sessionStorage.getItem("seller"));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(sessionStorage.getItem("loggedIn"));
      setSeller(sessionStorage.getItem("seller"));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/new-product' element={seller && loggedIn ? <NewProduct /> : <>Non sei loggato o non sei un venditore.</>} />
          <Route path='/shopping-cart' element={loggedIn ? <ShoppingCart /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
