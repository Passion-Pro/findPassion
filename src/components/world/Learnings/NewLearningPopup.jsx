import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import db, { auth, storage } from "../../../firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";

function NewLearningPopup() {
  const [{ openNewLearningPopup, user, userInfo }, dispatch] = useStateValue();
  const [image, setImage] = useState();
  const [input, setInput] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [learnings, setLearnings] = useState([]);

  useEffect(() => {
    if (user && openNewLearningPopup === true) {
      db.collection("users")
        .doc(user.uid)
        .collection("myLearnings")
        .onSnapshot((snapshot) =>
          setLearnings(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);

  const close_popup = () => {
    dispatch({
      type: actionTypes.OPEN_NEW_LEARNING_POPUP,
      openNewLearningPopup: false,
    });
  };

  const start_learning = (e) => {
    e.preventDefault();
    console.log("Image URl is ", imageUrl);
    if (learnings?.length < 5) {
      if (image) {
        const id = uuid();

        const upload = storage.ref(`images/${id}`).put(image);

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
            if (url) {
              db.collection("users")
                .doc(user.uid)
                .collection("myLearnings")
                .add({
                  learning: input,
                  learningImageUrl: url,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });

              db.collection("learnings")
                .add({
                  learning: input,
                  learningImageUrl: url,
                  started_by: userInfo,
                  learnersLength: 1,
                  fires: [],
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                  db.collection("learnings")
                    .where("learning", "==", input)
                    .where("started_by", "==", userInfo)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());

                        db.collection("learnings")
                          .doc(doc.id)
                          .collection("learners")
                          .add({
                            learner: userInfo,
                          });
                      });
                    })
                    .catch((error) => {
                      console.log("Error getting documents: ", error);
                    });
                });
            }
          }
        );
      } else {
        db.collection("users").doc(user.uid).collection("myLearnings").add({
          learning: input,
          learningImageUrl: "",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        db.collection("learnings").add({
          learning: input,
          learningImageUrl: "",
          started_by: userInfo,
          learnersLength: 1,
          fires: [],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
      dispatch({
        type: actionTypes.OPEN_NEW_LEARNING_POPUP,
        openNewLearningPopup: false,
      });
    }
  };

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      {openNewLearningPopup === true && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon" onClick={close_popup} />
            </div>
            <div className="group_photo">
              {image ? (
                <Avatar
                  className="group_photo_avatar"
                  src={URL.createObjectURL(image)}
                />
              ) : (
                <Avatar className="group_photo_avatar" src="" />
              )}
              <div className="photo_input">
                <input
                  type="file"
                  id={"image"}
                  style={{ display: "none" }}
                  onChange={selectImage}
                  accept="image/git , image/jpeg , image/png"
                />
                <label htmlFor="image">
                  <p> Select Profile Photo for your learning</p>
                </label>
              </div>
              <div className="learning_detail">
                <input
                  type="text"
                  placeholder="What to learn new?"
                  maxlength="70"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="start_button">
                <button onClick={start_learning}>Start🚀</button>
              </div>
            </div>
          </div>
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

  .addLearning {
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    @media (max-width: 500px) {
      width: 85vw;
    }

    .add_learning_header {
      display: flex;
      justify-content: flex-end;

      .close_icon {
        margin-right: 5px;
        &:hover {
          color: #6d6969;
          cursor: pointer;
        }
      }
    }

    .group_photo {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .group_photo_avatar {
        width: 150px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
      }

      label {
        p {
          color: #006eff;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .learning_detail {
      width: 100%;
      display: flex;
      justify-content: center;

      input {
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        border: 1px solid gray;
        padding: 10px;
        width: 80%;
        outline: 0;
      }
    }
  }

  .start_button {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    width: 95%;

    button {
      width: 80px;
      padding: 7px;
      padding-top: 10px;
      padding-bottom: 10px;
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

export default NewLearningPopup;