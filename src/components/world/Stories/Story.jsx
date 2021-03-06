import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";

function Story({ journey , from }) {
  const [{ userInfo }, dispatch] = useStateValue();
  const history = useHistory();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();

  useEffect(() => {
    console.log(journey);
    if (journey) {
      db.collection("users")
        .where("email", "==", journey?.data?.uploaderInfo?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            setProfilePhotoUrl(doc.data().profilePhotoUrl);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [journey]);

  const open_story_popup = () => {
    dispatch({
      type: actionTypes.OPEN_STORY_POPUP,
      openStoryPopup: true,
    });

    dispatch({
      type: actionTypes.SET_JOURNEY,
      journey: journey,
    });
  };

  const goToProfilePage = (e) => {
    e.preventDefault();
    history.push(`/viewProfile/${journey?.id}`);
  };

  return (
    <Container
    style = {{
      width : from === 'userProfile' ? '500px' : '250px'
    }}
    >
      <div onClick={open_story_popup} className="for_laptop"
      >
        <div
          className="current_status"
          style={{
            backgroundImage: `url(${journey?.data?.achievementUrl})`,
          }}
        ></div>
        <div className="user_info">
          <div className="info">
            <Avatar className="user_info_avatar" src={profilePhotoUrl} />
            <p onClick={goToProfilePage}>{journey?.data?.uploaderInfo?.name}</p>
          </div>
          {journey?.data?.fires?.length > 0 && (<div>
            <span className="fire_symbol">
              {journey?.data?.fires?.length}????
            </span>
          </div>)}
        </div>
        {/* <div className="journey_period">
        <p>
          <span>{journey?.data?.journeyPeriod} </span>
          of journey in {userInfo?.passion}
        </p>
      </div> */}
      </div>

      <div
        onClick={(e) => history.push(`/journey/${journey?.id}`)}
        className="div_for_mobile"
      >
        <div
          className="current_status"
          style={{
            backgroundImage: `url(${journey?.data?.achievementUrl})`,
          }}
        ></div>
       <div className="user_info">
          <div className="info">
            <Avatar className="user_info_avatar" src={profilePhotoUrl} />
            <p onClick={goToProfilePage}>{journey?.data?.uploaderInfo?.name}</p>
          </div>
         {journey?.data?.fires?.length>0 && ( <div>
            <span className="fire_symbol">
              {journey?.data?.fires?.length}????
            </span>
          </div>)}
        </div>
        {/* <div className="journey_period">
        <p>
          <span>{journey?.data?.journeyPeriod} </span>
          of journey in {userInfo?.passion}
        </p>
      </div> */}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
  margin-right: 30px;
  margin-bottom: 30px;
  background-color: #fff;

  @media(max-width : 500px){
    width : 80vw;
  }

  &:hover {
    cursor: pointer;
  }

  .for_laptop {
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
      display: none;
    }
  }

  .div_for_mobile {
    display: none;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }


  .current_status {
    height: 125px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .user_info {
    padding: 10px;

    display: flex;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
    }

    .user_info_avatar {
      width: 27px;
      height: 27px;
    }

    p {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 5px;
      font-size: 15px;

      &:hover {
        color: #1b7ae7;
      }
    }
  }

  .journey_period {
    padding: 10px;
    padding-bottom: 0;
    padding-top: 0;
    color: #474747;
    p {
      margin-top: 5px;
      margin-bottom: 0;
      font-size: 18px;
      font-family: "Helvetica Neue";
      font-weight: 500;

      @media (max-width: 500px) {
        font-size: 20px;
      }
    }

    span {
      font-weight: 600;
    }
  }

  .fires {
    padding: 10px;
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    margin-top: 3px;
    justify-content: flex-end;

    span {
      padding: 0;
    }
    .fire_symbol {
      font-size: 17px;
      margin-right: 2px;
    }
    .number_of_fires {
      font-style: italic;
    }

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

  .info {
    display: flex;
  }
`;

export default Story;
