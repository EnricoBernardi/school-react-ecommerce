import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import '../App.css';

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getItems = async () => {
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");

      const response = await fetch('https://school-ecommerce-api.vercel.app/shopping-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setItems(data);
    };
    getItems();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item.price);
    });
    setTotal(total.toFixed(2));
  };

  const groupedItems = items.reduce((acc, item) => {
    if (acc[item.title]) {
      acc[item.title].quantity += 1;
    } else {
      acc[item.title] = {
        ...item,
        quantity: 1,
      };
    }
    return acc;
  }, {});

  const handleRemoveItem = async (productId) => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    const response = await fetch('https://school-ecommerce-api.vercel.app/shopping-cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, productId }),
    });

    const data = await response.json();

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
      });
    }
  };

  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const handleCheckout = async () => {
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");

    if (total == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Il tuo carrello è vuoto!',
      });
      return;
    }

    const response = await fetch('https://school-ecommerce-api.vercel.app/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

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
      });
    }
  };

  return (
    <>
      <div className="eb-bg-default">
        <div className="container py-5">
          <div className="row">
            <div className="col-10">
              <h1 className="display-5 fw-bold">Il tuo carrello</h1>
              {items.length === 0 ? (
                <div className="">
                  <p>Il carrello è vuoto. I prodotti che aggiungerai al carrello saranno visualizzati qui.</p>
                </div>
              ) : (
                <ul className="list-group list-group">
                  {Object.values(groupedItems).map((item) => (
                    <li className="list-group-item d-flex justify-content-between align-items-start p-3">
                      <div className="row w-100 justify-content-start align-items-center">
                        <div className="col-2">
                          <span className="badge bg-primary m-">x{item.quantity}</span>
                          <img src={item.pictures} className="img-fluid px-1" alt="..." style={{ width: "100px" }} />
                        </div>
                        <div className="col-8">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold px-3">{item.title}</div>
                          </div>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-center">
                          <span className="badge bg-primary m-2">€ {item.price}</span>
                          <button className="btn btn-outline-danger" onClick={() => handleRemoveItem(item._id)}><i className="bi bi-trash"></i></button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-lg-2 vh-100 d-flex rounded bg-white justify-content-center">
              <div className="py-2">
                <h4>Il tuo totale è di: €{total}</h4>
                <button className="btn btn-primary" onClick={() => handleCheckout()}>Checkout</button>
                <p>Consegna garantita entro <span className="text-success">domani.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
