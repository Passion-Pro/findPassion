import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import Learning from "./Learnings/Learning";
import { useHistory } from "react-router-dom";
import NewLearningPopup from "./Learnings/NewLearningPopup";
import db from "../../firebase";

function WorldPage() {
  const history = useHistory();
  const [{ user, userInfo }, dispatch] = useStateValue();
  const [myLearnings, setMyLearnings] = useState([]);
  const [allLearnings, setAllLearnings] = useState([]);
  const [learnings, setLearnings] = useState([]);
  const [joinedLearnings, setJoinedLearnings] = useState([]);
  const [learnings1, setLearnings1] = useState([]);
  const [learnings2, setLearnings2] = useState([]);
  const [learnings3, setLearnings3] = useState([]);
  const [learnings4, setLearnings4] = useState([]);
  const [learnings5, setLearnings5] = useState([]);
  const [learnings6, setLearnings6] = useState([]);
  const [learnings7, setLearnings7] = useState([]);
  const [learnings8, setLearnings8] = useState([]);
  const [learnings9, setLearnings9] = useState([]);
  const [learnings10, setLearnings10] = useState([]);
  const [learnings11, setLearnings11] = useState([]);
  const [learnings12, setLearnings12] = useState([]);
  const [learnings13, setLearnings13] = useState([]);
  const [newLearnings, setNewLearnings] = useState([]);
  const [x, setX] = useState(0);
  // let newLearnings = allLearnings

  useEffect(() => {
    db.collection("learnings").onSnapshot((snapshot) =>
      setAllLearnings(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    );

    db.collection("learnings").onSnapshot((snapshot) =>
      setNewLearnings(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    );
  }, []);

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_USER_INFO,
            userInfo: snapshot.data(),
          });
        });

      // db.collection("users")
      //   .doc(user?.uid)
      //   .collection("myLearnings")
      //   .onSnapshot((snapshot) =>
      //     setMyLearnings(
      //       snapshot.docs.map((doc) => ({
      //         data: doc.data(),
      //         id: doc.id,
      //       }))
      //     )
      //   );

      db.collection("users")
        .doc(user?.uid)
        .collection("myJoinedLearnings")
        .onSnapshot((snapshot) =>
          setJoinedLearnings(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }

    console.log("My Learnings is ", myLearnings);
  }, [user?.uid]);

  useEffect(() => {
    if (allLearnings?.length > 0 && joinedLearnings?.length > 0) {
      for (let i = 0; i < allLearnings?.length; i++) {
        for (let j = 0; j < joinedLearnings?.length; j++) {
          if (
            newLearnings[i]?.data?.learning ===
            joinedLearnings[j]?.data?.learning?.data?.learning
          ) {
            newLearnings.splice(i);
            console.log("Spliced", newLearnings);
          }
        }
      }
    }
  }, [
    newLearnings?.length,
    user,
    joinedLearnings?.length,
    allLearnings?.length,
  ]);

  useEffect(() => {
    if (
      newLearnings?.length > 0 &&
      allLearnings?.length > 0 &&
      joinedLearnings?.length > 0
    ) {
      if (
        newLearnings?.length ===
        allLearnings?.length - joinedLearnings?.length
      ) {
        setLearnings(newLearnings);
      }
    }
  }, [newLearnings?.length, joinedLearnings?.length, allLearnings?.length]);

  useEffect(() => {
    // console.log("All Learnings Length is ", allLearnings?.length);
    // console.log("Joined Learnings Length is ", joinedLearnings?.length);
    // console.log("Learnings Length is", learnings?.length);
    if (
      learnings?.length > 0 &&
      userInfo?.passion &&
      userInfo?.experience &&
      newLearnings?.length > 0
    ) {
      console.log("OK");
      for (let i = 0; i < learnings?.length; i++) {
        // console.log("Ran");
        // console.log(learnings[i]?.data?.started_by?.email);
        // console.log(user?.email);
        if (learnings[i]?.data?.started_by?.email !== user?.email) {
          setX(1);
          if (
            learnings[i]?.data?.started_by?.passion === userInfo?.passion &&
            learnings[i]?.data?.started_by?.experience === userInfo?.experience
          ) {
            console.log("First Cases");
            learnings1.push(learnings[i]);
            console.log("Learnings 1 are", learnings1);
          } else if (
            learnings[i]?.data?.started_by?.passion === userInfo?.passion &&
            learnings[i]?.data?.started_by?.experience !== userInfo?.experience
          ) {
            const z = Math.abs(
              learnings[i]?.data?.started_by?.experience - userInfo?.experience
            );
            if (z === 0) {
              learnings2.push(learnings[i]);
            } else if (z === 1) {
              learnings3.push(learnings[i]);
            } else if (z === 2) {
              learnings4.push(learnings[i]);
            } else if (z === 3) {
              learnings5.push(learnings[i]);
            } else if (z === 4) {
              learnings6.push(learnings[i]);
            } else if (z === 5) {
              learnings7.push(learnings[i]);
            }
          } else if (
            learnings[i]?.data?.started_by?.passion !== userInfo?.passion
          ) {
            if (learnings[i]?.data?.started_by?.experience === 0) {
              learnings8.push(learnings[i]);
            } else if (learnings[i]?.data?.started_by?.experience === 1) {
              learnings9.push(learnings[i]);
            } else if (learnings[i]?.data?.started_by?.experience === 2) {
              learnings10.push(learnings[i]);
            } else if (learnings[i]?.data?.started_by?.experience === 3) {
              learnings11.push(learnings[i]);
            } else if (learnings[i]?.data?.started_by?.experience === 4) {
              learnings12.push(learnings[i]);
            } else if (learnings[i]?.data?.started_by?.experience === 5) {
              learnings13.push(learnings[i]);
            }
          }
        }
      }
    }
  }, [learnings?.length, userInfo?.passion, userInfo?.experience, user ,  joinedLearnings?.length]);

  const add_learning = () => {
    dispatch({
      type: actionTypes.OPEN_NEW_LEARNING_POPUP,
      openNewLearningPopup: true,
    });
  };

  return (
      <Container>
        <div className="passion_logo">
          <p>WEB DEVLOPMENT</p>
          <div className="add_learning">
            <button onClick={add_learning}>Start learning together 🚀</button>
          </div>
        </div>
        <div className="options_header">
          <div className="options_buttons">
            <button className="learnings_button">Learnings</button>
            <button
              className="stories_button"
              onClick={(e) => history.push("/stories")}
            >
              Stories
            </button>
          </div>
        </div>
        {x === 1 && learnings?.length > 0 && (
          <div className="my_learnings">
            <p>My Learnings</p>
            <div className="my_learnings_learnings">
              {learnings.map((learning) => (
                <>
                  {learning.data.started_by.email === userInfo.email && (
                    <Learning learning={learning} type="my" />
                  )}
                </>
              ))}
              {joinedLearnings.map((learning) => (
                <Learning learning={learning?.data?.learning} type="joined" />
              ))}
            </div>
          </div>
        )}
        {x === 1 && learnings?.length > 0 && userInfo?.passion !== "Don't  know" && (
          <div className="all_learnings">
            {learnings1.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}

            {learnings2.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings3.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings4.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings5.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings6.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings7.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings8.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings9.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings10.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings11.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
            {learnings12.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}

            {learnings13.map((learning) => (
              <Learning learning={learning} type="all" />
            ))}
          </div>
        )}
        {userInfo?.passion === "Don't know" && (
           <div className="all_learnings">
           {allLearnings.map(({ learning }) => (
             <Learning learning={learning} type="all" />
           ))}  
         </div>
        )}
        <NewLearningPopup />
      </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  /* max-height: 100vh; */
  display: flex;
  flex-direction: column;

  .passion_logo {
    height: 25vh;
    background-image: url("https://itxitpro.com/front/img/web-development-services.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-position: center;

    p {
      color: white;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 2px;
    }

    .add_learning {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      @media (max-width: 500px) {
        margin-bottom: 20px;
      }

      button {
        width: 180px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 20px;
        border: 0;
        background-color: #6868fa;
        color: white;
        margin-right: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);

        &:hover {
          cursor: pointer;
          background-color: #9595ff;
        }
      }
    }
  }

  .options_header {
    display: flex;
    justify-content: center;
    padding: 20px;
    padding-bottom: 0;

    .options_buttons {
      display: flex;
    }

    .learnings_button {
      margin-right: 20px;
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #252525;
      color: white;
    }

    .stories_button {
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;

      &:hover {
        cursor: pointer;
        background-color: #dfdede;
      }
    }
  }

  .learnings {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .learnings::-webkit-scrollbar {
    display: none;
  }

  .my_learnings {
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 30px;
    padding-right: 40px;
  }

  .my_learnings_learnings {
    display: flex;
    flex-wrap: wrap;
  }

  .all_learnings {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    padding-left: 30px;
    padding-right: 40px;
  }
`;

export default WorldPage;
