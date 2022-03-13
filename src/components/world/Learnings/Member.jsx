import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function Member({ learner, learning, learningId }) {
  const history = useHistory();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [id, setId] = useState();
  const [joinedLearnings, setJoinedLearnings] = useState([]);
  const[name  , setName] = useState();

  useEffect(() => {
    if (learner) {
      db.collection("users")
        .where("email", "==", learner)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("Name is ", " => ", doc.data().name);

            setId(doc.id);

            setProfilePhotoUrl(doc.data().profilePhotoUrl);
            setName(doc.data().name);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [learner]);

  const removePerson = (e) => {
    e.preventDefault();

    dispatch({
      type: actionTypes.OPEN_REMOVE_MEMBER_POPUP,
      openRemoveMemberPopup: true,
    });

    

    dispatch({
      type : actionTypes.SET_LEARNER,
      learner : {
        email : learner,
        name : name,
      }
    })

    
  };

  return (
    <>
      <Container>
        <Avatar
          className="avatar"
          src={profilePhotoUrl}
          onClick={(e) => {
            if(learner !==  user?.email){
              history.push(`/viewprofile/${id}`)
            }else{
              history.push(`/userProfile`)
            }
          }}
        />
        {console.log(learner)}
        <div
          className="chatName_info"
          onClick={(e) => {
            if(learner !==  user?.email){
              history.push(`/viewprofile/${id}`)
            }else{
              history.push(`/userProfile`)
            }
          }}
        >
          <p>{name}</p>
        </div>
        {console.log("Started by email is ", learning?.started_by?.email)}
        {user?.email === learning?.started_by?.email &&
          learner !== user?.email && (
            <PersonRemoveIcon className="reove_icon" onClick={removePerson} />
          )}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  border-bottom: 1px solid lightgray;

  .chatName_info {
    display: flex;
    flex-direction: column;
    flex: 1;
    p {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 20px;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .avatar {
    margin-top: 2px;
    width: 40px;
    height: 40px;

    &:hover {
      cursor: pointer;
    }
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

  .reove_icon {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
      color: gray;
    }
  }
`;

export default Member;
