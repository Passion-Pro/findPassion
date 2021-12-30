import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
// import Header from "../Header/Header";
import Avatar from "@mui/material/Avatar";
import Name from "./Name";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Message from "./Message"
import AttachPopup from "./AttachPopup";


function Chat() {
const[{} , dispatch] = useStateValue();

const open_attachPopup = () => {
  dispatch({
      type : actionTypes.OPEN_ATTACH_POPUP,
      openAttachPopup : true
  })
}
  return (
    <div>
      <Container>
        {/* <Header /> */}
        <div className="chat">
          <div className="chatNames">
            <p className="chats_title">Chats</p>
            <div className="names">
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
              <Name />
            </div>
          </div>
          <div className="chat_section">
            <div className="chat_section_name">
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
                <Message/><Message/>
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
        </div>
      </Container>
      <AttachPopup/>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
      display : none;
  }


  .chat {
    flex: 1;
    display: flex;
    overflow-y : scroll;    
  }

  .chat::-webkit-scrollbar {
      display : none; 
  }
  .chatNames {
    flex: 0.3;
    border-right: 1px solid lightgray;
    max-height : 100vh;

    @media (max-width: 500px) {
        flex : 1;
    }
  }

  .chats_title {
    padding: 10px;
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid lightgray;
    font-size: 20px;
  }

  .names {
    display: flex;
    flex-direction: column;
    max-height : 100vh;
    overflow-y: scroll;
   
  
  }

  .names::-webkit-scrollbar {
    display: none;
  }

  .chat_section {
    display: flex;
    flex-direction: column;
    flex: 0.7;

    @media (max-width: 500px) {
        display : none;
    }
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

  .chat_section_messages::-webkit-scrollbar {
      display : none;
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

export default Chat;
