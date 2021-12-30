import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import Quality from "./Quality";
import SelectedQuality from "./SelectedQuality";
import db from "../../../firebase";
import Learning from "./Learning";
import Skill from "./Skill";


function LearningsPopup() {
    const [{ openLearningsPopup , learnings }, dispatch] = useStateValue();

    const done = () => {
        dispatch({
            type: actionTypes.OPEN_LEARNINGS_POPUP,
            openLearningsPopup: false,
          });
    }

    const closePopup = () => {
        dispatch({
          type: actionTypes.OPEN_LEARNINGS_POPUP,
          openLearningsPopup: false,
        });
      };

    return (
        <>
         {openLearningsPopup === true && (
             <Container>
                <div className="learningsPopup">
                    <div className="learningsPopup_header">
                    <CloseIcon className="close_icon" onClick={closePopup} />
                    </div>
                    {learnings?.length > 0 && (
                        <p className = "your_learnings">Your learnings:</p>            
                    )}
                    <div className="learnings">
                        {learnings.map((learning) => (
                            <Learning learning={learning}/>
                        ))}
                    </div>
                     <p className="select_learnings">
                        Select skills you have learnt 
                     </p>
                     <div className="total_skills">
                        <Skill skill = "ReactJS"/> 
                        <Skill skill = "JavaScript"/> 
                        <Skill skill = "Django"/> 
                        <Skill skill = "Firebase"/> 
                     </div>
                     <div className="done_button">
                <button onClick = {done}>Done</button>
            </div>
                </div>
             </Container>
         )}
        </>
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

  .learningsPopup{
    background-color: #fff;
    width: 450px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px; 
  }
  
   
  .learningsPopup_header{
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    margin-right: 5px;
    font-size: 27px;
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  .your_learnings{
    margin-bottom: 7px;
  }

  .learnings{
    display: flex;
    flex-wrap: wrap;
  }

  .select_learnings{
    margin-bottom: 7px;
  }

  .total_skills{
    display: flex;
    flex-wrap: wrap;
  }

  .done_button{
      display: flex;
      justify-content: flex-end;
      margin-right : 10px;
      margin-bottom : 5px;

      button{
          border-radius : 20px;
          border : 0;
          width : 60px;
          padding : 10px;
          background-color: #00c3ff;

          &:hover {
              cursor: pointer;
              background-color : #55d5fc;
          }
      }
  }


`;

export default LearningsPopup
