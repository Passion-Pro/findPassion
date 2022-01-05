import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import VideoPlayer from "../world/Stories/VideoPlayer";
import {useHistory} from "react-router-dom"


function Message({ message , learningId}) {

  const history = useHistory();

  return (
    <Container>
      {message?.data?.type === "text" && (
        <div className="message">
          <p className="message_name">{message?.data?.name}</p>
          <div className="message_message">
            <p>{message?.data?.message}</p>
          </div>
        </div>
      )}
      {message?.data?.type === "image" && (
        <div className="message_image">
          <p className="message_name_image">{message?.data?.name}</p>
          <div className="message_image_div">
            <img
              src={message?.data?.imageUrl}
              alt=""
              className="message_image_div_image"
            />
            <p className="caption">{message?.data?.caption}</p>
          </div>
        </div>
      )}
      {message?.data?.type === "video" && (
        <div className="video_message">
          <VideoPlayer videoUrl={message?.data?.videoUrl} />
        </div>
      )}
      {message?.data?.type === "pdf" && (
        <div className="message">
          <p className="message_name">{message?.data?.name}</p>
          <div className="message_message fileName">
            <p onClick = {(e) => history.push(`/learnings/viewPdf/${learningId}/messages/${message?.id}`)}>{message?.data?.pdfName}</p>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-right: 10px;
  margin-left: auto;
  max-width: 50%;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    max-width: 70%;
  }
  .message {
    display: flex;
    flex-direction: column;
  }

  .message_name {
    margin-bottom: 0px;
    font-size: x-small;
    margin-left: 5px;
    margin-bottom: 3px;
    width: fit-content;
  }

  .message_message {
    background-color: #fff;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
    p {
      margin-top: 0;
      margin-bottom: 0;
    }

    img {
      width: 100%;
      object-fit: contain;
      max-width: 100%;
      border-radius: 10px;
    }

    .caption {
      margin-left: 10px;
    }
  }

  .message_image {
    display: flex;
    flex-direction: column;
  }

  .message_image_div {
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    width: 60%;
    margin-left: auto;
    p {
      margin-top: 0;
      margin-bottom: 0;
    }
    img {
      width: 100%;
      object-fit: contain;
      max-width: 100%;
      border-radius: 10px;
    }

    .caption {
      margin-left: 10px;
    }
  }

  .message_name_image {
    margin-bottom: 0px;
    font-size: x-small;
    margin-left: auto;
    margin-bottom: 3px;
    width: 60%;
    margin-right: 10px;
  }

  .video_message {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  .fileName{
    color : #0084ff;

    &:hover {
        cursor : pointer;
        color : #001aff;
    }
  }
`;

export default Message;
