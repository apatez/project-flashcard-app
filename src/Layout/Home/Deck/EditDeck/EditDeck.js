import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import DeckForm from "../DeckForm";

function EditDeck() {
  const initialValue = {
    name: "",
    description: "",
    cards: [],
  };

  const { deckId } = useParams();
  const [deck, setDeck] = useState(initialValue);
  const abortController = new AbortController();

  const initialState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialState });

  const initialStateRender = {
    name: `${deck.name}`,
    description: `${deck.description}`,
  };

  useEffect(() => {
    setDeck(initialValue);

    async function currentDeck(id) {
      try {
        const current = await readDeck(id, abortController.signal);
        setDeck({ ...current });
        setFormData({ ...current });
      } catch (error) {
        console.log(error);
      }
    }

    //getting and returning the deck fine but having issues setting state
    currentDeck(deckId);
    return () => abortController.abort();
  }, [deckId]);

  function changeHandler({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const history = useHistory();

  async function handleSubmit(event) {
    console.log(deck);
    event.preventDefault();
    const updatedDeck = {
      ...deck,
      name: formData.name,
      description: formData.description,
    };
    await updateDeck(updatedDeck, abortController.signal);
    history.go(0);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">
            <p>Edit Deck</p>
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <DeckForm
        deckId={deckId}
        handleSubmit={handleSubmit}
        formData={formData}
        changeHandler={changeHandler}
      />
    </div>
  );
}

export default EditDeck;
