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
  const [learnings, setLearnings] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .collection("myLearnings")
        .onSnapshot((snapshot) =>
          setMyLearnings(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );

      db.collection("learnings").onSnapshot((snapshot) =>
        setLearnings(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        )
      );
    }
  }, [user?.uid]);


  const add_learning = () => {
    dispatch({
      type: actionTypes.OPEN_NEW_LEARNING_POPUP,
      openNewLearningPopup: true,
    });
  };

  return (
    <div>
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
        {myLearnings?.length > 0 && (
          <div className="my_learnings">
            <p>My Learnings</p>
            <div className="my_learnings_learnings">
              {myLearnings.map((learning) => (
                <Learning learning={learning} userInfo={userInfo} type="my" />
              ))}
            </div>
          </div>
        )}
        <div className="all_learnings">
          {learnings.map((learning) => (
            <>
              {learning.data.started_by.experience === userInfo.experience && learning.data.started_by.email !== userInfo.email  && (
                <Learning learning={learning} type="all"/>
              )}
            </>
          ))}
          {learnings.map((learning) => (
            <>
              {learning.data.started_by.experience !== userInfo.experience && learning.data.started_by.email !== userInfo.email &&  (
                <Learning learning={learning} type="all"/>
              )}
            </>
          ))}
        </div>
      </Container>
      <NewLearningPopup />
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
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
