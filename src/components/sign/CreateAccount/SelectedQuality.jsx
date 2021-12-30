import React from 'react'
import styled from "styled-components";
import {useStateValue} from "../../../StateProvider"
import {actionTypes} from "../../../reducer"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';


function SelectedQuality({quality}) {
    const[{selectedQualities} , dispatch] = useStateValue();
    

    const removeQuality = () => {
        dispatch({
            type: actionTypes.REMOVE_QUALITY,
            quality: quality 
        })
    }
    return (
        <Container>
          <p>{quality}</p>
          <CancelIcon className="close_icon" onClick={removeQuality}/>
        </Container>
    )
}

const Container  = styled.div`
 background-color: #65a4f7;
 width : fit-content;
 padding : 2px;
 padding-right : 0px;
 padding-left : 15px;
 border-radius : 20px;
 display : flex;
 margin-right : 5px;
 margin-bottom : 5px;
 padding-bottom : 5px;

 p{
     margin : 0;
     padding : 0;
     font-size : 15px;
 }

 &:hover {
     background-color : #96c0f7;
 }

 .close_icon{
     font-size : 18px !important;
     margin-top : auto;
     margin-bottom : auto;
     margin-left : 10px;
     &:hover {
         cursor: pointer;
     }
 }

 
`;

export default SelectedQuality
