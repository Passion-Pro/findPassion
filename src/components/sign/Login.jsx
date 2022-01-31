import React , {useState, useEffect} from 'react';
import styled from "styled-components" 
import db, { auth , storage } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import {useHistory} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const[{user} , dispatch] = useStateValue();
    const history = useHistory();
    

    const sign_in = (e) => {
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {   
            dispatch({
              type : actionTypes.SET_USER,
               user : auth.user
            });

            db.collection("users")
            .where("email", "==", email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                
                db.collection("users").doc(doc.id).onSnapshot((snapshot) => (
                  
                    dispatch({
                       type : actionTypes.SET_USER_INFO,
                       userInfo : snapshot.data()
                    })
                ))
              

              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });

           history.push("/")

        })
        .catch((error) => {
          alert(error.message);
        });
     }



    return (
        <div>
             <Container>
               <div className="signIn">
                  <div className="signIn__header">
                      <p>Passion</p>
                  </div>
                  <form action="">
                  <div className="signIn_form">
                  <div className="email">
                    <p>Email</p>
                    <input
                      type="text"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="password">
                    <p>Password</p>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                   <div className="sign_In_button">
                   <button onClick={sign_in}>Sign In</button>
                   </div>
                  </div>
                  </form>
                  <a className="forgot_password" >Forgot Password?</a>
                  <a href="/newAccount" className="new_account">Create a new account</a>
               </div>
            </Container> 
        </div>
    )
};

const Container  = styled.div`
height: 90vh;
width : 100vw;
display : flex;
flex-direction : column;
justify-content : center;
align-items : center;
background-color : #f0f0f0;
flex : 1;

@media (max-width: 500px) {
  height : 85vh;
}

  .forgot_password{
      font-size: 14px;
      text-decoration: none;
      margin-top: 10px;
      text-align: right;
      color : #565EFF;
      &:hover {
        cursor: pointer;
        color : #165EFF
      }
    }

    .new_account{
      font-size: 16px;
      text-decoration: none;
      margin-top: 10px;
      text-align: center;
      color : black;
      &:hover {
        cursor: pointer;
        color : #165EFF
      }
    }

  

.signIn__header{
  p{
      font-size : 20px;
      font-family : "Helvetica Neue",Helvetica;

  }
}

.signIn{
  display : flex;
  flex-direction : column;
}

.signIn_form {
    border: 1px solid lightgray;
    padding: 10px;
    padding-left: 20px;
    border-radius: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    box-shadow: 0 0 15px -2px lightgray;
  }

  .email {
    p {
      margin-bottom: 10px;
      font-size: 15px;
      text-align : left;
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
      text-align : left;
    }
    input {
      margin-bottom: 10px;
      border-radius: 5px;
      width: 95%;
      height: 15px;
      padding: 10px;
    }
  }

  .sign_In_button {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: #1877f2;
      border-radius: 20px;
      width: 80px;
      height: 35px;
      color: white;
      margin-left: 20px;

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

export default Login
