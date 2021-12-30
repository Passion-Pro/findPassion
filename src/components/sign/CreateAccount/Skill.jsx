import React from 'react'
import styled from "styled-components";
import {useStateValue} from "../../../StateProvider"
import {actionTypes} from "../../../reducer"

function Skill({skill}) {
    const[{learnings} , dispatch] = useStateValue();
    
    const addLearning = () => {
    let x = 0;
     for(let i = 0; i < learnings.length; i++) {
         if(learnings[i] === skill) {
             x = 1;
         }
     }
     if(x === 0) {
        dispatch({
            type : actionTypes.ADD_LEARNING,
            learning : skill
        })
     }
    }
    return (
        <Container onClick = {addLearning}>
            {skill}
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

export default Skill
