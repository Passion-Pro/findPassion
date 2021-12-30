import React from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import {useHistory} from "react-router-dom"

function Learning() {

    const history = useHistory()

    return (
       <Container>
           <div className="learning_header">
             <Avatar src="https://bsmedia.business-standard.com/_media/bs/img/article/2018-03/22/full/1521664011-0145.jpg" className="avatar"/>
             <p>Nishant</p>
           </div>
           <div className="learning">
               <p>Learning Node JS</p>
           </div>
           <div className="started_date">
             <p>Started on 8th November 2021</p>
           </div>
            <div className="number_of_students">
                <p>🔥 110 students</p>
            </div>
            <div className="join_button">
                <button onClick = {e => history.push("/learningGroup")}>Join</button>
            </div>
       </Container>
    )
};

const Container = styled.div`
display : flex;
flex-direction : column;
width : 200px;
height : fit-content;
border : 1px solid lightgray;
border-radius : 10px;
padding : 10px;
box-shadow : 0 0 15px rgba(0, 0, 0, 0.24);
margin-right : 30px;
margin-bottom : 30px;

@media(max-width: 500px){
    width : 95vw;
    margin-right : auto;
    margin-left : auto;
}

.learning_header{
    display : flex;

    .avatar{
       width : 25px;
       height : 25px; 
    }

    p{
        margin-top : auto;
        margin-bottom : auto;
        margin-left : 5px;
        font-size : 14px;
        
    }
}

.learning{
    p{
        margin-top : 10px;
        margin-left : 5px;
        margin-bottom : 0;
        font-family : "Helvetica Neue";
        font-weight : 500;
    }
}

.started_date{
    font-size : 12px;
    p{
        margin-top : 5px;
        margin-bottom : 0px;
        margin-left : 5px;
        font-style : italic;

    }
}

.number_of_students{
    p{
        margin-top : 5px;
        margin-left : 5px;
        margin-bottom : 10px;

    }
}


.join_button{
    display : flex;
    justify-content : flex-end;
    margin-right : 5px;
    margin-bottom : 2px;
    
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

export default Learning
