import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import db from "../../../firebase";
import { useStateValue } from "../../../StateProvider";



function RemoveAllCardsPopup({setOpenRemovePopup , journeyId}) {
  const[{user} , dispatch] = useStateValue();

  const remove_all_cards = (e) => {
     db.collection("journeys").doc(user?.uid).update({
         currentYear : 0,
         imagesInfo : [],
         yearOfStart : 0
     })
  }
  return (
      <Container>
          <div className="remove_all_cards">
            <div style = {{
                display: "flex",
                justifyContent: "flex-end"
            }}>
               <CloseIcon className="close_icon" onClick ={() => {
                   setOpenRemovePopup(false)
               }} /> 
            </div>
            <p>Are you sure you want to remove all cards?</p>
             <div style= {{
                    display : "flex",
                    justifyContent : "flex-end",
                    width: "100%"
                }}>
                 <button onClick ={remove_all_cards}>Remove</button>
             </div>
          </div>
      </Container>
  );
};

const Container = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  @keyframes fadeIn {
      from {
          opacity: 0
      }

      to {
          opacity: 1
      }
  }

.remove_all_cards{
    background-color: #fff;
    width: 350px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
}

button {
    width: 80px;
      padding: 7px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0044ff;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #2e66ff;
      }
}

p{
    margin-top : 0;
    margin-bottom : 20px;
}

.close_icon {
        margin-right: 5px;
        &:hover {
          color: #6d6969;
          cursor: pointer;
        }
      }
`;

export default RemoveAllCardsPopup;
