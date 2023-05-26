import React from "react";
import '../css/navbar.css'
import logo from'../pictures/EB-Shop_logo.png'

import { Route, BrowserRouter, NavLink, Routes, Outlet } from 'react-router-dom';
import { useContext } from "react";

import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';



function Navbar() {

    const data = useContext(UserContext);

    return (
        <>
            <div className="eb-navbar row py-3">
                
                <div className="col align-self-center px-5">
                    <NavLink to="/"><img className="img-fluid" src={logo} width="70px"/></NavLink>
                </div>

                <div className="col-7 align-self-center">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control" placeholder="Cerca su EBstore.com" aria-label="text" aria-describedby="basic-addon1" />
                        </div>
                </div>

                <div className="col align-self-center px-md-5">

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <NavLink to="/shopping-cart" className="btn btn-outline-secondary text-light" type="button"><i className="bi bi-bag"></i></NavLink>
                            <button className="btn btn-outline-secondary text-warning" type="button"><i className="bi bi-star"></i></button>
                        
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        {sessionStorage.getItem("loggedIn") === "true" ? <a className="dropdown-item"><i class="bi bi-person-circle m-1"></i> Ciao, {sessionStorage.username}</a> : <NavLink to="/login" className="dropdown-item">Accedi</NavLink>}
                                    </li>
                                    
                                    <>{sessionStorage.getItem("seller") === "true" ? <><li><hr class="dropdown-divider" /></li><NavLink to="/new-product" className="dropdown-item"><i class="bi bi-plus-square m-1"></i> Inserisci Prodotto</NavLink></> : <></>} </>
                                    <>{sessionStorage.getItem("loggedIn") === "true" ? <><li><hr class="dropdown-divider" /></li><a className="dropdown-item" onClick={data.doLogout}><i class="bi bi-box-arrow-right m-1"></i> Logout</a></> : <></>}</>

                                </ul>
                            </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Navbar;