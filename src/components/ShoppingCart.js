import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import ClimbingBoxLoader from "react-spinners/ClipLoader";

import '../App.css'


function ShoppingCart() {

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getShoppingCart();
      }, []);

    const getShoppingCart = async () => {      
        const url = new URL('https://school-ecommerce-api.vercel.app/shopping-cart');
        url.searchParams.append('email', sessionStorage.getItem("email"));
        url.searchParams.append('password', sessionStorage.getItem("password"));
      
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      };

    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            total += parseFloat(item.price);
        });
        setTotal(total.toFixed(2));
    };
      
    useEffect  (() => {
        calculateTotal();
    }, [items]);

/*     const groupedItems = items.reduce((acc, item) => {
    if (acc[item.title]) {
        acc[item.title].quantity += 1;
    } else {
        acc[item.title] = {
            ...item,
            quantity: 1,
        };
    }
    return acc;
}, {}); */

const handleRemoveItem = async (productId) => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    const response = await fetch('https://school-ecommerce-api.vercel.app/shopping-cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, productId}),
    })

    const data = await response.json()

    await new Promise(r => setTimeout(r, 2000));

    if (response.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Prodotto rimosso dal Carello!',
            showConfirmButton: false,
            timer: 800,
        }).then(() => {
            window.location.reload();
          });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Qualcosa è andato storto!',
            timer: 800,
        })
    }
}

const [checkoutClicked, setCheckoutClicked] = useState(false);

const handleCheckout = async () => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    if (total == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Il tuo carrello è vuoto!',
        })
        return;
    }

    const response = await fetch('https://school-ecommerce-api.vercel.app/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
    })

    const data = await response.json()

    if (response.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'Pagamento di €' + total + ' effettuato!',
            text: 'La tua spedizione sarà consegnata entro domani.',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
        }).then(() => {
            window.location.reload();
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Qualcosa è andato storto!',
            timer: 800,
        })
    }
}

const [discount, useDiscount] = useState(false);

const applyDiscount = (discountCode) => {
    if (discountCode == "AAPPLE" && total > 0) {
        setTotal(total  - 100);
    }
    return;
}

return (
    <>
        <div class="eb-bg-default">
            <div class="container py-5">
                <div class="row">
                    <div class="col-10">
                        <h1 class="display-5 fw-bold">Il tuo carrello</h1>
                        {items.length === 0 && (
                            <div class="">
                                <p>Il carrello è vuoto. I prodotti che aggiungerai al carrello saranno visualizzati qui.</p>
                            </div>
                        )}
                        <ul class="list-group list-group">
                            {Object.values(items).map((item) => (
                                <li class="list-group-item d-flex justify-content-between align-items-start p-3">
                                <div class="row w-100 justify-content-start align-items-center">
                                    <div class="col-2">
                                        {/* <span class="badge bg-primary m-">x{item.quantity}</span> */}
                                        <img src={item.pictures} class="img-fluid px-1" alt="..." style={{ width: "100px" }} />
                                    </div>
                                    <div class="col-8">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold px-3">{item.title}</div>
                                        </div>
                                    </div>
                                    <div class="col-2 d-flex justify-content-end align-items-center">
                                        <span class="badge bg-primary m-2">€ {item.price}</span>
                                        <button class="btn btn-outline-danger" onClick={() => handleRemoveItem(item._id)}><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </li>
                            
                            
                            ))}
                        </ul>
                    </div>
                    <div class="col-lg-2 vh-100 d-flex rounded bg-white justify-content-center">
                        <div class="py-2">
                            <h4>Il tuo totale è di: €{total}</h4>
                            <div class="py-3">
                            <label htmlFor="email" className="form-label">
                                Hai un codice sconto?
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Inseriscilo qui.."
                                onChange={(e) =>
                                    applyDiscount(e.target.value)
                                  }
                            />
                            </div>
                            <button class="btn btn-primary" onClick={() => handleCheckout()}>Checkout</button>
                            <p>Consegna garantita entro <span class="text-success">domani.</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default ShoppingCart;