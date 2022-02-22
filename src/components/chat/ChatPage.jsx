import React , {useState, useEffect} from 'react'
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
import {useHistory , useParams} from "react-router-dom"
import db from '../../firebase';
import firebase from "firebase";
import Picker from "emoji-picker-react";




function ChatPage() {
    const[{user , userInfo} , dispatch] = useStateValue();
    const history = useHistory();
    const {myChatId} = useParams();
    const {viewerId} = useParams();
    const[messages, setMessages] = useState([])
    const[chatInfo  ,setChatInfo] = useState([]);
    const[profilePhotoUrl , setProfilePhotoUrl] = useState();
    const[input , setInput] = useState("")
    const [openEmojis, setOpenEmojis] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState("");
    useEffect(() => {
      dispatch({
        type: actionTypes.SET_PATHNAMEF,
        pathnamef: "/messages",
      });
    }, []);
    useEffect(() => {
       if(myChatId && user?.uid){
        db.collection("users")
        .doc(user?.uid)
        .collection("chats")
        .doc(myChatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );

        db.collection("users")
        .doc(user?.uid).collection("chats").doc(myChatId)
        .onSnapshot((snapshot) => {
          setChatInfo(snapshot.data());
        });


       }
    } , [myChatId , user?.uid]);

    useEffect(() => {
      if(chatInfo?.email){
        db.collection("users")
        .where("email", "==", chatInfo?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
           setProfilePhotoUrl(doc.data().profilePhotoUrl)
          

          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }
    } , [chatInfo?.email])

    const open_attachPopup = () => {
        dispatch({
            type : actionTypes.OPEN_ATTACH_POPUP,
            openAttachPopup : true
        })
      }

      const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInput(input + emojiObject?.emoji);
      };

      const send_message = (e) => {
        e.preventDefault();
        if (input !== "") {
          if (messages?.length === 0) {
            console.log("X is ", 0);
            db.collection("users")
              .doc(user?.uid)
              .collection("chats")
              .where("email", "==", chatInfo?.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
    
                  db.collection("users")
                    .doc(user?.uid)
                    .collection("chats")
                    .doc(doc.id)
                    .collection("messages")
                    .add({
                      name: userInfo?.name,
                      message: input,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      type: "text",
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
    
            db.collection("users")
              .doc(viewerId)
              .collection("chats")
              .add({
                name: userInfo?.name,
                email: userInfo?.email,
              })
              .then(() => {
                db.collection("users")
                  .doc(viewerId)
                  .collection("chats")
                  .where("email", "==", userInfo?.email)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
    
                      db.collection("users")
                        .doc(viewerId)
                        .collection("chats")
                        .doc(doc.id)
                        .collection("messages")
                        .add({
                          name: userInfo?.name,
                          message: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "text",
                          status : "unseen"
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
              });
          } else {
            db.collection("users")
              .doc(user?.uid)
              .collection("chats")
              .where("email", "==", chatInfo?.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
    
                  db.collection("users")
                    .doc(user?.uid)
                    .collection("chats")
                    .doc(doc.id)
                    .collection("messages")
                    .add({
                      name: userInfo?.name,
                      message: input,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      type: "text",
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
    
            db.collection("users")
              .doc(viewerId)
              .collection("chats")
              .where("email", "==", userInfo?.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
    
                  db.collection("users")
                    .doc(viewerId)
                    .collection("chats")
                    .doc(doc.id)
                    .collection("messages")
                    .add({
                      name: userInfo?.name,
                      message: input,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      type: "text",
                      status : "unseen"
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          }
          setInput("");
        }
      };

    return (
        <Container>
        <div className="chat_section">
        <div className="chat_section_name">
          <ArrowBackIcon className = "back_icon" onClick = {e => history.goBack()}/>
          {profilePhotoUrl && (
            <Avatar
            className="avatar"
            src= {profilePhotoUrl}
          />
          )}
          <div className="chat_section_name_info">
            <p>{chatInfo?.name}</p>
          </div>
        </div>

        <div className="chat_section_messages">
            {messages.map((message) => (
               <Message message={message} chatEmail={chatInfo?.email} />
            ))}
        </div>
        <div className="chat_section_footer">
           <AttachFileIcon className = "attach_icon" onClick = {open_attachPopup}/>
          <div className="message_input">
            <InsertEmoticonIcon className="emoji_icon" 
             onClick={(e) => setOpenEmojis(!openEmojis)}
            />
            <input type="text" 
             value = {input}
             placeholder = "Type your message"
             onChange = {(e) => {setInput(e.target.value)}}
            />
          </div>
          <SendIcon className = "send_icon" onClick={send_message}
          />
        </div>
        {openEmojis === true && <Picker onEmojiClick={onEmojiClick} />}
      </div>
      <AttachPopup
        from="chat"
        chatMessages={messages}
        chatInfo={chatInfo}
        chatId={viewerId}
      />
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
    background-image: url("https://i.pinimg.com/736x/2a/68/b4/2a68b4d59d9b4b25c32a3cb4738c6cdc.jpg");
    background-position: center;
    background-size : 20%;
    background-repeat: repeat;
    display: flex;
    flex-direction: column-reverse;
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

.emoji-picker-react {
  width : 100% !important;
}


`;

export default ChatPage
