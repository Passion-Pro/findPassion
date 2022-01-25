import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";

function PartnerCard() {
  const [{ openStoryPopup, startJourney, journey, userInfo, user }, dispatch] =
    useStateValue();
  return (
    <Container>
      <div className="partner_info"
       style = {{
        backgroundImage: `url(${userInfo?.profilePhotoUrl})`, 
       }}
      >
        <p>Ronak</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 160px;
  margin-right : 20px;
  margin-bottom : 20px;

  .partner_info{
  height: 150px;
  border: 1px solid gray;
  border-radius: 10px;
   background-position : center;
   background-repeat : no-repeat;
   background-size : cover;
   display : flex;
   justify-content : flex-end;
   flex-direction : column;
   background-color : black;

   &:hover {
    cursor : pointer;
    border : 1px solid white;
    border-radius: 10px;
  }
 

   p{
     color : white;
     margin-top : 0;
     margin-bottom : 5px;
     text-align : center;
     font-size : 16px;
   }
  }
`;

export default PartnerCard;
