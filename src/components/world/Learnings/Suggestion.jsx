import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
import Avatar from "@mui/material/Avatar";
import db from "../../../firebase";
import firebase from "firebase";
import {useHistory} from "react-router-dom"

function Suggestion({ type, suggestion, learningId , savedSuggestions }) {
  const [{ userInfo, user }, dispatch] = useStateValue();
  const [savedOne, setSavedOne] = useState(false);
  const history = useHistory();

  useEffect(() => {
      console.log("SaveSuggestionsa are" , savedSuggestions);
      for(let i = 0 ; i< savedSuggestions.length ; i++) {
          if(savedSuggestions[i]?.data?.suggestion?.learning === suggestion?.learning) {
              setSavedOne(true);
          }
      }
  } , [])

  const saveSuggestion = (e) => {
    console.log("LEARNING ID IS " , learningId);
    db.collection("learnings")
      .doc(learningId)
      .collection("savedSuggestions")
      .add({
        suggestion: suggestion,
        savedBy: userInfo?.name,
      })
      .then(() => {
        alert("Saved");
      });

      db.collection("users")
      .where("email", "==", suggestion?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection("users")
            .doc(doc.id)
            .collection("learntStuff")
            .where("learning", "==", suggestion?.learning)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc1) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                db.collection("users")
                  .doc(doc.id)
                  .collection("learntStuff")
                  .doc(doc1.id)
                  .update({
                    clicks: firebase.firestore.FieldValue.increment(1),
                  });
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  return (
    <Container>
      <div className="suggestion_header">
        {suggestion?.platform !== "others" && (
          <img src={suggestion?.iconUrl} alt="" />
        )}
      </div>
      <div className="suggestion_info">
        <Avatar src={userInfo?.profilePhotoUrl} className="info_avatar" />
        <div className="suggestion_learnt">
          {suggestion?.platform === "others" ? (
            <p className="learnt">{suggestion?.learning}</p>
          ) : (
            <>
              <p className="learnt">
                {suggestion?.learning} from{" "}
                <span className="name">
                  {suggestion?.platform === "youtube"
                    ? suggestion?.channelName
                    : suggestion?.courseName}
                </span>
              </p>
              
                <a
                  className="videoLink"
                  href={
                    suggestion?.platform === "youtube"
                      ? suggestion?.videoLink
                      : suggestion?.courseLink
                  }
                >
                  Click here to view Video
                </a>
           
            </>
          )}
        </div>
      </div>
      {type === "all" && (<div className="save">
        {savedOne?(<button>
            Saved
            </button>
            ):(
        <button onClick={saveSuggestion}>
            Save
        </button>)}
      </div>)}
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  border: 2px solid lightgray;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #fff;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    width : 90%;
  }

  .suggestion_header {
    display: flex;
    justify-content: flex-end;

    img {
      width: 60px;
      object-fit: contain;
    }
  }

  .suggestion_info {
    display: flex;
    margin-top: 1px;

    @media(max-width: 500px){
      margin-top : 5px;
    }
  }

  .info_avatar {
    width: 60px;
    height: 60px;
  }

  .suggestion_learnt {
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    p {
      margin-top: 0;
      margin-bottom: 0;
    }

    a {
      color: #026fd4;
      text-decoration: none;
      margin-top: 8px;

      @media(max-width: 500px){
        margin-top : 2px;
      }

      &:hover {
        cursor: pointer;
        color: #349cfd;
      }
    }

    .tag {
      border-radius: 20px;
      padding: 7px;
      margin-left: 5px;
      margin-right: 5px;
      font-size: 14px;
      background-color: blue;
      color: white;
    }

    .name {
      font-style: italic;
      font-weight: 500;
    }
  }

  .save {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 0px;

    button {
      width: 70px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #6868fa;
      color: white;

      @media(max-width: 500px){
        padding-top: 7px;
      padding-bottom: 7px;
      width : 60px;
      }

      &:hover {
        cursor: pointer;
        background-color: #9595ff;
      }
    }
  }
`;

export default Suggestion;
