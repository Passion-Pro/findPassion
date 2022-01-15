import React from "react";
import styled from "styled-components";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

function LearntStuff({ learntStuff , from }) {
  const [{ user, userInfo }, dispatch] = useStateValue();

  const delete_learnt_stuff = (e) => {
    db.collection("users")
      .doc(user?.uid)
      .collection("learntStuff")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection("users")
            .doc(user?.uid)
            .collection("learntStuff")
            .doc(doc.id)
            .delete();
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <Container>
      {learntStuff?.data?.platform !== "others" && (
        <div className="icon">
          <img src={learntStuff?.data?.iconUrl} alt="" />
         { from === "viewProfile" ?(""): ( <button onClick={delete_learnt_stuff}>Delete</button>)}
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
  margin-bottom : 20px;

  .icon {
    display: flex;
    justify-content: space-between;
    img {
      width: 80px;
      object-fit: contain;
    }

    button{
       width : 90px;
       padding : 7px;
       border-radius : 20px;
       background-color : #fff9f9;
       border : 1px solid lightgray;
       
       &:hover{
           cursor : pointer;
           background-color : lightgray;
       }
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
