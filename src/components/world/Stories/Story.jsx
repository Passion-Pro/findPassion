import React  from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import {useHistory} from "react-router-dom"


function Story({journey}) {
const[{userInfo} , dispatch] = useStateValue();
const history = useHistory()
    
    const open_story_popup = () => {
        dispatch({
            type : actionTypes.OPEN_STORY_POPUP,
            openStoryPopup : true
        })

        dispatch({
            type : actionTypes.SET_JOURNEY,
            journey : journey
        })
    }

    return (
        <Container>
          <div className="current_status" style = {{
              backgroundImage : `url(${journey?.data?.memorablePhotoUrl})`
          }}>
             
          </div>
           <div className="user_info">
               <Avatar className="user_info_avatar" src= {journey?.data?.uploaderInfo?.profilePhotoUrl}/>
               <p>{journey?.data?.uploaderInfo?.name}</p>
           </div>
           <div className="journey_period">
               <p>
                   <span>{journey?.data?.journeyPeriod} </span>
                    of journey in {userInfo?.passion}</p>
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
   border-top-left-radius : 10px;
   border-top-right-radius : 10px;
   background-size : contain;
   background-position : center;
   background-repeat : no-repeat;
   margin-left : 10px;
   margin-right : 10px;
   margin-top : 10px;
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
