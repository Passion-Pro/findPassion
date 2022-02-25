import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";
import firebase from "firebase";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function Learning({ learning,learningL, type, learnings }) {
  const history = useHistory();
  const [{ user, userInfo }, dispatch] = useStateValue();
  const [requestSent, setRequestSent] = useState(false);
  const [fires, setFires] = useState([]);
  const [fired, setFired] = useState(false);
  const [joinedId, setJoinedId] = useState();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [profileId,setProfileId]=useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const[requests , setRequests] = useState([]);


  // useEffect(() => {
  //   if(learning?.data?.learningId){

  //   }
  // })
  const goToProfilePage = (e) => {
    e.preventDefault();
    if(profileId)
          history.push(`/viewProfile/${profileId}`);
  };

  useEffect(() => {
    if (user?.uid  && userInfo) {
      if(type === 'joined'){
        console.log("JOINED" , learning);
      }
      var CardEmail = type==='joined' 
      ? learning?.data?.started_by
      : learning?.data?.started_by?.email;
      db.collection("users")
        .where("email", "==", CardEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setProfileId(doc?.id);
            setProfilePhotoUrl(doc.data().profilePhotoUrl);




            db.collection("users")
              .doc(doc.id)
              .collection("learnRequests")
              .where("requestEmail", "==", user?.email)
              .where("learningId" , "==" , learning?.id)
              .get()
              .then((querySnapshot) => {
                //  if(querySnapshot.empty === true) {
                //    alert("Empty")
                //  }
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());

                  if (doc.data().status === "pending") {
                    setRequestSent(true);
                  }
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
    }
  }, []);



  useEffect(() => {
    if (learning?.id) {
      db.collection("learnings")
        .doc(learning?.id)
        .onSnapshot((snapshot) => {
          setFires(snapshot.data().fires);
        });
    }
  }, [learning?.id]);

  // useEffect(() => {
  //   if (type === "joined" && learnings) {
  //     console.log(learnings);
  //     for (let i = 0; i < learnings.length; i++) {
  //       if (
  //         learnings[i].data.learning === learning?.data?.learning &&
  //         learnings[i].data.started_by?.email ===
  //           learning?.data?.started_by?.email
  //       ) {
  //         console.log("YES");
  //         setJoinedId(learning?.id);
  //       }
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (type === "joined" && joinedId) {
  //     db.collection("learnings")
  //       .doc(joinedId)
  //       .onSnapshot((snapshot) => {
  //         setFires(snapshot.data().fires);
  //       });
  //   }
  // }, [joinedId]);

  useEffect(() => {
    if (fires?.length > 0) {
      for (let i = 0; i < fires.length; i++) {
        if (fires[i]?.email === userInfo?.email) {
          setFired(true);
        }
      }
    }
  }, [fires?.length]);

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
              requestEmail: user?.email,
              requestName: userInfo?.name,
              learningId: learning?.id,
              started_by:learning?.data?.started_by?.email,
              learning: learning?.data?.learning,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              status: "pending",
            })
            .then(() => {
              alert("Join Request Sent!....");
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const fireUp_learning = (e) => {
    e.preventDefault();
    fires.push({
      email: userInfo?.email,
    });
    if (type === "joined") {
      db.collection("learnings").doc(joinedId).update({
        fires: fires,
      });
    } else {
      db.collection("learnings").doc(learning?.id).update({
        fires: fires,
      });
    }
    setFired(true);
  };

  const removeFromFires = (e) => {
    e.preventDefault();

    for (let i = 0; i < fires?.length; i++) {
      if (fires[i]?.email === userInfo?.email) {
        fires.splice(i);
      }
    }

    if (type === "joined") {
      db.collection("learnings").doc(joinedId).update({
        fires: fires,
      });
    } else {
      db.collection("learnings").doc(learning?.id).update({
        fires: fires,
      });
    }

    setFired(false);
  };

  return (
    <>
      <Container>
        <div className="learning_header">
          <div
            style={{
              display: "flex",
            }}
            className="learning_uploader"
          >
            <Avatar src={profilePhotoUrl} className="avatar" />
            <p className="learning_name" onClick={goToProfilePage}>
              {type === `my` ? userInfo?.name : type === `joined` ? learning?.data?.startedName : learning?.data?.started_by?.name}

            </p>
          </div>
          {/* <div className="fire_icon">
            {fired === false ? (
              <LocalFireDepartmentIcon
                className="fire_icon"
                onClick={fireUp_learning}
              />
            ) : (
              <LocalFireDepartmentIcon
                className="firedUp_icon"
                onClick={removeFromFires}
              />
            )}
          </div> */}
        </div>
        <div className="learning">
          <p>
            {learning?.data?.learning}
          </p>
        </div>
        <div className="started_date">
          <p>Started on {learning?.data?.date}</p>
        </div>
        {/* {learning?.data?.learnersLength > 1 && (
          <div className="number_of_students">
            <p>🔥{learning?.data?.learnersLength} students</p>
          </div>
        )} */}
        <div className="join_button" style={{}}>
          {type === "my" || type === "joined" ? (
            <>
              {type === "my" && (
                <button
                  onClick={(e) => history.push(`/learning/${learning?.id}`)}
                >
                  View
                </button>
              )}
              {type === "joined" && (
                <button onClick={(e) => history.push(`/learning/${learning?.data?.learningId}`)}>
                  View
                </button>
              )}
            </>
          ) : (
            <>
              {requestSent === false ? (
                <button onClick={send_join_request}>Join</button>
              ) : (
                <button
                  onClick={() => {
                    alert("Join Request Sent!....!");
                  }}
                >
                  Join
                </button>
              )}
            </>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 190px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
  margin-right: 30px;
  margin-bottom: 20px;
  background-color: white;

  @media (max-width: 700px) {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 500px) {
    width: 40vw;
    margin-right: auto;
    margin-left: auto;
  }

  .learning_header {
    display: flex;
    justify-content: space-between;

    .avatar {
      width: 25px !important;
      height: 25px !important;
      margin-top : 0 !important;
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
    flex: 1;
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
    margin-bottom: 2px !important;
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

  .fire_icon {
    margin-top: auto;
    margin-bottom: auto;
    font-size: 24.5px;
    /* color : #ff6600; */
    &:hover {
      cursor: pointer;
      color: #5c5c5c;
    }
  }

  .firedUp_icon {
    font-size: 24.5px;
    color: #ff6600;
    &:hover {
      cursor: pointer;
      color: #fc8434;
    }
  }

  .learning_name {
    margin-top: 2px !important;
  }

  .learning_uploader {
    &:hover {
      cursor: pointer;

      p {
        &:hover {
          color: #1b7ae7;
        }
      }
    }
  }
`;

export default Learning;
