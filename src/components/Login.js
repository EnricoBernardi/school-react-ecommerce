import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from './UserContext';
import Swal from 'sweetalert2';

const Login = () => {

  const { doLogin } = useContext(UserContext);
  const [status, setStatus] = useState({ email: '', password: '' });
  
  const handleLogin = (e) => {
    if (status.email === '' || status.password === '') {
      e.preventDefault();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Inserisci email e password!',
      });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(status.email)) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Inserisci una email valida!',
              showConfirmButton: false,
              timer: 2500,
          })
          return;
     }

    e.preventDefault();
    const loginReposose = doLogin(status.email, status.password);
    if (!loginReposose) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Qualcosa è andato storto!',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12">
          <div className="card mt-5">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="craig@apple.com"
                    value={status.email}
                    onChange={(e) =>
                      setStatus({ ...status, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="********"
                    value={status.password}
                    onChange={(e) =>
                      setStatus({ ...status, password: e.target.value })
                    }
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Accedi
                  </button>
                  
                </div>
              </form>
              <div className="text-center mt-3">
                <span>o se non hai un account </span><NavLink to="/register">Registrati</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
