import React from 'react'
import styled from "styled-components";
import {useStateValue} from "../../../StateProvider"
import {actionTypes} from "../../../reducer"

function Quality({quality}) {
    const[{selectedQualities} , dispatch] = useStateValue();
    
    const addQuality = () => {
    let x = 0;
     for(let i = 0; i < selectedQualities.length; i++) {
         if(selectedQualities[i] === quality) {
             x = 1;
         }
     }
     if(x === 0) {
        dispatch({
            type : actionTypes.ADD_QUALITY,
            quality : quality
        })
     }
    }
    return (
        <Container onClick = {addQuality}>
            {quality}
        </Container>
    )
};

const Container  = styled.div`
 background-color: #65a4f7;
 width : fit-content;
 padding : 2px;
 padding-right : 15px;
 padding-left : 15px;
 border-radius : 20px;
 padding-bottom : 5px;
 margin-right : 5px;
 margin-bottom : 5px;
 
 &:hover {
     cursor : pointer;
     background-color : #96c0f7;
 }

 
`;

export default Quality
