import React from 'react'
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from '../../../reducer';
import { useStateValue } from '../../../StateProvider';



function StartLearningPopup({setStartNewPopup}) {
const[{} , dispatch] = useStateValue();
  return (
    <Container>
         <div className="start_learning_popup">
           <div style = {{
                display: "flex",
                justifyContent: "flex-end"
            }}>
               <CloseIcon className = "close_icon"
                 onClick = {() => {
                     setStartNewPopup(false)
                 }}
               />
           </div>
           <div className="learning_popup_text">
               <p>Start learning something new with your friends</p>
           </div>
           <div style = {{
               display : 'flex',
               justifyContent : 'flex-end'
           }}>
               <button onClick = {() => {
                   dispatch({
                       type : actionTypes.OPEN_NEW_LEARNING_POPUP,
                       openNewLearningPopup : true
                   })
                   setStartNewPopup(false);
               }}>Start Now</button>
           </div>
         </div>
    </Container>
  )
}


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
  animation: fadeIn 1s;

  
  @keyframes fadeIn {
      from {
          opacity: 0
      }

      to {
          opacity: 1
      }
  }

  .start_learning_popup{
    background-color: #fff;
    width: 350px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(197, 111, 111, 0.24);
    padding: 10px;

    p{
        margin-top : 10px;
        margin-bottom : 10px;
        font-size : 18px;
    }
  }

  .close_icon {
        margin-right: 5px;
        &:hover {
          color: #6d6969;
          cursor: pointer;
        }
    }


  button{
    border : 0;
    border-radius : 20px;
    padding : 10px;
    background-color: #0044ff;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #2e66ff;
      }
  }

  


`;

export default StartLearningPopup
