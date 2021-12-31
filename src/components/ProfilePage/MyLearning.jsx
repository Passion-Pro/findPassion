import React from 'react'
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";


function MyLearning() {
    return (
        <Container>
            <p className = "myLearning_learning">Learning Node Js</p>
            <p className="myLearning_started">
                Started on 8th November 2021
            </p>
            <div className="join_button">
                <button>Join</button>
            </div>

        </Container>
    )
};

const Container  = styled.div`
  display : flex;
  flex-direction : column;
  border : 1px solid lightgray;
  padding : 10px;
  border-radius : 10px;
  box-shadow : 0 0 15px rgba(0, 0, 0, 0.24);
  width : 70%;
  margin-bottom : 20px;

  @media(max-width: 600px){
      width : 80vw;
      margin-left : auto;
      margin-right : auto;
  }
 
 .myLearning_learning{
    margin-top : 0;
          margin-bottom : 10px;
          font-size : 22px;
          font-family : "Helvetica Neue";
          font-weight : 500;
 }

 .myLearning_started{
     margin-top : 0;
     margin-bottom : 0;
     font-style : italic;
 }

 .join_button{
    display : flex;
    justify-content : flex-end;
    margin-right : 5px;
    margin-bottom : 2px;
    @media(max-width : 400px) {
      margin-top : 10px;
    }
    
    button{
        width : 60px;
        padding : 7px;
        border : 0;
        border-radius : 20px;
        background-color : #0044ff;
        color : white;

        &:hover {
            cursor : pointer;
            background-color : #2e66ff
        }

    }
}




`;

export default MyLearning
