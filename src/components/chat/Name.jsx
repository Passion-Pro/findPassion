import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import "./Name.css";
import db from "../../firebase";

function Name({ chat, id }) {
  const history = useHistory();
  const [chatInfo, setChatInfo] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [viewerId, setViewerId] = useState();
  const [lastMessage, setLastMessage] = useState([]);
  const [x, setX] = useState(0);
  const [id2, setId2] = useState();

  useEffect(() => {
    if (chat?.email) {
      db.collection("users")
        .where("email", "==", chat?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            setChatInfo(doc.data());

            setViewerId(doc.id);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      db.collection("users")
        .doc(user?.uid)
        .collection("chats")
        .where("email", "==", chat?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            setId2(doc.id);

            db.collection("users")
              .doc(user?.uid)
              .collection("chats")
              .doc(doc?.id)
              .collection("messages")
              .where("status", "==", "unseen")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());

                  setX(x + 1);
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });

            db.collection("users")
              .doc(user?.uid)
              .collection("chats")
              .doc(doc.id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .limit(1)
              .onSnapshot((snapshot) =>
                setLastMessage(
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
  }, [chat?.email]);
  return (
    <>
      {chat?.email && (
        <>
          <Container
            className="name_for_laptop"
            onClick={() => {
              dispatch({
                type: actionTypes.SET_CHAT_ID,
                chatId: viewerId,
              });
              history.push(`/chat/${viewerId}`);
              setX(0);

              db.collection("users")
                .doc(user?.uid)
                .collection("chats")
                .doc(id2)
                .collection("messages")
                .where("status", "==", "unseen")
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    db.collection("users")
                      .doc(user?.uid)
                      .collection("chats")
                      .doc(id2)
                      .collection("messages")
                      .doc(doc?.id)
                      .update({
                        status: "seen",
                      });
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            }}
          >
            <Avatar className="avatar" src={chatInfo?.profilePhotoUrl} />
            <div className="chatName_info">
              <p>{chatInfo?.name}</p>
              <p>
                {lastMessage[0]?.data?.message?.length <= 20 ? (
                  <>{lastMessage[0]?.data?.message}</>
                ) : (
                  <>{lastMessage[0]?.data?.message?.slice(0, 20)}...</>
                )}
              </p>
            </div>
            {x > 0 && (
              <div className="unread_messages">
                <div className="circle">{x}</div>
              </div>
            )}
          </Container>
          <Container
            className="name_for_mobile"
            onClick={(e) => {
              history.push(`/messages/${id2}/${viewerId}`);
              setX(0);

              db.collection("users")
                .doc(user?.uid)
                .collection("chats")
                .doc(id2)
                .collection("messages")
                .where("status", "==", "unseen")
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    db.collection("users")
                      .doc(user?.uid)
                      .collection("chats")
                      .doc(id2)
                      .collection("messages")
                      .doc(doc?.id)
                      .update({
                        status: "seen",
                      });
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            }}
          >
            <Avatar
              className="avatar"
              src={chatInfo?.profilePhotoUrl}
            />
            <div className="chatName_info">
              <p>{chatInfo?.name}</p>
              <p>
                {lastMessage[0]?.data?.message?.length <= 20 ? (
                  <>{lastMessage[0]?.data?.message}</>
                ) : (
                  <>{lastMessage[0]?.data?.message?.slice(0, 20)}...</>
                )}
              </p>
            </div>
            {x > 0 && (
              <div className="unread_messages">
                <div className="circle">{x}</div>
              </div>
            )}
          </Container>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  border-bottom: 1px solid lightgray;

  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }

  .chatName_info {
    display: flex;
    flex-direction: column;
    flex: 1;
    p {
      margin-top: 0;
      margin-bottom: 5px;
      margin-left: 20px;
    }
  }

  .avatar {
    margin-top: 2px;
    width: 50px;
    height: 50px;
  }

  .unread_messages {
    display: flex;
    align-items: center;

    .circle {
      border: 1px solid lightgray;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4c4cf8;
      color: white;
    }
  }
`;

export default Name;
