import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db, { auth, storage, provider } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

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
            if(querySnapshot?.empty === true){
              history.push('/newAccount');
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
          <div className="signIn__header">
            <p>Passion</p>
          </div>
      
              <div className="sign_In_button">
                <button onClick={sign_in}>Sign In With Google</button>
              </div>
        
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  flex: 1;

  @media (max-width: 500px) {
    height: 85vh;
  }

  .forgot_password {
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
    text-align: right;
    color: #565eff;
    &:hover {
      cursor: pointer;
      color: #165eff;
    }
  }

  .new_account {
    font-size: 16px;
    text-decoration: none;
    margin-top: 10px;
    text-align: center;
    color: black;
    &:hover {
      cursor: pointer;
      color: #165eff;
    }
  }

  .signIn__header {
    p {
      font-size: 20px;
      font-family: "Helvetica Neue", Helvetica;
      text-align: center;
    }
  }

  .signIn {
    display: flex;
    flex-direction: column;
  }


  .email {
    p {
      margin-bottom: 10px;
      font-size: 15px;
      text-align: left;
    }
    input {
      margin-bottom: 10px;
      border-radius: 5px;
      width: 95%;
      height: 15px;
      padding: 10px;
    }
  }

  .password {
    p {
      margin-bottom: 10px;
      font-size: 15px;
      text-align: left;
    }
    input {
      margin-bottom: 10px;
      border-radius: 5px;
      width: 95%;
      height: 15px;
      padding: 10px ;
    }
  }

  .sign_In_button {
    display: flex;
    button {
      background-color: #1877f2;
      border-radius: 20px;
      width: 180px;
      height: 35px;
      color: white;
      border : 0;
      padding: 10px !important;

      &:hover {
        background-color: #3f8ef7;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 500px) {
    .signIn_form {
      width: 80vw;
      input {
        width: 90%;
      }
    }
  }
`;

export default Login;
