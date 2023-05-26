import React from "react";
import Swal from 'sweetalert2';
import { useNavigate, NavLink } from 'react-router-dom';

function Register() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [seller, setSeller] = React.useState("false")

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        if (email === '' || password === '' || username === '' || address === '' || phone === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Compila tutti i campi!',
                showConfirmButton: false,
                timer: 2500,
            })
            return;
        }

        e.preventDefault()
        const response = await fetch('https://school-ecommerce-api.vercel.app/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username, address, phone, seller}),
        })

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Registrazione avvenuta con successo!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Qualcosa è andato storto!',
                footer: '<a href>Perchè ho questo problema?</a>'
            })
        }

        navigate("/login");
    }

    return (
        <>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                  <div className="card mt-5">
                    <div className="card-header">
                      <h3 className="text-center">Register</h3>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="email" placeholder="Inserisci una email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">Username</label>
                          <input type="text" className="form-control" id="username" placeholder="Inserisci uno username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input type="password" className="form-control" id="password" placeholder="Inserisci una password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">Indirizzo</label>
                          <input type="text" className="form-control" id="address" placeholder="Inserisci un indirizzo" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">Telefono</label>
                          <input type="tel" className="form-control" id="phone" placeholder="Inserisci un numero di telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                        <input type="checkbox" id="seller" value={seller} onChange={(e) => setSeller(e.target.checked ? "true" : "false")} />
                        <label htmlFor="seller" className="form-label px-2">Spunta per creare un account venditore.</label>
                        </div>

                        <span>Accetto i </span>
                        <a class="link" onClick={() => {
                        Swal.fire({
                            html: `
                            <div class="text-start">
                                Termini e Condizioni:<hr>
                                <ul>
                                <li>Tutte le informazioni che verranno inviate tramite questo modulo di registrazione saranno visibili in chiaro all'interno del database.</li>
                                <br>
                                <li>NON UTILIZZARE PASSWORD CHE UTILIZZI PER ALTRI SERVIZI.</li>
                                <br>
                                <li>NON UTILIZZARE INFORMAZIONI SENSIBILI.</li>
                                <ol>
                            </div>
                            `,
                            showCloseButton: true,
                            showConfirmButton: false,
                        });
                        }}>Termini e Codizioni</a>
                        <span> sul trattamento dei dati che ho inserito.</span>
                        <hr />

                        <div className="d-grid gap-2">
                          <button type="submit" className="btn btn-primary" onClick={handleRegister}>Registrati</button>
                        </div>
                        
                      </form>
                      <div className="text-center mt-3">
                        <span>o se hai già un account </span><NavLink to="/login">Accedi</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default Register;