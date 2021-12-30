import React from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import {useHistory} from "react-router-dom"


function Story() {
const[{} , dispatch] = useStateValue();
const history = useHistory()
    
    const open_story_popup = () => {
        dispatch({
            type : actionTypes.OPEN_STORY_POPUP,
            openStoryPopup : true
        })
    }

    return (
        <Container>
          <div className="current_status">
             
          </div>
           <div className="user_info">
               <Avatar className="user_info_avatar" src="https://bsmedia.business-standard.com/_media/bs/img/article/2018-03/22/full/1521664011-0145.jpg"/>
               <p>Mark</p>
           </div>
           <div className="journey_period">
               <p>
                   <span>15 years </span>
                    of journey in Web Development</p>
           </div>
           <div className="fires">
               <div>
               <span className = "fire_symbol">🔥</span>
               <span className = "number_of_fires">110 views</span>
               </div>
               <div className="view_button">
                   <button onClick = {open_story_popup} className = "for_laptop">View</button>
                   <button onClick = {e => history.push("/story")} className = "for_mobile">View</button>
               </div>
           </div>
        </Container>
    )
};

const Container = styled.div`
display : flex;
flex-direction : column;
width : 250px;
height : fit-content;
border : 1px solid lightgray;
border-radius : 10px;
box-shadow : 0 0 15px rgba(0, 0, 0, 0.24);
margin-right : 30px;
margin-bottom : 30px;


@media(max-width: 500px){
    width : 95vw;
    margin-right : auto;
    margin-left : auto;
}



.current_status{
   height : 125px;
   background-image : url("data:image/jpeg;base64,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");
   border-top-left-radius : 10px;
   border-top-right-radius : 10px;
   background-image : cover;
}

.user_info{
    padding : 10px;

    display : flex;

    .user_info_avatar{
       width : 27px;
       height : 27px; 
    }

    p{
        margin-top : auto;
        margin-bottom : auto;
        margin-left : 5px;
        font-size : 15px;
    }
}


.journey_period{
    padding : 10px;
    padding-bottom : 0;
    padding-top : 0;
    color : #474747;
    p{
        margin-top : 5px;
        margin-bottom : 0;
        font-size : 18px;
        font-family : "Helvetica Neue";
        font-weight : 500;
        
        @media(max-width: 500px){
            font-size : 20px;
        }
      
    }

    span{
        font-weight : 600;
    }
}

.fires{
    padding : 10px;
    display : flex;
    justify-content : space-between;
    margin-top : 3px;
    

    span{
        padding : 0;
    }
    .fire_symbol{
        font-size : 17px;
        margin-right : 2px;
    }
    .number_of_fires{
        font-style : italic;
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

    .for_laptop{
        @media(max-width : 500px){
           display : none 
        }
    }

    .for_mobile{
        display : none;
        @media(max-width : 500px){
           display : inline 
        }
    }
}




`;

export default Story
