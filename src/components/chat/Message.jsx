import React from 'react'
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

function Message() {
    return (
        <Container>
            <div className="message">
               <p className = "message_name">Ronak</p>
               <div className="message_message">
                   <p>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
                   </p>
               </div>
            </div>
        </Container>
    )
};

const Container  = styled.div`
     margin-right : 10px;
     margin-left : auto;
     max-width : 50%;
     margin-bottom : 20px;

     @media(max-width: 500px){
         max-width : 70%;
     }
 .message{
    display : flex;
    flex-direction : column;
 }

 .message_name{
     margin-bottom : 0px;
     font-size : x-small;
     margin-left : 5px;
     margin-bottom : 3px;
 }

 .message_message{
     background-color : #fff;
     width : fit-content;
     padding : 10px;
     border-radius : 10px;
     p{
         margin-top : 0;
         margin-bottom : 0;
         
     }
 }
`;

export default Message
