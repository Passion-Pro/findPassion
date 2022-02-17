import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AttachPopup from "./../../chat/AttachPopup";
import Avatar from "@mui/material/Avatar";
import Member from "./Member";
import Message from "../../chat/Message";
import { useHistory, useParams } from "react-router-dom";
import db from "../../../firebase";
import firebase from "firebase";
import Picker from "emoji-picker-react";
import Suggestion from "./Suggestion";
import RemoveMemberPopup from "./RemoveMemberPopup";

function LearningGroup() {
  const [{ user, userInfo , openRemoveMemberPopup , learner }, dispatch] = useStateValue();
  const history = useHistory();
  const { learningId } = useParams();
  const [learningData, setLearningData] = useState([]);
  const [learners, setLearners] = useState([]);
  const [input, setInput] = useState();
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmojis, setOpenEmojis] = useState(false);
  const [activeTab, setActiveTab] = useState("suggestions");
  const [suggestionTab, setSuggestionTab] = useState("all");
  const [users, setUsers] = useState([]);
  const [learntStuff, setLearntStuff] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [x, setX] = useState(0);
  const [a, setA] = useState([]);
  const [savedSuggestions, setSavedSuggestions] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject?.emoji);
  };

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    );
  }, []);


  useEffect(() => {
    setSuggestions([]);
  }, [user]);

  useEffect(() => {
    db.collection("learnings")
      .doc(learningId)
      .collection("savedSuggestions")
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
  }, [learningId]);

  useEffect(() => {
    if (users.length > 0) {
      let newLearntStuff = [];
      for (let i = 0; i < users?.length; i++) {
        console.log("Users are", users);
        db.collection("users")
          .doc(users[i].id)
          .collection("learntStuff")
          .onSnapshot((snapshot) =>
            snapshot.docs.map((doc) => {
              newLearntStuff.push(doc.data());
              console.log("Doc is", doc.data());
              setLearntStuff(newLearntStuff);
            })
          );
      }
    }
  }, [users?.length]);

  useEffect(() => {
    console.log("learntStuff is ", learntStuff);
  }, [learntStuff?.length]);

  useEffect(() => {
    if (learningId && user) {
      db.collection("learnings")
        .doc(learningId)
        .onSnapshot((snapshot) => {
          setLearningData(snapshot.data());
        });

      db.collection("learnings")
        .doc(learningId)
        .collection("learners")
        .onSnapshot((snapshot) =>
          setLearners(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );

      db.collection("learnings")
        .doc(learningId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [learningId, user]);

  useEffect(() => {
    if (learntStuff?.length > 0 && learningData?.tags?.length > 0) {
      var z = 0;
      for (let j = 0; j < learntStuff?.length; j++) {
        for (let k = 0; k < learntStuff[j]?.tags?.length; k++) {
          for (let i = 0; i < learningData?.tags?.length; i++) {
            console.log("1 is", learningData?.tags[i]?.name);
            console.log("2 is ", learntStuff[j]?.tags[k]?.name);
            if (learningData?.tags[i]?.name === learntStuff[j]?.tags[k]?.name) {
              suggestions.push(learntStuff[j]);
              console.log("Suggestion is", learntStuff[j]);
              z = 1;
            }
          }
          if (z === 1) {
            break;
          }
        }
      }
      setX(x + 1);
    }
  }, [learntStuff?.length]);

  useEffect(() => {
    if (suggestions.length > 0) {
      for (let i = 0; i < suggestions.length; i++) {
        for (let j = i + 1; j < suggestions.length; j++) {
          if (suggestions[j] === suggestions[i]) {
            a.push(j);
          }
        }
      }
    }
  }, [suggestions.length]);

  useEffect(() => {
    if (a.length > 0) {
      for (let i = 0; i < a?.length; i++) {
        console.log("A is ", a);
        suggestions.splice(a[i], 1);
        console.log(suggestions);
      }
      setX(x + 1);
    }
  }, [a?.length]);

  useEffect(() => {
    console.log("Suggestions are ", suggestions);
  }, [suggestions.length, learntStuff?.length, learningData]);

  useEffect(() => {
    db.collection("learnings")
      .doc(learningId)
      .collection("savedSuggestions")
      .onSnapshot((snapshot) =>
        setSavedSuggestions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    console.log("Messages are", messages);
  }, [messages]);

  const open_attachPopup = () => {
    dispatch({
      type: actionTypes.OPEN_ATTACH_POPUP,
      openAttachPopup: true,
    });
  };

  const send_message = (e) => {
    e.preventDefault();

    db.collection("learnings").doc(learningId).collection("messages").add({
      name: userInfo?.name,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      type: "text",
    });

    setInput("");
  };

  return (
    <div>
      <Container>
        <div className="learningsGroup">
          <div className="group_details">
            <Avatar
              className="learningGroup_avatar"
              src={learningData?.learningImageUrl}
            />
            <p className="learning_info">{learningData?.learning}</p>
            <div className="tags">
              {learningData?.tags?.map((tag) => (
                <p
                  style={{
                    fontSize: "12px",
                    borderRadius: "20px",
                    padding: "7px",
                    border: "1px solid lightgray",
                    width: "fit-content",
                    color: "white",
                    backgroundColor: "blue",
                    marginRight: "7px",
                    marginBottom: "7px",
                    marginTop: 0,
                  }}
                >
                  {tag?.name}
                </p>
              ))}
            </div>
            <div className="members">
              <div className="learners">
                <p>
                  {learners?.length === 1
                    ? `1 learner`
                    : `${learners?.length} learners`}
                </p>
              </div>
              {learners.map((learner) => (
                <Member learner={learner} learning = {learningData} 
                 learningId = {learningId}
                />
              ))}
            </div>
          </div>
          <div className="group_chat">
            <div className="group_chat_header">
              <div className="header_nonbutton">
                <div className="group_chat_header_info">
                  <div className="mobile_upper_part">
                  <p className="started_on">
                    Started on{" "}
                    {new Date(learningData?.timestamp?.toDate()).toUTCString()}{" "}
                    by {learningData?.started_by?.name}
                  </p>
                  <button className="learners_button" onClick={(e) => history.push(`/learners/${learningId}`)}>
                  Learners
                </button>
                  </div>

                  <div className="buttons">
                    <button
                      style={{
                        backgroundColor:
                          activeTab === "chat" ? "black" : "white",
                        color: activeTab === "chat" ? "white" : "black",
                      }}
                      onClick={() => {
                        setActiveTab("chat");
                      }}
                    >
                      Chat
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          activeTab === "suggestions" ? "black" : "white",
                        color: activeTab === "suggestions" ? "white" : "black",
                      }}
                      onClick={() => {
                        setActiveTab("suggestions");
                      }}
                    >
                      Suggestions 
                    </button>
                  </div>
                </div>
              </div>
              <div >
              </div>
            </div>
            {activeTab === "chat" ? (
              <>
                <div className="group_chat_chat">
                  {messages.map((message) => (
                    <Message message={message} learningId={learningId} />
                  ))}
                </div>
                <div className="group_chat_footer">
                  <AttachFileIcon
                    className="attach_icon"
                    onClick={open_attachPopup}
                  />
                  <div className="message_input">
                    <InsertEmoticonIcon
                      className="emoji_icon"
                      onClick={(e) => setOpenEmojis(!openEmojis)}
                    />
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <SendIcon className="send_icon" onClick={send_message} />
                </div>
                {openEmojis === true && <Picker onEmojiClick={onEmojiClick} />}
              </>
            ) : (
              <div className="suggestions">
                <div className="suggestions_header">
                  <button onClick={() => setSuggestionTab("all")}>All</button>
                  <button onClick={() => setSuggestionTab("saved")}>
                    Saved
                    <p
                      style={{
                        display: "none",
                      }}
                    >
                      {x}
                    </p>
                  </button>
                </div>
                {suggestionTab === "all" && (
                  <div className="all_suggestions">
                    {suggestions.map((suggestion) => (
                      <>
                        {suggestion?.email !== user?.email && (
                          <Suggestion
                            suggestion={suggestion}
                            type="all"
                            learningId={learningId}
                            savedSuggestions={savedSuggestions}
                          />
                        )}
                      </>
                    ))}
                  </div>
                )}
                {suggestionTab === "saved" && (
                  <div className="all_suggestions">
                    {console.log("Saved One ", savedSuggestions)}
                    {savedSuggestions.map((suggestion) => (
                      <>
                        {suggestion?.email !== user?.email && (
                          <Suggestion
                            suggestion={suggestion?.data?.suggestion}
                            type="saved"
                            learningId={learningId}
                            savedSuggestions={savedSuggestions}
                          />
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <AttachPopup learningId={learningId} from="learningGroup" />
        {openRemoveMemberPopup && (<RemoveMemberPopup learning = {learningData}/>)}
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .learningsGroup {
    display: flex;
    height: inherit;
  }

  .group_details {
    flex: 0.25;
    display: flex;
    flex-direction: column;
    border-right: 1px solid lightgray;
    padding-top: 20px;
    padding-bottom: 20px;

    @media (max-width: 500px) {
      display: none;
    }

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
      margin-bottom: 0;
    }

    .members {
      border-top: 1px solid lightgray;
      overflow-y: scroll;
    }

    .members::-webkit-scrollbar {
      display: none;
    }
  }

  .group_chat {
    display: flex;
    flex-direction: column;
    flex: 0.75;

    @media (max-width: 500px) {
      flex: 1;
    }

    .group_chat_header {
      border-bottom: 1px solid lightgray;
      display: flex;
      flex-direction: column-reverse;
      padding: 10px;

      .learningGroup_avatar_mobile {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        width: 50px;
        height: 50px;

        @media (min-width: 500px) {
          display: none;
        }
      }

      .group_chat_header_info {
        width: 100%;
        display: flex;

        @media (min-width: 500px) {
          justify-content: space-between
        }

        .mobile_upper_part{
          display: flex;
        }

        @media (max-width: 500px) {
          display: flex;
          flex-direction : column
        }

        .buttons {
          display: flex;
          margin-right: 20px;

          button {
            margin-right: 20px;
            border-radius: 20px;
            border: 1px solid lightgray;
            padding: 5px;
            padding-left: 10px;
            padding-right: 10px;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .header_nonbutton {
        display: flex;
      }

      
        .learners_button{
          margin-top: 5px;
          background-color: #dddcdc;
          padding: 5px;
          border-radius: 20px;
          padding-left: 12px;
          padding-right: 12px;
          border: 0;

          
        @media (min-width: 500px) {
          display: none;
        }

          &:hover {
            background-color: lightgray;
          }
        }
      

      .started_on {
        margin-bottom: 10px;
        width : 70%;
        margin-right : 20px;

        @media (min-width: 500px) {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
      }

      p {
        text-align: center;
        font-weight: 500;
        font-family: "Helvetica Neue";
        margin-top: 0;
      }

      .header_learning {
        margin-bottom: 5px;
        font-size: 20px;

        @media (min-width: 500px) {
          display: none;
        }
      }
    }

    .group_chat_chat {
      flex: 1;
      /* background-color: #0099ff; */
      display: flex;
      flex-direction: column-reverse;
      overflow-y: scroll;
      background-image: url("https://previews.123rf.com/images/peshkov/peshkov1909/peshkov190901228/130558599-creative-blue-education-background-with-sketch-knowledge-science-and-graduation-concept-3d-rendering.jpg");
      background-repeat: repeat;
      background-position: center;
      background-size: 20%;
    }

    .group_chat_chat::-webkit-scrollbar {
      display: none;
    }
  }

  .suggestions {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-image: url("https://previews.123rf.com/images/peshkov/peshkov1909/peshkov190901228/130558599-creative-blue-education-background-with-sketch-knowledge-science-and-graduation-concept-3d-rendering.jpg");
    background-repeat: repeat;
    background-position: center;
    background-size: 20%;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .suggestions_header {
    display: flex;
    padding: 10px;

    button {
      margin-right: 20px;
      border-radius: 20px;
      padding: 5px;
      padding-left: 10px;
      padding-right: 10px;
      border: 0;
      font-size: 12px;
      background-color: white;

      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }

  .all_suggestions {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }

  .group_chat_footer {
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

  .tags {
    display: flex;
    flex-wrap: wrap;
    padding-left: 15px;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

export default LearningGroup;
