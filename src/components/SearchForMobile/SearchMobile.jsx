import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import SearchBody from "../search/SearchBody";

function SearchMobile() {
    const [{ }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (input) {
      dispatch({
        type: actionTypes.SET_SEARCH_INPUT,
        searchInput: input,
      });
    }
  }, [input]);
  return (
    <>
      <input
        placeholder="Search"
        className="searchHeader__input"
        onChange={(e) => setInput(e.target.value)}
        style={{margin:'1vh 4vw',width:'92vw'}}
      />
      <br />
      <SearchBody />
    </>
  );
}

export default SearchMobile;
