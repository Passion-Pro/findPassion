import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db, { auth, storage, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import BackgroundI from "../images/home_indicator.svg";
import DownImage from "../images/down_image.svg";
import Group from "../images/group.svg";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/signIn",
    });
  }, []);

  const sign_in = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((auth) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth.user,
        });
        db.collection("users")
          .where("email", "==", auth?.user?.email)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot?.empty === true) {
              history.push("/newAccount");
            }
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              db.collection("users")
                .doc(doc.id)
                .onSnapshot((snapshot) =>
                  dispatch({
                    type: actionTypes.SET_USER_INFO,
                    userInfo: snapshot.data(),
                  })
                );
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <Container>
        <div className="signIn">
          <img src= {BackgroundI} alt=""  className = "left_image"/>
          <img src= {DownImage} alt=""  className = "right_image"/>
          <img src= {Group} alt=""  className = "group_image"/>
          <div className="signIn_header">
            <p className="passion_title">Passion</p>
            <button onClick = {sign_in}>SignIn</button>
          </div>
          <div className="signIn_info">
            <span>Welcome to Passion to meet students of your like</span>
            <button onClick={sign_in}>Sign in With Google</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  background-repeat: no-repeat;

  .signIn {
    margin: 80px 10vw 0 10vw;
  }

  .signIn_header {
    display: flex;
    justify-content: space-between;

    button {
      height: 48px;
      width: 10vw;
      border-radius: 16px;
      background: #0077b6;
      color: #ffffff;
      box-shadow: 0px 4px 15px 0px #00000040;
      border: 0;
      min-width : 150px;

      &:hover {
        cursor: pointer;
      }

      @media(max-width: 500px){
        display : none;
      }
    }
  }

  .passion_title {
    font-family: "Signika";
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 59px;
    color: #03045e;
    margin-top: 0;
    margin-bottom: 0;
  }

  .left_image{
    position : absolute;
    top : 0;
    left : 0;
    z-index : -1;
    min-width : 200px;
    max-width : 25vw;
    object-fit : contain;
  }

  .right_image{
    position : absolute;
    bottom : 0;
    right : 0;
    z-index : -1;
    max-width : 25vw;
    min-width : 200px;
    object-fit : contain;
  }

  .group_image{
    position : absolute;
    bottom : 0;
    right : 0;
    z-index : -1;
    margin-bottom : 20px;
    min-width : 300px;
    max-width : 50vw;
    object-fit : contain;

    @media(max-width: 500px){
      display : none;
    }
  }

  .signIn_info {
    margin-top: 15vh;
    font-family: "Shanti";
    font-style: normal;
    font-weight: 500;
    font-size: 50px;
    line-height: 92px;
    color: #03045e;
    display: flex;
    flex-direction: column;

    @media(max-width : 700px){
      font-size: 40px;
      line-height: 70px;
    }

    @media(max-width : 500px){
      margin-top : 10vh;
      font-size: 30px;
      line-height: 60px;
    }

    button {
      width: 30%;
      height: 56px;
      background: #0077b6;
      border-radius: 16px;
      margin-top: 40px;
      color: white;
      border: 0;
      min-width : 200px;
      font-size : 18px;

      &:hover {
        cursor: pointer;
      }

      @media(max-width : 500px){
      width : 80vw;
      margin-top : 20vh;
    }
    }
  }


`;

export default Login;
