import React , {useState , useEffect} from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";


function Member({learner}) {
  const history = useHistory();
  const[profilePhotoUrl , setProfilePhotoUrl] = useState("");

  

  useEffect(() => {
    if(learner?.data?.learner?.email){
      db.collection("users")
      .where("email", "==", learner?.data?.learner?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          setProfilePhotoUrl(doc.data().profilePhotoUrl)

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      }); 
    }
  } , [learner])

  return (
    <>
      <Container onClick={(e) => history.push("/profile") }>
        <Avatar
          className="avatar"
          src= {profilePhotoUrl}
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
