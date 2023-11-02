import React from "react";
import { Link , useHistory} from "react-router-dom";
import { useState } from "react";
import { createDeck } from "../../../utils/api";
import DeckForm from "../Deck/DeckForm";



function CreateDeck() {

  const { signal } = new AbortController();

   const initialState = {
    name: "",
    description: "",
   };

   const [formData, setFormData] = useState({...initialState});
   const history = useHistory()

   function changeHandler({ target }) {
    setFormData({
        ...formData,
        [target.name]: target.value,
    })

   }

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(formData, signal);
    history.push("/");
   }

   

   return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">      
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>  
                <li className="breadcrumb-item active">Create Deck</li>          
             </ol>
        </nav>
        <h2>Create Deck</h2>
        <DeckForm handleSubmit={handleSubmit} formData={formData} changeHandler={changeHandler} />
    </div>
   )
}

export default CreateDeck