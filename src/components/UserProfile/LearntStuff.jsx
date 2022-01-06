import React from "react";
import styled from "styled-components";

function LearntStuff({ learntStuff }) {
  return (
    <Container>
      {learntStuff?.data?.platform !== "others" && (
        <div className="icon">
          <img src={learntStuff?.data?.iconUrl} alt="" />
        </div>
      )}
      <div className="learning">
        <p>{learntStuff?.data?.learning}</p>
      </div>
      {learntStuff?.data?.platform === "youtube" && (
        <>
          <p className="channelName">
            Learnt from <span>{learntStuff?.data?.channelName}</span>
          </p>
          <a href={learntStuff?.data?.videoLink} className="videoLink">
            Click here to view video
          </a>
        </>
      )}
      {(learntStuff?.data?.platform === "udemy" ||
        learntStuff?.data?.platform === "coursera") && (
        <>
          <p>Completed Course {learntStuff?.data?.courseName}</p>
          <a href={learntStuff?.data?.courseLink} className="videoLink">
            Click here to check course
          </a>
        </>
      )}
      {learntStuff?.data?.platform === "others" &&
        learntStuff?.data?.learningInfo !== "" && (
          <p>{learntStuff?.data?.learningInfo}</p>
        )}
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  border: 2px solid lightgray;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;

  .icon {
    img {
      width: 80px;
      object-fit: contain;
    }
  }

  .learning {
    p {
      margin-bottom: 5px;
      margin-top: 10px;
    }
  }

  .channelName {
    margin-top: 0;
    margin-bottom: 5px;

    span {
      font-style: italic;
      font-weight: 500;
    }
  }

  a {
    color: #026fd4;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      color: #349cfd;
    }
  }
`;

export default LearntStuff;
