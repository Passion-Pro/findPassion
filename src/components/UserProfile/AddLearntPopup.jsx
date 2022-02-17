import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import CloseIcon from "@mui/icons-material/Close";
import { actionTypes } from "../../reducer";
import db from "../../firebase";
import firebase from "firebase";

function AddLearntPopup({ tags }) {
  const [{ openAddLearntPopup, user, userInfo }, dispatch] = useStateValue();
  const [platform, setPlatform] = useState('');
  const [input, setInput] = useState();
  const [channelName, setChannelName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [learningInfo, setLearningInfo] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [x, setX] = useState(0);
  

  const close_popup = () => {
    dispatch({
      type: actionTypes.OPEN_ADD_LEARNT_POPUP,
      openAddLearntPopup: false,
    });
  };
useEffect(()=>{
setPlatform('')
},[openAddLearntPopup])
  const add_learnt = (e) => {
    e.preventDefault();
    if (input !== "") {
      if (platform === "youtube") {
        db.collection("users")
          .doc(user?.uid)
          .collection("learntStuff")
          .add({
            learning: input,
            platform: "youtube",
            channelName: channelName,
            videoLink: videoLink,
            tags : suggestedTags,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            iconUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png",
            email : user?.email
          })
          .then(() => {
            dispatch({
              type: actionTypes.OPEN_ADD_LEARNT_POPUP,
              openAddLearntPopup: false,
            });
          });
      } else if (platform === "others") {
        db.collection("users")
          .doc(user?.uid)
          .collection("learntStuff")
          .add({
            learning: input,
            platform: "others",
            learningInfo: learningInfo,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            iconUrl: "https://cdn.worldvectorlogo.com/logos/udemy-2.svg",
            tags : suggestedTags
          })
          .then(() => {
            dispatch({
              type: actionTypes.OPEN_ADD_LEARNT_POPUP,
              openAddLearntPopup: false,
            });
          });
      } else {
        if (platform === "udemy") {
          db.collection("users")
            .doc(user?.uid)
            .collection("learntStuff")
            .add({
              learning: input,
              platform: "youtube",
              courseName: courseName,
              courseLink: courseLink,
              tags : suggestedTags,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              iconUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png",
            })
            .then(() => {
              dispatch({
                type: actionTypes.OPEN_ADD_LEARNT_POPUP,
                openAddLearntPopup: false,
              });
            });
        } else {
          db.collection("users")
            .doc(user?.uid)
            .collection("learntStuff")
            .add({
              learning: input,
              platform: "youtube",
              courseName: courseName,
              courseLink: courseLink,
              tags : suggestedTags,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              iconUrl:
                "https://images.squarespace-cdn.com/content/v1/5ff6eeb8f618516fe5a338ad/1610018598147-DDJT8UCHOA4OMES6U7YB/image-asset.png?format=1000w",
            })
            .then(() => {
              dispatch({
                type: actionTypes.OPEN_ADD_LEARNT_POPUP,
                openAddLearntPopup: false,
              });
            });
        }
      }
    }
  };

  return (
    <>
      {openAddLearntPopup === true && (
        <Container>
          <div className="addLearntPopup">
            <div className="addLearntPopup_header">
              <CloseIcon className="close_icon" onClick={close_popup} />
            </div>
            <div className="learning_info">
              <input
                type="text"
                maxLength={100}
                placeholder="What have you learnt?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="selected_tags">
                {suggestedTags.map((tag, index) => (
                  <div className="selected_tag">
                    <p>{tag?.name}</p>
                    <CloseIcon
                      className="tag_close_icon"
                      onClick={() => {
                        suggestedTags.splice(index, 1);
                        setX(x + 1);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="add_tags">
                <p
                  style={{
                    display: "none",
                  }}
                >
                  {x}
                </p>
                <p
                 style = {{
                   fontSize : '14px',
                   marginLeft : '5px'
                 }}
                >Add Tags to better describe your learning</p>
                <input
                  type="text"
                  placeholder="Enter technology name eg.language , framework"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />

                <div className="suggested_tags">
                  {console.log("Tags are " , tags)}
                  {tagInput &&
                    tags &&
                    tags
                      .filter((item) => {
                        return item?.name
                          .toLowerCase()
                          .includes(tagInput.toLowerCase());
                      })
                      .map((data) => (
                        <p
                          className="tag"
                          onClick={() => {
                            let x = 0;
                            if (suggestedTags?.length > 0) {
                              for (let i = 0; i < suggestedTags?.length; i++) {
                                if (suggestedTags[i] === data) {
                                  x = 1;
                                }
                                if (x === 0 && i === suggestedTags.length - 1) {
                                  suggestedTags.push(data);
                                  setTagInput("");
                                  console.log(
                                    "Suggested Tags are ",
                                    suggestedTags
                                  );
                                }
                              }
                            } else {
                              suggestedTags.push(data);
                              console.log("Suggested Tags are ", suggestedTags);
                              setTagInput("");
                            }
                          }}
                        >
                          {data?.name}
                        </p>
                      ))}
                </div>
              </div>
            </div>
            <div className="learning_platform">
              <p>Choose your learning platform</p>
              <div className="icons">
                <div
                  className="youtube_icon icon "
                  onClick={() => setPlatform("youtube")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
                    alt=""
                  />
                </div>
                <div
                  className="udemy_icon icon"
                  onClick={() => setPlatform("udemy")}
                >
                  <img
                    src="https://cdn.worldvectorlogo.com/logos/udemy-2.svg"
                    alt=""
                  />
                </div>
                <div
                  className="udemy_icon coursera_icon icon"
                  onClick={() => setPlatform("coursera")}
                >
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/5ff6eeb8f618516fe5a338ad/1610018598147-DDJT8UCHOA4OMES6U7YB/image-asset.png?format=1000w"
                    alt=""
                  />
                </div>
                <div className="others_button">
                  <button onClick={() => setPlatform("others")}>Others</button>
                </div>
              </div>
            </div>
            <div className="learning_description">
              {platform === "youtube" && (
                <div className="youtube_description">
                  <div className="channel_name">
                    <p>Channel Name: </p>
                    <input
                      type="text"
                      placeholder="Enter channel name"
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                    />
                  </div>
                  <div className="video_link">
                    <p>Video link: </p>
                    <input
                      type="text"
                      placeholder="Enter video link"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {(platform === "udemy" || platform === "coursera") && (
                <div className="youtube_description">
                  <div className="channel_name">
                    <p>Course Name: </p>
                    <input
                      type="text"
                      placeholder="Enter course name"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  </div>
                  <div className="video_link">
                    <p>Course link: </p>
                    <input
                      type="text"
                      placeholder="Enter course link"
                      value={courseLink}
                      onChange={(e) => setCourseLink(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {platform === "others" && (
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Enter details about the platform where you learnt"
                  value={learningInfo}
                  onChange={(e) => setLearningInfo(e.target.value)}
                ></textarea>
              )}
            </div>
            <div className="add_button">
              <button onClick={add_learnt}>Add</button>
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

  .addLearntPopup {
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
  }

  .addLearntPopup_header {
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    font-size: 18px !important;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;

    &:hover {
      cursor: pointer;
      color: #555454;
    }
  }

  .learning_info {
    width: 90%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    flex-direction: column;

    input {
      margin-left: auto;
      margin-right: auto;
      border-radius: 10px;
      border: 1px solid gray;
      padding: 10px;
      width: 100%;
      outline: 0;
    }
  }

  .learning_platform {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    p {
      margin-bottom: 5px;
    }
  }

  .icons {
    display: flex;
    flex-direction: column;

    .icon {
      margin-top: 5px;
      margin-bottom: 5px;
      border: 1px solid lightgray;
      width: 40%;
      padding: 7px;
      border-radius: 30px;
      padding-left: 10px;

      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
      img {
        width: 60%;
        object-fit: contain;
      }
    }

    .youtube_icon {
      margin-top: 15px;
      padding-top: 10px;
      padding-bottom: 10px;

      img {
        width: 60%;
        object-fit: contain;
      }
    }

    .coursera_icon {
      padding-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .others_button {
      button {
        padding: 9px;
        width: 43%;
        margin-left: 5px;
        background-color: #e9e7e7;
        border-radius: 20px;
        border: 1px solid lightgray;

        &:hover {
          cursor: pointer;
          background-color: lightgray;
        }
      }
    }
  }

  .learning_description {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;

    textarea {
      resize: none;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid gray;
      outline: 0;
      height: 100px;
    }

    .youtube_description {
      border: 1px solid lightgray;
      border-radius: 10px;
      padding: 10px;

      p {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 14px;
      }

      .channel_name {
        margin-bottom: 10px;

        input {
          width: 300px;
          margin-top: 3px;
          border-radius: 5px;
          border: 1px solid gray;
          padding: 5px;
          width: 90%;
          outline: 0;
        }
      }

      .video_link {
        margin-bottom: 10px;

        input {
          width: 300px;
          margin-top: 3px;
          border-radius: 5px;
          border: 1px solid gray;
          padding: 5px;
          width: 90%;
          outline: 0;
        }
      }
    }
  }

  .add_button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

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

 

  .suggested_tags{
    display : flex;
    flex-wrap : wrap;
    max-height : 85px;
    overflow-y : scroll;
    margin-top : 20px;

    ::-webkit-scrollbar{
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-track {
    background: #d8d4d4; 
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555; 
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

  .selected_tag{
    display : flex; 
    background-color : #f1f0f0;
    padding : 7px;
    border-radius : 5px;
    margin-right : 10px;
    margin-top : 5px;
    margin-bottom : 5px;
    border : 1px solid lightgray;
    
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
`;

export default AddLearntPopup;
