import React from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import {useHistory} from "react-router-dom"
import Member from "./Member";
import Avatar from "@mui/material/Avatar";
import { ArrowBack } from "@material-ui/icons";


function LearnersPage() {
    const history = useHistory();
    
    return (
        <div>
           <Container>
           <div className="group_details">
            <div className="arrowBack_icon">
                <ArrowBack onClick = {e => history.goBack()}/>
            </div>
            <Avatar
              className="learningGroup_avatar"
              src="data:image/jpeg;base64,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"
            />
            <p className="learning_info">Learning Node Js</p>
            <div className="members">
              <div className="learners">
                <p>Learners</p>
              </div>
              <Member />
              <Member />
              <Member />
              
            </div>
          </div>
           </Container> 
        </div>
    )
};

const Container = styled.div`
 width : 100vw;
 height : 100vh;

 .learningGroup_avatar {
      margin-left: auto;
      margin-right: auto;
      width: 150px;
      height: 150px;
    }

    .learners {
      padding-left: 15px;
      p {
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }

    .learning_info {
      text-align: center;
      font-family: "Helvetica Neue";
      font-weight: 500;
      font-size: 20px;
      padding-bottom: 20px;
    }

    .members {
      border-top: 1px solid lightgray;
      overflow-y: scroll;
    }

    .members::-webkit-scrollbar {
      display: none;
    }

    .arrowBack_icon{
        margin-top : 10px;
        margin-left : 10px;
        font-size : 20px;
        color : gray;
    }
  

`;

export default LearnersPage
