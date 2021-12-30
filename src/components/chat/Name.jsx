import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import "./Name.css";

function Name() {
  const history = useHistory();
  return (
    <>
      <Container className="name_for_laptop">
        <Avatar
          className="avatar"
          src="https://bsmedia.business-standard.com/_media/bs/img/article/2018-03/22/full/1521664011-0145.jpg"
        />
        <div className="chatName_info">
          <p>Ronak</p>
          <p>Last Message is... </p>
        </div>
        <div className="unread_messages">
          <div className="circle">7</div>
        </div>
      </Container>
      <Container
        className="name_for_mobile"
        onClick={(e) => history.push("/messages")}
      >
        <Avatar
          className="avatar"
          src="https://bsmedia.business-standard.com/_media/bs/img/article/2018-03/22/full/1521664011-0145.jpg"
        />
        <div className="chatName_info">
          <p>Ronak</p>
          <p>Last Message is... </p>
        </div>
        <div className="unread_messages">
          <div className="circle">7</div>
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
      margin-top: 0;
      margin-bottom: 5px;
      margin-left: 20px;
    }
  }

  .avatar {
    margin-top: 2px;
    width: 50px;
    height: 50px;
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

export default Name;
