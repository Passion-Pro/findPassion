import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";
import ProfileImage from "../profile/ProfileImage";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import styled from "styled-components";
import {useStateValue} from "../../StateProvider"
import Quality from "../sign/CreateAccount/Quality";

function ProfileCard({ data }) {
  const history = useHistory();
  const [learning, setLearning] = useState([]);
  const[{userInfo} , dispatch] = useStateValue();
  

  useEffect(() => {
    db.collection("users")
      .where("email", "==", data?.data?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection("users")
            .doc(doc.id)
            .collection("myLearnings")
            .orderBy("timestamp", "desc")
            .limit(2)
            .onSnapshot((snapshot) =>
              setLearning(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              )
            );
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    console.log("learning is ", learning);
  }, [learning]);

  //   const checkLength=(lengthOfArray)=>{
  // if(lengthOfArray>10){
  //  break;
  // }
  // }


  return (
    <Card
      className="profilecard"
      onClick={() => {
        history.push(`viewprofile/${data?.id}`);
      }}
    >
      <Container>
        <div
          className="card_up"
          style={{
            backgroundImage: `url(${data?.data?.coverImageUrl})`,
          }}
        >
          <Avatar
            className="profile_avatar"
            src={data?.data?.profilePhotoUrl}
          />
        </div>
        <div className="card_down">
          <p className="user_name">{data?.data?.name}</p>
          {console.log("Year is" , data?.data?.year)}
          {data?.data?.branch && data?.data?.year && (<p
            style  = {{
              marginTop : 0,
              marginBottom : '10px'
            }}
           >
            {data?.data?.branch} , {' '}
            {data?.data?.year === 1 && `1st year`}
            {data?.data?.year === 2? `2nd year` : `0 year`}
            {data?.data?.year === 3 && `3rd year`}
            {data?.data?.year > 3 && `${data?.data?.year}th year`}
          </p>)}
          {console.log("Learning is " , learning)}
          {data?.data?.passion !== userInfo?.passion && (<p className="user_passion">{data?.data?.passion}</p>)}
          {learning[0] && (
            <p className="learning">
              {learning[0]?.data?.learning?.length < 80 ? learning[0]?.data?.learning : `${learning[0]?.data?.learning.splice(0 , 80)} + "..." `}
            </p>
          )}
          <div className="qualities">
          {data?.data?.qualities.map((quality) => (
            <Quality quality = {quality} from = "profileCard"/>
          ))}
          </div>
        </div>
      </Container>
    </Card>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    cursor : pointer;
  }

  .card_up {
    height: 50%;
    background-color: #eeecec;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .profile_avatar {
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: -30px;
    width: 120px;
    height: 120px;
  }

  .card_down {
    padding-left: 10px;
  }

  .user_name {
    font-size: 19px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .user_passion {
    margin-top: 0px;
    width: fit-content;
    padding: 5px !important;
    border-radius: 20px;
    background-color: #8400ff;
    color: white;
  }

  .qualities{
      display: flex;
      flex-wrap : wrap;
  }
  

  .learning {
    margin-top : 0;
    margin-bottom : 10px;
  }
`;

export default ProfileCard;
