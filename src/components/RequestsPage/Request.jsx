import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import db from "../../firebase";
import Avatar from "@mui/material/Avatar";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function Request({ request, learnings }) {
  const [{ user, userInfo }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    console.log("ABC", request?.data?.learning?.data?.started_by);
  }, []);

  const accept_request = (e) => {
    e.preventDefault();

    if (request?.data?.requestEmail) {
      console.log("YES");
      db.collection("users")
        .doc(user?.uid)
        .collection("learnRequests")
        .where("requestEmail", "==", request?.data?.requestEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().learning?.learning);

            if (
              doc.data().learning?.data?.learning ===
              request?.data?.learning?.data?.learning
              && doc.data().status !== "accepted"
            ) {
              console.log("2nd Step");
              db.collection("users")
                .doc(user?.uid)
                .collection("learnRequests")
                .doc(doc.id)
                .update({
                  status: "accepted",
                });

              for (let i = 0; i < learnings?.length; i++) {
                if (
                  learnings[i]?.data?.started_by?.email ===
                    request?.data?.learning?.data?.started_by?.email &&
                  learnings[i]?.data?.learning ===
                    request?.data?.learning?.data?.learning
                ) {
                  db.collection("learnings")
                    .doc(learnings[i]?.id)
                    .collection("learners")
                    .add({
                      learner: {
                        email: request?.data?.requestEmail,
                        name: request?.data?.requestName,
                      },
                    });

                    console.log("GOT");
                }
              }

              // db.collection("learnings")
              //   .where("started_by", "==", request?.data?.learning?.data?.started_by)
              //   .get()
              //   .then((querySnapshot) => {
              //     querySnapshot.forEach((doc1) => {
              //       // doc.data() is never undefined for query doc snapshots

              //       console.log(doc1.id, " => ", doc1.data());

              //       if (
              //         doc1.data()?.learning?.learning ===
              //         request?.data?.learning?.data?.learning
              //       ) {
              //         console.log("ADDED");
              //         db.collection("learnings")
              //           .doc(doc1.id)
              //           .collection("learners")
              //           .add({
              //             learner: {
              //               email : request?.data?.requestEmail,
              //               name : request?.data?.requestName
              //             },
              //           });
              //       }

              //       db.collection("users")
              //         .doc(doc1.id)
              //         .onSnapshot((snapshot) =>
              //           dispatch({
              //             type: actionTypes.SET_USER_INFO,
              //             userInfo: snapshot.data(),
              //           })
              //         );
              //     });
              //   })
              //   .catch((error) => {
              //     console.log("Error getting documents: ", error);
              //   });
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      db.collection("users")
        .where("email", "==", request?.data?.requestEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            db.collection("users")
              .doc(doc.id)
              .collection("myJoinedLearnings")
              .add({
                learning: request?.data?.learning,
                joined_on: firebase.firestore.FieldValue.serverTimestamp(),
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const delete_request = () => {
    db.collection("users")
      .doc(user?.uid)
      .collection("learnRequests")
      .where("requestEmail", "==", request?.data?.requestEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          if (
            doc.data().learning?.learning ===
            request?.data?.learning?.data?.learning
          ) {
            db.collection("users")
              .doc(user?.uid)
              .collection("learnRequests")
              .doc(doc.id)
              .delete();
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const goToProfilePage = (e) => {
    e.preventDefault();

    db.collection("users")
      .where("email", "==", request?.data?.requestEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          history.push(`/viewProfile/${doc.id}`);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <Container>
      <div className="request_info">
        <Avatar className="request_info_avatar" src="" />
        <div className="request_name_info">
          <p oncClick={goToProfilePage}>
            <span className="name">{request?.data?.requestName}</span> has
            requested to join your learning
          </p>
          <span className="learning">
            {request?.data?.learning?.data?.learning}
          </span>
        </div>
      </div>
      <div className="buttons">
        <button className="accept" onClick={accept_request}>
          Accept
        </button>
        <button className="delete" onClick={delete_request}>
          Delete
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 450px;
  background-color: white;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);

  .request_info {
    display: flex;
    /* flex-direction : column; */

    span {
      &:hover {
        cursor: pointer;
        color: #006eff;
      }
    }

    .name {
      font-family: "Helvetica Neue";
    }

    .learning {
      margin-top: 7px !important;
      font-size: 17px;
      font-weight: 500;
    }

    .request_name_info {
      p {
        margin-top: 0;
        margin-bottom: 3px;
      }

      span {
        &:hover {
          cursor: pointer;
          color: #1b7ae7;
        }
      }
    }
  }

  .request_info_avatar {
    margin-right: 10px;
    width: 60px;
    height: 60px;
  }

  .buttons {
    display: flex;
    margin-top: 0px;
    justify-content: flex-end;

    .accept {
      width: 80px;
      padding: 5px;
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

    .delete {
      width: 80px;
      padding: 5px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #00d9ff;
      color: white;
      margin-left: 10px;

      &:hover {
        cursor: pointer;
        background-color: #8eebfc;
      }
    }
  }
`;

export default Request;
