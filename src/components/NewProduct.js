import { useState } from 'react'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

function NewProduct() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [pictures, setPictures] = useState([])

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const product = { title, description, price, pictures };
    console.log(product)
    const response = await fetch('https://school-ecommerce-api.vercel.app/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })

    const data = await response.json()
        console.log(data)

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Prodotto Aggiunto!',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
              });
              navigate('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Qualcosa è andato storto, riprova!',
              });
        }
    }
    
	return (
		<>
			
			<form className="container py-5" action="">
            <h1>Add a new product </h1>

                <div className="row py-5">
                    <div className="col-4">

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="MacBookPro 2021" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="The most powerful Apple laptop.." rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>

                            <div className="input-group mb-3">
                                <span className="input-group-text">€</span>
                                <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="2069.99" min="0.25" max="1000000" list="priceSuggestions" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <datalist id="priceSuggestions">
                                    <option value="9.99"></option>
                                    <option value="25.99"></option>
                                    <option value="49.99"></option>
                                    <option value="99.99"></option>
                                    <option value="199.99"></option>
                                </datalist>
                            </div>
                            
                        </div>
                        <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3" onClick={handleOnSubmit}>Aggiungi Prodotto</button>
                </div>
                    </div>

                    <div className="col-3">

                    </div>

                    <div className="col-5">
                        <label className="form-label">Upload pictures</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="https://www.example.com/picture1.jpg, https://www.example.com/picture2.jpg" onChange={(e) => setPictures(e.target.value)} />
                    </div>
                </div>

                
			</form>

		</>
	);
}

export default NewProduct;
