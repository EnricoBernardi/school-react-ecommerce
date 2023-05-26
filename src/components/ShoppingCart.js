import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

import '../App.css'


function ShoppingCart() {

    const [items, setItems] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        // Ottieni l'email e la password dal session storage
        const email = sessionStorage.getItem('email');
        const password = sessionStorage.getItem('password');
  
        // Codifica l'email e la password per l'URL
        const encodedEmail = encodeURIComponent(email);
        const encodedPassword = encodeURIComponent(password);
  
        // Costruisci l'URL con email e password codificate
        const url = `https://school-ecommerce-api.vercel.app/shopping-cart?email=${encodedEmail}&password=${encodedPassword}`;
  
        try {
          // Effettua la chiamata all'API
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            // Aggiorna l'array items con i dati ottenuti
            setItems(data.items);
          } else {
            console.log('Errore nella richiesta');
          }
        } catch (error) {
          console.log('Errore durante la chiamata all\'API:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {/* Mostra gli elementi nell'array items */}
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  };

export default ShoppingCart;