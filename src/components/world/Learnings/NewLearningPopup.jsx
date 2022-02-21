import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import db, { auth, storage } from "../../../firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid";

function NewLearningPopup({tags}) {
  const [{ openNewLearningPopup, user, userInfo }, dispatch] = useStateValue();
  const [image, setImage] = useState();
  const [input, setInput] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [learnings, setLearnings] = useState([]);
  const[launch , setLaunch] = useState(false);
  const[tagInput , setTagInput] = useState("");
  const[suggestedTags ,setSuggestedTags] = useState([]);
  const[x , setX] = useState(0)
  

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


  useEffect(() => {
     console.log("tags are" , tags)
  } , [tags?.length ]);




  const close_popup = () => {
    dispatch({
      type: actionTypes.OPEN_NEW_LEARNING_POPUP,
      openNewLearningPopup: false,
    });
  };

  const start_learning = (e) => {
    e.preventDefault();
    console.log("Image URl is ", imageUrl);
    var today = new Date();
    var date = today.toLocaleString();
    if (learnings?.length < 5) {
      setLaunch(true);
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
                  started_by : userInfo,
                  learnersLength: 1,
                  fires: [],
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  tags : suggestedTags,
                  date : date
                })
                .then(() => {
                  console.log("THen Step is arrived");
                  db.collection("learnings")
                    .where("learning", "==", input)
                    .where("learningImageUrl", "==" , url)
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
          tags : suggestedTags,
          date : date
        });
      }
      setTimeout(() => {
        dispatch({
          type: actionTypes.OPEN_NEW_LEARNING_POPUP,
          openNewLearningPopup: false,
        });
      } , 1000)
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
          <div className= {launch === false ? `addLearning` : `addLearning_launch`}>
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
                <div className="selected_tags">
                  {suggestedTags.map((tag , index) => (
                    <div className="selected_tag_popup">
                      <p>{tag?.name}</p>
                      <CloseIcon className="tag_close_icon" onClick = {() => {
                         suggestedTags.splice(index,1); 
                         setX(x+1);
                         
                      }}/>

                    </div>
                  ))}
                </div>
                <div className="add_tags">
                     <p
                      style = {{
                        display : 'none'
                      }}
                     >{x}</p>
                     <p>Add Tags</p>
                      <input type="text" 
                       placeholder="Enter technology name eg.language , framework"
                       value = {tagInput}
                       onChange={(e) => setTagInput(e.target.value)}
                      />

                      <div className="suggested_tags">
                         {tagInput && tags && 
                          tags
                          .filter((item) => {
                            return item?.name
                              .toLowerCase()
                              .includes(tagInput.toLowerCase());
                          })
                          .map((data) => (
                            <p className = "tag"
                             onClick = {() => {
                               let x = 0;
                               if(suggestedTags?.length > 0){
                                for(let i = 0 ; i < suggestedTags?.length ; i++){
                                  if(suggestedTags[i] === data){
                                    x = 1;
                                  }
                                  if(x === 0 && i === suggestedTags.length-1){
                                    suggestedTags.push(data);
                                    setTagInput("")
                                    console.log( "Suggested Tags are ", suggestedTags);
                                  }
                                }
                               }else{
                                suggestedTags.push(data);
                                console.log( "Suggested Tags are ", suggestedTags);
                                setTagInput("")
                               }
                             }}
                            >{data?.name}</p>
                          ))
                         }
                      </div>
                </div>
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
      flex-direction: column;

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


  .addLearning_launch{
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
    position : absolute;
    animation : fly 1s 0.005s ease-in-out;

    @keyframes fly{
      0%{
        margin : auto;
        bottom : 30%;
      }
      100%{
        bottom : 100%;
        margin-left : auto;
        margin-right : auto;
      }
    }


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

  .add_tags{
    margin-left : 30px;
    p{
      margin-top : 10px;
      margin-bottom : 10px;
      
      width : fit-content;
    }
    
    input{
      width : 85% !important;
    }


  }

  .suggested_tags{
    display : flex;
    flex-wrap : wrap;
    max-height : 100px;
    overflow-y : scroll;
    margin-top : 20px;

    ::-webkit-scrollbar {
      display : none;
    }

  }


  .tag{
    padding : 7px;
    border-radius : 5px;
    margin-right : 10px;
    margin-top : 5px;
    margin-bottom : 5px;
    border : 1px solid lightgray;
    font-size : 13px;
    background-color : #e6e4e4;

    &:hover {
      cursor : pointer;
      background-color : #bdbdbd;
    }

  }

  .selected_tag_popup{
    display : flex; 
    background-color : #f1f0f0;
    padding : 7px;
    border-radius : 5px;
    margin-right : 10px;
    margin-top : 5px;
    margin-bottom : 5px;
    border : 1px solid lightgray;
    width : fit-content !important;
    
    p{
      margin-top : 0;
      margin-bottom : 0;
      width : fit-content;
      font-size : 13px;

    }
  }

  .tag_close_icon{
    font-size : 17px;
    margin-left : 5px;
    margin-top : 2px;

    &:hover {
      cursor : pointer;
      color : #3d3d3d;
    }

  }

  .selected_tags{
    display : flex;
    flex-wrap : wrap;
    margin-left : 30px;
    margin-top : 10px;
  }



  
`;

export default NewLearningPopup;
