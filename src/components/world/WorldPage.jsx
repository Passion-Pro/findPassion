import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import Learning from "./Learnings/Learning";
import { useHistory } from "react-router-dom";
import NewLearningPopup from "./Learnings/NewLearningPopup";
import db from "../../firebase";

function WorldPage() {
  const [learnings, setLearnings] = useState([]);
  const[allLearnings , setAllLearnings] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [joinedLearnings, setJoinedLearnings] = useState([]);
  const[myLearningsLength , setMyLearningsLength] = useState();
  const[jlLength , setJlLength] = useState(null);
  const[newLearnings , setNewLearnings] = useState([]);
  const[passions , setPassions] = useState([]);
  const[tags , setTags] = useState([]);
  const[oldTags , setOldtags] = useState([]); 

  
  
  const add_learning = () => {
    dispatch({
      type: actionTypes.OPEN_NEW_LEARNING_POPUP,
      openNewLearningPopup: true,
    });
    console.log("true");
  };


  useEffect(() => {
    if (user?.uid) {
      db.collection("learnings").onSnapshot((snapshot) => {
        setLearnings(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
      });

      db.collection('users').doc(user?.uid).collection('myLearnings').onSnapshot((snapshot) => {
        setMyLearningsLength(snapshot.docs.length);
      })

      db.collection('users').doc(user?.uid).collection('myJoinedLearnings').onSnapshot((snapshot) => {
        setJoinedLearnings(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
      })
    }
  }, [user]);

  useEffect(() => {
     db.collection('passions').onSnapshot((snapshot) => (
       setPassions(
         snapshot.docs.map((doc) => ({
           id : doc.id,
           data : doc.data(),
         }))
       )
     ))
  } , []);

  useEffect(() => {
     console.log(" learnings are" , learnings)
  } , [])

  useEffect(() => {
    if(passions?.length > 0) {
      for( let i = 0; i< passions?.length; i++) {
        db.collection("passions")
          .doc(passions[i].id)
          .collection("learningTags")
          .onSnapshot((snapshot) =>
            snapshot.docs.map((doc) => {
              tags.push(doc.data());
              console.log("Doc is", doc.data());
              setOldtags(tags);
            })
          );
      }
    }
  } , [passions?.length])

  



  const history = useHistory();

  return (
    <Container>
      {/* <div className="passion_logo">
        <div className="passion_title">
          <p>WEB DEVLOPMENT</p>
        </div>
        <div className="add_learning">
          <button onClick={add_learning}>Start learning together 🚀</button>
        </div>
      </div> */}
      {/* <p
  style={{
    display: "none",
  }}
>
  {z}
</p> */}
      <div className="options_header">
        <div className="options_buttons">
          <button className="learnings_button">Learnings</button>
          <button
            className="stories_button"
            onClick={(e) => history.push("/stories")}
          >
            Journeys
          </button>
          <button
            className="stories_button"
            style={{
              marginLeft: "20px",
            }}
            onClick={(e) => history.push("/posts")}
          >
            Posts
          </button>
        </div>

        <div className="add_learning_button">
          <button onClick={add_learning}>Start learning together 🚀</button>
        </div>
      </div>
        {console.log("My Learnings length is " , myLearningsLength)}
      {myLearningsLength > 0 || joinedLearnings?.length > 0 ? (<div className="my_learnings">
        {(myLearningsLength> 0 || joinedLearnings?.length > 0) ? (<p className="my_learnings_title">My learnings</p>):(
          <div></div>
        )
        }
        <div className="my_learnings_learnings">
          {learnings &&
            learnings
              .filter((item) => {
                // return
                return item?.data?.started_by.email.includes(user?.email);
              })
              .map((learning) => <Learning learning={learning} type="my" />)}
          {joinedLearnings.map((learning) => (
            <>
              {/* {learning.data.started_by.email === userInfo.email && ( */}
              <Learning learning={learning} type="joined" />
              {/* )} */}
            </>
          ))}
        </div>
      </div>):(
        <div></div>
      )}
      <div
        className="all_learnings"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            color: "white",
            marginTop: "0",
            marginBottom: "20px",
          }}
        >
          See What your friends are learning
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {learnings &&
            learnings
            .filter((item) => {
              return !item?.data?.learners.includes(user?.email);
            })
            .map((learning) =>(
            <>{learning?.data?.started_by.email !== user?.email &&
              <Learning learning={learning} type="all" />
            }</>
            )
            )}
        </div>
      </div>
      {/* <h2>My learning</h2>
      {learning &&
        learning
          .filter((item) => {
            console.log(item)
            // return
            return item?.data?.started_by.email.includes(user?.email);
          })
          .map((learning) => <h4>{learning?.data?.learning}</h4>)}
<h2>My joined learning</h2>
      {joinedLearnings.map((learning) =>
      <>
      {console.log("nih",learning?.data?.learning)}
       <h4>{learning?.data?.learning?.data?.learning}</h4>
      </>
       )}
<h2>Other learning</h2>
{learning &&
        learning?.data?.started_by.email!=user?.email &&
        learning.map((learning) => <h4>{learning?.data?.learning}</h4>)} */}
    <NewLearningPopup tags={tags}/>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  flex: 1;
  min-height: 90vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  /* background-image: url("https://itxitpro.com/front/img/web-development-services.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #003663;
  @media (max-width: 700px) {
    margin-bottom: 50px;
  }
  .passion_logo {
    /* height: 35vh; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-position: center;
    .passion_title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        color: white;
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }
  .options_header {
    display: flex;
    padding: 20px;
    padding-bottom: 0;
    justify-content: space-between;
    /* width : 100%; */
    @media (max-width: 500px) {
      flex-direction: column;
    }
    .options_buttons {
      display: flex;
      @media (max-width: 500px) {
        margin-bottom: 30px;
      }
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
      height: 40px;
    }
    .stories_button {
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      height: 40px;
      &:hover {
        cursor: pointer;
        background-color: #dfdede;
      }
    }
  }
  .add_learning_button {
    display: flex;
    margin-right: 10px;
    button {
      width: 180px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #6868fa;
      color: white;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      @media (max-width: 500px) {
        width: 85vw;
        margin-bottom: 0px;
      }
      &:hover {
        cursor: pointer;
        background-color: #9595ff;
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
    @media (max-width: 500px) {
      padding-left: 10px;
      padding-right: 0px;
      justify-content: flex-start;
      padding-top: 0px;
    }
  }
  .my_learnings_learnings {
    display: flex;
    /* overflow-x : scroll;
    width : 100vw; */
    flex-wrap: wrap;
  }
  .all_learnings {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    padding-left: 30px;
    padding-right: 40px;
    @media (max-width: 500px) {
      padding-left: 10px;
      padding-right: 0px;
      justify-content: flex-start;
    }
  }
  .my_learnings_title {
    color: white;
    padding-left: 10px;
  }
`;

export default WorldPage;
