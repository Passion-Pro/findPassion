import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
// import Header from "../Header/Header";
import Avatar from "@mui/material/Avatar";
import Name from "./Name";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Message from "./Message";
import AttachPopup from "./AttachPopup";
import db from "../../firebase";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import Picker from "emoji-picker-react";


function Chat() {
  const [{ user, userInfo }, dispatch] = useStateValue();
  const [chats, setChats] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);
  const [input, setInput] = useState("");
  const [x, setX] = useState(0);
  const [messages, setMessages] = useState([]);
  const { chatId } = useParams();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmojis, setOpenEmojis] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject?.emoji);
  };

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .collection("chats")
        .onSnapshot((snapshot) =>
          setChats(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid && chatId) {
      db.collection("users")
        .doc(chatId)
        .onSnapshot((snapshot) => {
          setChatInfo(snapshot.data());
        });
    }
  }, [chatId, user?.uid]);

  useEffect(() => {
    if (chatInfo?.email) {
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
              .orderBy("timestamp", "desc")
              .onSnapshot((snapshot) =>
                setMessages(
                  snapshot.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                  }))
                )
              );
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [chatInfo?.email]);

  useEffect(() => {
    console.log("Messages are ", messages);
  }, [messages?.length]);

  const open_attachPopup = () => {
    dispatch({
      type: actionTypes.OPEN_ATTACH_POPUP,
      openAttachPopup: true,
    });
  };

  const changeInput = (e) => {
    setInput(e.target.value);
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
          .doc(chatId)
          .collection("chats")
          .add({
            name: userInfo?.name,
            email: userInfo?.email,
          })
          .then(() => {
            db.collection("users")
              .doc(chatId)
              .collection("chats")
              .where("email", "==", userInfo?.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());

                  db.collection("users")
                    .doc(chatId)
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
          .doc(chatId)
          .collection("chats")
          .where("email", "==", userInfo?.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());

              db.collection("users")
                .doc(chatId)
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
    <div>
      <Container>
        {/* <Header /> */}
        <div className="chat">
          <div className="chatNames">
            <p className="chats_title">Chats</p>
            <div className="names">
              {chats.map((chat) => (
                <Name chat={chat.data} id={chat?.id} />
              ))}
            </div>
          </div>
         {chatId? <div className="chat_section">
            <div className="chat_section_name">
              <Avatar className="avatar" src={chatInfo?.profilePhotoUrl} />
              <div className="chat_section_name_info">
                <p>{chatInfo?.name}</p>
              </div>
            </div>
            <div className="chat_section_messages">
              {messages.map((message) =>(
                <Message message={message} chatEmail={chatInfo?.email} />
              ))}
            </div>
            <div className="chat_section_footer">
              <AttachFileIcon
                className="attach_icon"
                onClick={open_attachPopup}
              />
              <div className="message_input">
                <InsertEmoticonIcon
                  className="emoji_icon"
                  onClick={(e) => setOpenEmojis(!openEmojis)}
                />
                <input type="text" value={input} onChange={changeInput} />
              </div>
              <SendIcon className="send_icon" onClick={send_message} />
            </div>
            {openEmojis === true && <Picker onEmojiClick={onEmojiClick} />}
          </div>:(
            <div className="noChatScreen">
                <div className="click_box">
                  <p>Click on chats to view messages</p>
                </div>
            </div>
          )}
        </div>
      </Container>
      <AttachPopup
        from="chat"
        chatMessages={messages}
        chatInfo={chatInfo}
        chatId={chatId}
      />
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }

  .chat {
    flex: 1;
    display: flex;
    overflow-y: scroll;
  }

  .chat::-webkit-scrollbar {
    display: none;
  }
  .chatNames {
    flex: 0.3;
    border-right: 1px solid lightgray;
    max-height: 100vh;

    @media (max-width: 500px) {
      flex: 1;
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
    max-height: 100vh;
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
      display: none;
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
    flex-direction: column-reverse;
    overflow-y: scroll;
  }

  .chat_section_messages::-webkit-scrollbar {
    display: none;
  }

  .chat_section_footer {
    padding: 10px;
    display: flex;

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
      padding: 0;
      font-size: 18px;
      width: 100%;
      padding-right: 10px;
    }

    .emoji_icon {
      font-size: 25px;
      color: #686868;

      &:hover {
        cursor: pointer;
        color: gray;
      }
    }
  }

  .send_icon {
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
    color: #686868;

    &:hover {
      cursor: pointer;
      color: gray;
    }
  }

  .attach_icon {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 1px;
    color: #686868;

    &:hover {
      cursor: pointer;
      color: gray;
    }
  }

  .emoji-picker-react {
    width: 100% !important;
  }

  .noChatScreen{
   height : 90vh;
   background-color: #d8d8d8d3;
   flex : 0.7;
   display : flex;
   justify-content : center; 
   align-items : center;
   
   .click_box{
      background-color: white;
      width : 30vw;
      margin-left : auto;
      margin-right : auto;
      padding : 10px;
      border-radius : 10px;
      text-align : center;
   }
  }
`;

export default Chat;
