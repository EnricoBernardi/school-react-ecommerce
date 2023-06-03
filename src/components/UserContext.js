import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {

  const navigate = useNavigate();
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);

  const [status, setStatus] = useState({
    email: '',
    password: '',
    username: '',
    seller: '',
    loggedIn: true,
    lastError: '',
  });

  const initialContext = {
    email: 'test',
    password: '',
    username: '',
    seller: '',
    loggedIn: false,
    lastError: '',
    doLogin: async (email, password) => {
      try {
        const response = await fetch('https://school-ecommerce-api.vercel.app/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
                
        const data = await response.json();

        if (response.status === 200) {
          const updatedStatus = {
            email: data.email,
            password: data.password,
            username: data.username,
            seller: data.seller,
            loggedIn: true,
            lastError: '',
          };
          setStatus(updatedStatus);
          const { email, password, username, seller, loggedIn } = updatedStatus;
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("seller", seller);
          sessionStorage.setItem("loggedIn", loggedIn);
          navigate("/");
          return true;
        } else if (response.status === 401) {
          setStatus((s) => ({
            ...s,
            lastError: 'Login failed',
          }));
          return false;
        }

        window.location.reload();
      } catch (error) {
        setStatus((s) => ({
          ...initialContext,
          lastError: 'An error occurred during login',
        }));
        return false;
      }
    },

    doLogout: () => {
      setStatus(initialContext);
      sessionStorage.clear();
      navigate("/login");
      window.location.reload();
    },
  };

  return (
    <UserContext.Provider value={{ ...initialContext, ...status }}>
      {children}
    </UserContext.Provider>
  )

};

export { UserContext, UserProvider };