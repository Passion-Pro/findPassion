import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";


function Member({learner}) {
  const history = useHistory();

  return (
    <>
      <Container onClick={(e) => history.push("/profile") }>
        <Avatar
          className="avatar"
          src= {learner?.data?.learner?.profilePhotoUrl}
        />
        {console.log(learner)}
        <div className="chatName_info">
          <p>{learner?.data?.learner?.name}</p>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  border-bottom: 1px solid lightgray;

  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }

  .chatName_info {
    display: flex;
    flex-direction: column;
    flex: 1;
    p {
      margin-top:auto;
      margin-bottom: auto;
      margin-left: 20px;
    }
  }

  .avatar {
    margin-top: 2px;
    width: 40px;
    height: 40px;
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
`;

export default Member;
