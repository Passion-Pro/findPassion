import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";
import firebase from "firebase"


function Learning({ learning, type }) {
  const history = useHistory();
  const [{ user, userInfo }, dispatch] = useStateValue();

  const send_join_request = (e) => {
    e.preventDefault();

    db.collection("users")
      .where("email", "==", learning?.data?.started_by?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          db.collection("users")
            .doc(doc.id)
            .collection("learnRequests")
            .add({
              requestFrom: userInfo,
              learning : learning,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),

            })
            .then(() => {
              alert("Join Request Sent!");
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <Container>
      <div className="learning_header">
        <Avatar
          src={
            type === `my`
              ? userInfo?.profilePhotoUrl
              : learning?.data?.started_by?.profilePhotoUrl
          }
          className="avatar"
        />
        <p>
          {type === `my` ? userInfo?.name : learning?.data?.started_by?.name}
        </p>
      </div>
      <div className="learning">
        <p>{learning?.data?.learning}</p>
      </div>
      <div className="started_date">
        <p>Started on 8th November 2021</p>
      </div>
      {learning?.data?.learnersLength > 1 && (
        <div className="number_of_students">
          <p>🔥{learning?.data?.learnersLength} students</p>
        </div>
      )}
      <div className="join_button" style={{}}>
        {type === "my" ? (
          <button onClick={(e) => history.push("/learningGroup")}>View</button>
        ) : (
          <button onClick={send_join_request}>Join</button>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: fit-content;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
  margin-right: 30px;
  margin-bottom: 30px;

  @media (max-width: 500px) {
    width: 95vw;
    margin-right: auto;
    margin-left: auto;
  }

  .learning_header {
    display: flex;

    .avatar {
      width: 25px;
      height: 25px;
    }

    p {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 5px;
      font-size: 14px;
    }
  }

  .learning {
    p {
      margin-top: 10px;
      margin-left: 5px;
      margin-bottom: 0;
      font-family: "Helvetica Neue";
      font-weight: 500;
    }
  }

  .started_date {
    font-size: 12px;
    p {
      margin-top: 5px;
      margin-bottom: 0px;
      margin-left: 5px;
      font-style: italic;
    }
  }

  .number_of_students {
    p {
      margin-top: 5px;
      margin-left: 5px;
      margin-bottom: 0px;
    }
  }

  .join_button {
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
    margin-bottom: 2px;
    margin-top: 10px;

    button {
      width: 60px;
      padding: 7px;
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

export default Learning;
