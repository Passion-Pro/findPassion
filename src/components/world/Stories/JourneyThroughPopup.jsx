import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import {useHistory} from "react-router-dom";

function JourneyThroughPopup({setOpenJourneyPopup}) {
  const history = useHistory();
  return (
 <Container>
     <div className="journeyThrough">
        <div className="journeyThrough_header">
        <CloseIcon className="close_icon" onClick={() => {
            setOpenJourneyPopup(false);
        }} />
        </div>
        <div className="journey_options">
            <button onClick={(e) => history.push(`/addJourney/photos`)}>Show Journey through photos and words</button>
            <button onClick={(e) => history.push(`/addJourney/words`)}>Show Journey through words</button>
            <button onClick={(e) => history.push(`/addJourney/video`)}>Show Journey through video</button>
        </div>
     </div>
 </Container>
  )
};

const Container  = styled.div`
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
  
  .journeyThrough{
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .journeyThrough_header{
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    font-size: 18px !important;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;

    &:hover {
      cursor: pointer;
      color: #555454;
    }
  }

  .journey_options{
      display : flex;
      flex-direction: column;
      padding-top : 10px;

      button{
        margin-bottom : 10px;
        background-color : #fff;
        border-radius : 8px;
        padding-top : 10px;
        padding-bottom : 10px;
        border : 1px solid gray;

        &:hover {
            cursor : pointer;
            background-color : #363636;
            color : white;
        }
      }
  }

`;

export default JourneyThroughPopup;
