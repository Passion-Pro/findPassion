import React, { useEffect, useState } from "react";
import "./RightSidebarGroup.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import db from "../../firebase";
import firebase from "firebase";
import GroupChatMsg from "./GroupChatMsg";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Picker from "emoji-picker-react";
import AttachPopup from "../chat/AttachPopup"

function RightSidebarGroupChat() {
  const history = useHistory();
  const [{ userInfo, user, groupDetails, showTop }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmojis, setOpenEmojis] = useState(false);

  var today = new Date();
  var date = today.toLocaleString();

  const open_attachPopup = () => {
    dispatch({
      type: actionTypes.OPEN_ATTACH_POPUP,
      openAttachPopup: true,
    });
  };


  const sendMessage = () => {
    if (input && groupDetails) {
      db.collection("Groups")
        .doc("KRpTP7NQ8QfN2cEH3352")
        .collection(user.email)
        .doc(user.uid + "groupchat")
        .collection("GroupChat")
        .add({
          date: date,
          message: input,
          name: userInfo?.name,
          sendby: user.email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          db.collection("Groups")
            .doc("KRpTP7NQ8QfN2cEH3352")
            .collection(user?.email)
            .doc(user?.uid + "Details")
            .update({
              totalmessage: groupDetails?.totalmessage + 1,
              totalmessageAdmin: groupDetails?.totalmessageAdmin + 1,
            });
          setInput("");
        });
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      db.collection("Groups")
        .doc("KRpTP7NQ8QfN2cEH3352")
        .collection(user.email)
        .doc(user.uid + "groupchat")
        .collection("GroupChat")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          );
        });
    }
  }, [user]);

  return (
    <div className="RightSidebarGroup">
      <div
        className={
          showTop
            ? "rightSidebarGroup__headerShow"
            : "rightSidebarGroup__header"
        }
      >
        <div className="rightSidebarGroup__headMoreTask">
          <ArrowBackRoundedIcon
            onClick={() => {
              history.push("/group");
            }}
          />
        </div>
        <div className="rightSidebarGroup__headName">
          Chat
        </div>
        <div></div>
      </div>
      <div
        className={
          showTop
            ? "rightSidebarGroup__bodyTaskShow"
            : "rightSidebarGroup__bodyTask"
        }
      >
        <div className={showTop ? "GroupChat__bodyShow" : "GroupChat__body"}>
          {messages.map((data) => (
            <GroupChatMsg data={data} />
          ))}
        </div>
        <div
          className={showTop ? "GroupChat__FooterShow" : "GroupChat__Footer"}
        >
          <AttachFileIcon
                className="attach_icon"
                onClick={open_attachPopup}
              />
          <InsertEmoticonIcon
            className="emoji_icon"
            onClick={(e) => setOpenEmojis(!openEmojis)}
          />
          <textarea
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <SendRoundedIcon
            style={{
              color: "#208bc0",
              border: "1px solid rgb(20, 218, 226)",
              padding: "0.6%",
              borderRadius: "50%",
              backgroundColor: "rgb(209, 218, 226)",
            }}
            onClick={sendMessage}
          />
        </div>
      </div>
      <AttachPopup from="chat"/>
    </div>
  );
}

export default RightSidebarGroupChat;
