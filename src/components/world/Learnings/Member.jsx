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

  useEffect(() => {
    if (learner?.data?.learner?.email) {
      db.collection("users")
        .where("email", "==", learner?.data?.learner?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            setId(doc.id);

            db.collection("users")
              .doc(doc.id)
              .collection("myJoinedLearnings")
              .onSnapshot((snapshot) =>
                setJoinedLearnings(
                  snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                  }))
                )
              );

            setProfilePhotoUrl(doc.data().profilePhotoUrl);
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
        email : learner?.data?.learner?.email,
        name : learner?.data?.learner?.name,
        id : learner?.id
      }
    })

    
  };

  return (
    <>
      <Container>
        <Avatar
          className="avatar"
          src={profilePhotoUrl}
          onClick={(e) => history.push("/profile")}
        />
        {console.log(learner)}
        <div
          className="chatName_info"
          onClick={(e) => history.push("/profile")}
        >
          <p>{learner?.data?.learner?.name}</p>
        </div>
        {console.log("Started by email is ", learning?.started_by?.email)}
        {user?.email === learning?.started_by?.email &&
          learner?.data?.learner?.email !== user?.email && (
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
