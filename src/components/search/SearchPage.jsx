import React, { useEffect } from "react";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import SearchBody from "./SearchBody";
import SearchBodyRightBox from "./SearchBodyRightBox";

function SearchPage() {

  const [{}, dispatch] = useStateValue()

  useEffect(()=>{
      dispatch({
        type: actionTypes.SET_PATHNAMEF,
        pathnamef: "/searchPage",
      });
  },[])

  return (
    <div
      style={{
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        width: "100vw",
        paddingTop: "12px",
        backgroundColor: "#f1f6fa",
        height: "88vh",
      }}
    >
      <div style={{ display: "flex", maxWidth: "1300px", width: "94vw" }}>
        <SearchBody />
      </div>
    </div>
  );
}

export default SearchPage;
