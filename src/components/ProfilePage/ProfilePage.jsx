import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import MyLearning from "./MyLearning";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import LearntStuff from "../UserProfile/LearntStuff";
import StoryPopup from "../world/Stories/StoryPopup";
import { actionTypes } from "../../reducer";

function ProfilePage({ id }) {
  const history = useHistory();
  const [{ user, userInfo, openStoryPopup }, dispatch] = useStateValue();
  const [viewerInfo, setViewerInfo] = useState([]);
  const [learntStuff, setLearntStuff] = useState([]);
  const [chats, setChats] = useState([]);
  const [x, setX] = useState(0);
  const [journey, setJourney] = useState([]);
  const[learnings , setLearnings] = useState([]);
  const[joinedLearnings , setJoinedLearnings] = useState([]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/profile",
    });
  }, []);
  
  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .collection("chats")
        .onSnapshot((snapshot) =>
          setChats(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [user?.uid]);


  useEffect(() => {
       if(id){

        db.collection("journeys")
        .doc(id)
        .onSnapshot((snapshot) => {
          setJourney({
            data : snapshot.data(),
          });
        });


        db.collection("users").doc(id).collection("myLearnings").onSnapshot((snapshot) => 
          setLearnings(
            snapshot.docs.map((doc) => ({
              id : doc.id,
              data : doc.data(),
            }))
          )
        )

        db.collection("users").doc(id).collection("myJoinedLearnings").onSnapshot((snapshot) => 
          setJoinedLearnings(
            snapshot.docs.map((doc) => ({
              id : doc.id,
              data : doc.data(),
            }))
          )
        )
       }
  } , [id])


  

  useEffect(() => {
    if (chats?.length > 0) {
      for (let i = 0; i < chats?.length; i++) {
        if (chats[i]?.data?.name === viewerInfo?.name) {
          setX(1);
          console.log("Set x to 1");
        }
      }
    }
  }, [chats?.length, viewerInfo?.name]);

  useEffect(() => {
    if (id) {
      console.log(id);
      db.collection("users")
        .doc(id)
        .onSnapshot((snapshot) => {
          setViewerInfo(snapshot.data());
        });

      db.collection("users")
        .doc(id)
        .collection("learntStuff")
        .onSnapshot((snapshot) =>
          setLearntStuff(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [id]);

  const generate_chat = (e) => {
    e.preventDefault();

    if (x === 0) {
      db.collection("users")
        .doc(user?.uid)
        .collection("chats")
        .add({
          name: viewerInfo?.name,
          email: viewerInfo?.email,
        })
        .then(() => {
          history.push(`/chat/${id}`);
        });
    } else if (x === 1) {
      history.push(`/chat/${id}`);
    }
  };

  const openJourney_popup = () => {
    dispatch({
      type: actionTypes.OPEN_STORY_POPUP,
      openStoryPopup: true,
    });

    dispatch({
      type: actionTypes.SET_JOURNEY,
      journey: journey,
    });
  };

  const goToJourneyPage = () => {
    history.push(`/journey/${id}`)
  };

  return (
    <div>
      <Container>
        <div className="profile">
          <div className="profile_pic">
            <div className="circle_border">
              <Avatar className="avatar" src={viewerInfo?.profilePhotoUrl} />
            </div>
            <div className="name">
              <p>{viewerInfo?.name}</p>
            </div>
            <div className="buttons">
              <button className="journey_laptop" onClick={openJourney_popup}>
                Journey
              </button>
              <button className="journey_mobile" onClick={goToJourneyPage}>
                Journey
              </button>
              <button onClick={generate_chat}>Chat</button>
            </div>
          </div>
          <div className="profile_info">
            <div className="learnings"
             style = {{
               flex : learntStuff?.length === 0 && !viewerInfo?.currentInvolvement && !viewerInfo?.involvementDescription && '0'
             }}
            >
              {viewerInfo?.currentInvolvement && viewerInfo?.involvementDescription && (<div className="current_status">
                <p className="title">{viewerInfo?.currentInvolvement}</p>
                <p className="description">
                  {viewerInfo?.involvementDescription}
                </p>
              </div>)}
              <div className="learnings">
                {learntStuff.map((learntStuff) => (
                  <LearntStuff learntStuff={learntStuff} from="viewProfile" />
                ))}
              </div>
              {/* <div className="branch">
                <p className = "branch_name">GT</p>
                <p>2nd year</p>
            </div> */}
            </div>
            <div className="achievements_current_learnings">
              <div className="current_learnings_laptop">
                {learnings.map((learning) => (
                   <MyLearning learning = {learning} type = "my" id = {id}/>
                ))}
                {joinedLearnings.map((learning) => (
                  <MyLearning learning = {learning} type = "joined" id = {id}/>
                ))}
              </div>
              {viewerInfo?.achievement && (<div className="achievements">
                <div className="achievement">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <p>{viewerInfo?.achievement}</p>
                </div>
              </div>)}
              {viewerInfo?.experience && (<div className="experience">
                <img
                  src="https://5.imimg.com/data5/SM/ZI/DY/SELLER-42012147/ribbon-gold-medal-500x500.jpg"
                  alt=""
                />
                <p>
                  {viewerInfo?.experience === 0 && `Begginer`}
                  {viewerInfo?.experience === 1 && `1 year of experience`}
                  {viewerInfo?.experience > 1 &&
                    `${viewerInfo?.experience} years of experience`}
                </p>
              </div>)}
            </div>
          </div>
        </div>
      </Container>  
        <StoryPopup journey = {journey} />
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .journey_laptop {
    @media (max-width: 500px) {
      display: none;
    }
  }

  .journey_mobile {
    @media (min-width: 500px) {
      display: none;
    }
  }

  .current_status {
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 70%;
    padding: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    margin-bottom: 10px;

    @media (max-width: 500px) {
      width: 80vw;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
    }

    .title {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 22px;
      font-family: "Helvetica Neue";
      font-weight: 500;
    }
  }

  .profile {
    overflow-y: scroll;
  }

  .profile::-webkit-scrollbar {
    display: none;
  }

  .profile_pic {
    padding: 50px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightgray;
    background-image: url("https://itxitpro.com/front/img/web-development-services.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    @media (max-width: 500px) {
      background-position: center;
      padding: 0;
    }
  }

  .circle_border {
    border: 3px solid gray;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    width: 190px;
    height: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    @media (max-width: 500px) {
      margin-top: 50px;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    @media (max-width: 500px) {
      margin-bottom: 20px;
    }

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
      margin-left: 10px;

      &:hover {
        cursor: pointer;
        background-color: #9595ff;
      }

      @media (max-width: 500px) {
        width: 120px;
      }
    }
  }

  .avatar {
    width: 180px;
    height: 180px;
  }

  .name {
    p {
      text-align: center;
      font-size: 25px;
      margin-top: 10px;
      color: white;
      margin-bottom: 0;
    }
  }

  .profile_info {
    display: flex;
    padding-left: 15px;
    padding-right: 15px;

    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }

  .learnings {
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-top: 20px;
    flex: 0.5;
  }

  .branch {
    margin-top: 20px;
    p {
      margin-bottom: 0;
      margin-top: 3px;
      font-size: 20px;
      font-weight: 500;
      color: #646464;
    }
  }

  .learnt_stuff {
    @media (max-width: 500px) {
      display: flex;
      margin-left: 10px;
      flex-direction: column;
    }
  }

  .learning {
    display: flex;
    img {
      width: 30px;
      object-fit: contain;
      margin-right: 10px;
      margin-top: 10px;
    }
    p {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }

  .current_learnings_laptop {
    @media (max-width: 500px) {
      display: none;
    }
  }

  .current_learnings_mobile {
    display: none;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }

  .achievements_current_learnings {
    flex: 0.5;
    padding: 10px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
      padding-top: 0;
    }

    .achievements {
      display: flex;
      margin-top: 0px;
      margin-left: 5px;

      .achievement {
        display: flex;
      }

      img {
        width: 30px;
        object-fit: contain;
        margin-right: 0px;
        margin-top: 10px;
      }
      p {
        margin-bottom: 0;
      }
    }

    .experience {
      display: flex;
      margin-left: 5px;

      img {
        width: 30px;
        object-fit: contain;
        margin-right: 0px;
        margin-top: 10px;
      }
    }
  }
`;

export default ProfilePage;
