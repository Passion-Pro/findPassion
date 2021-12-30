import React from 'react'
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Message from "../chat/Message"
import AttachPopup from "../chat/AttachPopup";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useHistory} from "react-router-dom"



function ChatPage() {
    const[{} , dispatch] = useStateValue();
    const history = useHistory();

    const open_attachPopup = () => {
        dispatch({
            type : actionTypes.OPEN_ATTACH_POPUP,
            openAttachPopup : true
        })
      }

    return (
        <Container>
        <div className="chat_section">
        <div className="chat_section_name">
          <ArrowBackIcon className = "back_icon" onClick = {e => history.goBack()}/>
          <Avatar
            className="avatar"
            src="https://bsmedia.business-standard.com/_media/bs/img/article/2018-03/22/full/1521664011-0145.jpg"
          />
          <div className="chat_section_name_info">
            <p>Ronak</p>
          </div>
        </div>

        <div className="chat_section_messages">
            <Message/>
            <Message/>
            <Message/>
        </div>
        <div className="chat_section_footer">
           <AttachFileIcon className = "attach_icon" onClick = {open_attachPopup}/>
          <div className="message_input">
            <InsertEmoticonIcon className="emoji_icon" />
            <input type="text" />
          </div>
          <SendIcon className = "send_icon"/>
        </div>
      </div>
      <AttachPopup/>
      </Container>
    )
};

const Container  = styled.div`
 width : 100vw;
 height : 100vh;

 .chat_section{
     display : flex;
     flex-direction : column;  
     height : inherit;  
 }


 .back_icon{
     margin-top : auto;
     margin-bottom : auto;
     margin-right : 3px;
 }

 .chat_section_name {
    display: flex;
    padding: 6px;
    padding-top: 10px;
    border-bottom: 1px solid lightgray;
  }

  .chat_section_name_info {
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    p {
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 10px;
    }
  }

  .chat_section_messages {
    flex: 1;
    background-color: #0099ff;
    display: flex;
    flex-direction: column;
    overflow-y : scroll;
  }

  .chat_section_footer {
    padding: 10px;
    display : flex;

    .message_input {
      border: 1px solid lightgray;
      width: 95%;
      border-radius: 20px;
      display: flex;
      padding: 3px;
    }

    input {
      outline: 0;
      border: 0;
      height: inherit;
      margin-left: 5px;
      padding : 0;
      font-size : 18px;
      width : 100%;
      padding-right: 10px;
    }

    .emoji_icon {
      font-size: 25px;
      color : #686868;

&:hover{
    cursor : pointer;
    color : gray;
}
    }
  }

  .send_icon{
      margin-left : 10px;
      margin-top : auto;
      margin-bottom : auto;
      color : #686868;

      &:hover{
          cursor : pointer;
          color : gray;
      }
  }

  .attach_icon{
      margin-top :auto;
      margin-bottom : auto;
      margin-right : 1px;
      color : #686868;

&:hover{
    cursor : pointer;
    color : gray;
}
  }


`;

export default ChatPage
