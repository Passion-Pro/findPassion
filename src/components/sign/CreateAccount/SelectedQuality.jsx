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
        <Container
        style = {{
            backgroundColor : quality?.data?.color
        }}
        >
          <p>{quality?.data?.name}</p>
          <CancelIcon className="close_icon" onClick={removeQuality}/>
        </Container>
    )
}

const Container  = styled.div`
 width : fit-content;
 padding : 7px;
 padding-right : 0px;
 padding-left : 15px;
 border-radius : 20px;
 display : flex;
 margin-right : 7px;
 margin-bottom : 7px;
 padding-bottom : 5px;

 p{
     margin : 0;
     padding : 0;
     font-size : 15px;
     margin-bottom : 7px;
 }

 

 .close_icon{
     font-size : 21px !important;
     margin-top : 1px;
     margin-bottom : auto;
     margin-left : 5px;
     &:hover {
         cursor: pointer;
     }
 }

 
`;

export default SelectedQuality
