import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { useHistory } from "react-router-dom";
import Story from "./Stories/Story";
import StoryPopup from "./Stories/StoryPopup";
import db from "../../firebase";

function StoriesPage() {
  const history = useHistory();
  const [{ user, userInfo }, dispatch] = useStateValue();
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("journeys")
        .orderBy("likesLength", "desc")
        .onSnapshot((snapshot) =>
          setJourneys(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);

  return (
    <div>
      <Container>
        {/* <div className="passion_logo">
          <p>WEB DEVLOPMENT</p>
          <div className="add_story">
            {userInfo?.experience > 1 && (
              <button onClick={(e) => history.push("/addStory")}>
                Add your story 🔥
              </button>
            )}
          </div>
        </div> */}
        <div className="options_header">
          <div className="options_buttons">
          <button
            className="learnings_button"
            onClick={(e) => history.push("/world")}
          >
            Learnings
          </button>
          <button className="stories_button">Stories</button>
          </div>
          <div className="add_story_button">
          {userInfo?.experience > 0 && (
              <button onClick={(e) => history.push("/addStory")}>
                Add your journey 🔥
              </button>
            )}
          </div>
        </div>
        {userInfo?.passion !== "Don't know" && (
          <div className="journeys">
            {journeys.map((journey) => (
              <>
                {journey.data?.uploaderInfo?.passion === userInfo?.passion && (
                  <Story journey={journey} />
                )}
              </>
            ))}
            {journeys.map((journey) => (
              <>
                {journey.data?.uploaderInfo?.passion !== userInfo?.passion && (
                  <Story journey={journey} />
                )}
              </>
            ))}
          </div>
        )}
        {userInfo?.passion === "Don't know" && (
          <div className="stories">
            {journeys.map((journey) => (
              <Story journey={journey} />
            ))}
          </div>
        )}
      </Container>
      <StoryPopup />
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 90vh;
  height : fit-content;
  display: flex;
  flex-direction: column;
  background-image: url("https://itxitpro.com/front/img/web-development-services.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: 700px) {
    margin-bottom: 50px;
  }

  .passion_logo {
    height: 35vh;
    background-image: url("https://itxitpro.com/front/img/web-development-services.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    flex-direction: column;

    p {
      color: white;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 2px;
    }

    .add_story {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      @media (max-width: 500px) {
        margin-bottom: 20px;
      }
    }
  }

  .options_header {
    display: flex;
    padding: 20px;
    padding-bottom: 0;
    justify-content: space-between;

    @media (max-width: 500px){
      flex-direction : column;
    }

    .options_buttons {
      display: flex;

      @media (max-width: 500px){
       margin-bottom : 30px;
     }
    }

    .stories_button {
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #252525;
      color: white;
    }

    .learnings_button {
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      margin-right: 20px;

      &:hover {
        cursor: pointer;
        background-color: #dfdede;
      }
    }
  }

  .journeys {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    padding-left: 30px;
    padding-right: 40px;
  }

  .stories::-webkit-scrollbar {
    display: none;
  }

  .add_story_button{
    display: flex;
    margin-right: 10px;
    button {
        width: 150px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 20px;
        border: 0;
        background-color: #6868fa;
        color: white;
        margin-right: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);

        @media (max-width: 500px){
       width : 85vw;
       margin-bottom: 0px;
     }

        &:hover {
          cursor: pointer;
          background-color: #9595ff;
        }
      }
  }
`;

export default StoriesPage;
