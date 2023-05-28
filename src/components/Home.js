import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import '../App.css'
import BeatLoader from "react-spinners/BeatLoader";

import Swal from 'sweetalert2';

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('https://school-ecommerce-api.vercel.app/products', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            setProducts(data);
        };
        getProducts();
    }, [])

    const handleAddToCart = async (productId) => {
        const email = sessionStorage.getItem("email");
        const password = sessionStorage.getItem("password");

        const response = await fetch('https://school-ecommerce-api.vercel.app/shopping-cart-add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, productId }),
        });

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Prodotto aggiunto al Carello!',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Qualcosa è andato storto!',
                timer: 1000
            })
        }
    }

    return (
        <>
        {products.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <BeatLoader color={"#ffc107"} loading={true} size={50} />
            </div>
        ) : (
            <>
            <div class="container py-5">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {products.map(product => (
                    <div class="col">
                        <button class="eb-button-card h-100 d-flex flex-column align-items-start border-0" onClick={() => {
                        Swal.fire({
                            html: (`
                                <div class="text-start">
                                    <p class="fs-4 mb-2">${product.title}</p>
                                    <hr />
                                    <img src=${product.pictures} class="img-fluid mb-3 p-3" alt="..." />
                                    <hr />
                                    <p class="fs-6 mb-2"><strong>Prezzo:</strong> € ${product.price}</p>
                                    <p class="fs-6 mb-2"><strong>Descrizione:</strong> ${product.description}</p>
                                    <p class="fs-6 mb-2"><strong>Consegna</strong> garantita senza costi aggiuntivi entro <small class="text-success fw-bold">domani</small>.</p>
                                </div>
                            `),
                            showCloseButton: true,
                            showConfirmButton: false,
                        });
                        }}>
                        <div class="card p-2 bg-body rounded h-100">
                            <div class="d-flex justify-content-center align-items-center" style={{ height: "250px", padding: "20px" }}>
                            <img src={product.pictures} class="img-fluid" alt="..." />
                            </div>
                            <div class="card-body text-sm-start d-flex flex-column justify-content-start">
                            <h5 class="card-title">{product.title}</h5>
                            <hr />
                            <h4 class="card-text text-muted">€ {product.price}</h4>
                            <p class="fs-6 lh-1">Consegna garantita senza costi aggiuntivi entro <small class="text-success fw-bold">domani</small>.</p>
                            </div>
                            <button  class="btn btn-success text-light" onClick={(event) => {
                                event.stopPropagation();
                                handleAddToCart(product._id);
                            }}> Aggiungi al Carello</button>
                        </div>
                        </button>
                    </div>
                    ))}
                </div>
            </div>
        </>
        )}
        </>
    );
}

export default Home;