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
import { useStateValue } from "../../StateProvider";
import Quality from "../sign/CreateAccount/Quality";

function ProfileCard({ data }) {
  const history = useHistory();
  const [learning, setLearning] = useState([]);
  const [{ userInfo }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("users")
      .where("email", "==", data?.data?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
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
          <div className="down_1">
            <div className="down_1_left">
              <p className="user_name">{data?.data?.name}</p>
              {data?.data?.branch && data?.data?.year && (
                <p
                  style={{
                    marginTop: 0,
                    marginBottom: "10px",
                    fontSize: "small",
                  }}
                >
                  {data?.data?.branch} , {data?.data?.year === 1 && `1st year`}
                  {data?.data?.year === 2 ? `2nd year` : `0 year`}
                  {data?.data?.year === 3 && `3rd year`}
                  {data?.data?.year > 3 && `${data?.data?.year}th year`}
                </p>
              )}
            </div>
            <div className="down_1_right">
              {data?.data?.passion !== userInfo?.passion && (
                <p className="user_passion">{data?.data?.passion}</p>
              )}
              {userInfo?.experience !== 0 && (
                <div className="experience">
                  <div>Experience</div>
                  <div>
                    {userInfo.experience === 1
                      ? "1 year"
                      : `${userInfo.experience} years`}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="about"
            style = {{
              fontSize : '13px',
              padding : '5px'
            }}
          >
            {data?.data?.personInfo?.length > 100 ?  data?.data?.personInfo.slice(0,100) + '...'
              : data?.data?.personInfo}
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
    cursor: pointer;
  }

  .card_up {
    height: 52%;
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
    margin-bottom: -10px;
    width: 120px;
    height: 120px;
  }

  .card_down {
    padding: 10px 10px;
  }

  .user_name {
    font-size: 19px;
    margin: 0;
    padding: 0;
    font-weight: 500;
  }

  .user_passion {
    margin-top: 0px;
    width: fit-content;
    padding: 5px !important;
    border-radius: 20px;
    font-size: 14px;
    margin-bottom: 5px;
    margin-top: 5px;
    border: 1px solid gray;
  }

  .qualities {
    display: flex;
    flex-wrap: wrap;
  }

  .learning {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .down_1 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .about {
    display: "flex";
    border-top: 1px solid lightgray;
  }

  .experience {
    text-align: right;
    font-size: 13px;
  }
`;

export default ProfileCard;
