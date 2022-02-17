import React from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";

function PassionName({name}) {
    const[{} , dispatch] = useStateValue();
    const set_passion = () => {
        dispatch({
            type : actionTypes.SET_PASSION,
            passion : name
        })

        dispatch({
            type : actionTypes.OPEN_PASSION_POPUP,
            passionPopup : false
        })
    }
    return (
        <Container onClick = {set_passion}>
           <p>{name}</p>
        </Container>
    )
}

const Container = styled.div`
  border : 1px solid lightgray;
  margin-bottom : 10px;
  border-radius :20px;
  background-color: white;
  padding-left : 10px;
  p{
      margin-top : 0;
      margin-bottom : 5px;
      padding : 5px;
  }

  &:hover {
      background-color : #ebebeb;
      cursor: pointer;
  }
`;


export default PassionName
