import React from "react";
import { useState , useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory
  } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import DeckList from "./DeckList";



  function Home() {

    const history = useHistory()

    const [decks, setDecks] = useState([]);

    const abortController = new AbortController();
    const signal = abortController.signal;

//useEffect to get decks from API
    useEffect(() => {
      setDecks([])
      async function grabDecks() {  
        try {
          const allDecks = await listDecks(signal);
          //console.log(allDecks)
          if (allDecks.length > 0) setDecks(allDecks)
        } catch (error) {console.log(error)}
}
        grabDecks();
        return () => abortController.abort()
    }, [])

//create deleteHandler with modal that pops up confirming delete
async function deleteHandler(id, signal) {
        if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
           try {
            await deleteDeck(id, signal);
            history.push("/")
          } catch (error) {console.log(error)}
          }
        }
        


    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            <DeckList decks={decks} deleteHandler={deleteHandler} />
        </div>
    )

  }


  export default Home