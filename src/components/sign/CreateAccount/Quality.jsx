import React from 'react'
import styled from "styled-components";
import {useStateValue} from "../../../StateProvider"
import {actionTypes} from "../../../reducer"

function Quality({quality , from}) {
    const[{selectedQualities} , dispatch] = useStateValue();
    
    const addQuality = () => {
    let x = 0;
     for(let i = 0; i < selectedQualities.length; i++) {
         if(selectedQualities[i] === quality) {
             x = 1;
         }
     }
     if(x === 0) {
        if(selectedQualities.length <3){
            dispatch({
                type : actionTypes.ADD_QUALITY,
                quality : quality
            })
        }else{
            alert("You have already selected 3 qualities")
        }
     }
    }

    return (
        <Container onClick = {addQuality}
         style = {{
             backgroundColor : quality?.data?.color,
             fontSize : from === "profileCard" && '14px'
         }}
        >
           {quality?.data?.name}
          
        </Container>
    )
};

const Container  = styled.div`
 width : fit-content;
 padding : 7px;
 padding-right : 15px;
 padding-left : 15px;
 border-radius : 20px;
 padding-bottom : 10px !important;
 margin-right : 5px;
 margin-bottom : 7px;
 color : white;
 
 &:hover {
     cursor : pointer;
 }

 
`;

export default Quality
