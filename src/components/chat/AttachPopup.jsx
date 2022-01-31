import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideoPlayer from "../world/Stories/VideoPlayer";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import db, { storage } from "../../firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import Loading from "../../Loading";
import Picker from "emoji-picker-react";

function AttachPopup({ learningId, from, chatMessages, chatId, chatInfo }) {
  const [{ openAttachPopup, user, userInfo }, dispatch] = useStateValue();
  const [image, setImage] = useState();
  const [video, setVideo] = useState();
  const [input, setInput] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmojis, setOpenEmojis] = useState(false);


  useEffect(() => {
    setImage();
    setVideo();
    setInput();
  }, [openAttachPopup]);

  const closePopup = () => {
    dispatch({
      type: actionTypes.OPEN_ATTACH_POPUP,
      openAttachPopup: false,
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject?.emoji);
  };

  const selectImage = (e) => {
    setVideo();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const selectVideo = (e) => {
    e.preventDefault();
    setImage();
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const post = (e) => {
    e.preventDefault();
    if (image) {
      const id = uuid();
      const upload = storage.ref(`LearningImages/${id}`).put(image);

      upload.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          console.log("URL is ", url);
          if (url) {
            if (from === "learningGroup") {
              db.collection("learnings")
                .doc(learningId)
                .collection("messages")
                .add({
                  name: userInfo?.name,
                  caption: input,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  type: "image",
                  imageUrl: url,
                })
                .then(() => {
                  dispatch({
                    type: actionTypes.OPEN_ATTACH_POPUP,
                    openAttachPopup: false,
                  });
                  setLoading(false);
                });
            } else if (from === "chat") {
              if (chatMessages?.length === 0) {
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
                          caption: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "image",
                          imageUrl: url,
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
                              caption: input,
                              timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                              type: "image",
                              imageUrl: url,
                              status : "unseen"
                            });
                        });
                      })
                      .catch((error) => {
                        console.log("Error getting documents: ", error);
                      });
                  });
                setLoading(false);
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
                          caption: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "image",
                          imageUrl: url,
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
                          caption: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "image",
                          imageUrl: url,
                          status : "unseen"
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
                setLoading(false);
              }
              dispatch({
                type: actionTypes.OPEN_ATTACH_POPUP,
                openAttachPopup: false,
              });
            }
          }
        }
      );
    }

    if (video) {
      const id = uuid();
      const upload = storage.ref(`LearningVideos/${id}`).put(video);
      setLoading(true);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          console.log("URL is ", url);
          if (url) {
            if (from === "learningGroup") {
              db.collection("learnings")
                .doc(learningId)
                .collection("messages")
                .add({
                  name: userInfo?.name,
                  caption: input,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  type: "video",
                  videoUrl: url,
                })
                .then(() => {
                  dispatch({
                    type: actionTypes.OPEN_ATTACH_POPUP,
                    openAttachPopup: false,
                  });
                  setLoading(false);
                });
            } else if (from === "chat") {
              if (chatMessages?.length === 0) {
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
                          caption: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "video",
                          videoUrl: url,
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
                              caption: input,
                              timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                              type: "video",
                              videoUrl: url,
                              status : "unseen"
                            });
                        });
                      })
                      .catch((error) => {
                        console.log("Error getting documents: ", error);
                      });
                  });
                setLoading(false);
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
                          caption: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "video",
                          videoUrl: url,
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
                          caption: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "video",
                          videoUrl: url,
                          status : "unseen"
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
                setLoading(false);
              }
              dispatch({
                type: actionTypes.OPEN_ATTACH_POPUP,
                openAttachPopup: false,
              });
            }
          }
        }
      );
    }
  };

  const open_pdf_page = (e) => {
    e.preventDefault();

    if (from === "chat") {
      history.push(`/messagesUploadPdf/${chatId}/${chatInfo?.email}`);
    } else if (from === "learningGroup") {
      history.push(`/learningsUploadPdf/${learningId}`);
    }
  };

  return (
    <>
      {openAttachPopup === true && (
        <Container>
          {loading === false ? (
            <div className="attachPopup">
              <div className="attachPopup_header">
                <CloseIcon className="close_icon" onClick={closePopup} />
              </div>
              <div className="icons">
                <input
                  type="file"
                  id={"image"}
                  style={{ display: "none" }}
                  onChange={selectImage}
                  accept="image/git , image/jpeg , image/png"
                />
                <label htmlFor="image">
                  <div className="icon_detail">
                    <div className="icon image_icon">
                      <ImageIcon />
                    </div>
                    <p>Attach</p>
                    <p>Image</p>
                  </div>
                </label>
                <input
                  type="file"
                  id={"video"}
                  style={{ display: "none" }}
                  onChange={selectVideo}
                  accept="video/mp4"
                />
                <label htmlFor="video">
                  <div className="icon_detail">
                    <div className="icon video_icon">
                      <VideocamIcon />
                    </div>
                    <p>Attach</p>
                    <p>Video</p>
                  </div>
                </label>
                <div className="icon_detail">
                  <div className="icon file_icon" onClick={open_pdf_page}>
                    <InsertDriveFileIcon />
                  </div>
                  <p>Attach</p>
                  <p>Pdf</p>
                </div>
              </div>
              {image && (
                <div className="uploaded_image">
                  <img src={URL.createObjectURL(image)} alt="" />
                </div>
              )}
              {video && (
                <div className="video_player">
                  <VideoPlayer videoUrl={URL.createObjectURL(video)} />
                </div>
              )}
              <div className="caption">
                <InsertEmoticonIcon className="emoji_icon"  onClick={(e) => setOpenEmojis(!openEmojis)} />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              {openEmojis === true && <Picker onEmojiClick={onEmojiClick} />}
              <div className="post_button">
                <button onClick={post}>Post</button>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .attachPopup {
    background-color: #fff;
    width: 350px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .attachPopup_header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    .close_icon {
      margin-right: 5px;
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }
  }

  .icons {
    display: flex;
    justify-content: space-around;

    p {
      font-size: 12px;
      margin-top: 0;
      margin-bottom: 0;
      text-align: center;
    }

    .icon {
      border: 1px solid gray;
      border-radius: 50%;
      padding: 10px;
      display: flex;
      margin-bottom: 10px;

      .MuiSvgIcon {
        margin: auto;
      }
    }

    .image_icon {
      background-color: #4684e0;

      &:hover {
        background-color: #84aff0;
        cursor: pointer;
      }
    }

    .video_icon {
      background-color: #3aca3a;

      &:hover {
        background-color: #98dd98;
        cursor: pointer;
      }
    }

    .file_icon {
      background-color: #fc6a08;

      &:hover {
        background-color: #f19150;
        cursor: pointer;
      }
    }
  }

  .uploaded_image {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    /* border : 1px solid lightgray; */
    padding: 10px;

    img {
      width: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }

  .video_player {
    margin-top: 20px;
  }

  .caption {
    border: 1px solid lightgray;
    width: 85%;
    border-radius: 20px;
    display: flex;
    padding: 3px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }

  .emoji-picker-react {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top : 10px;
  }

  input {
    outline: 0;
    border: 0;
    height: inherit;
    margin-left: 5px;
    padding: 0;
    font-size: 15px;
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

  .post_button {
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
    justify-content: flex-end;

    button {
      width: 100px;
      padding: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0044ff;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #2e66ff;
      }
    }
  }


`;

export default AttachPopup;
