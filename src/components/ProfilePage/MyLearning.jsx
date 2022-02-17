import React from 'react'
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from "firebase"




function MyLearning({type , learning , id}) {
    const[{user , userInfo} , dispatch] = useStateValue();

    const send_join_request = (e) => {
        e.preventDefault();

        if(type === "joined") {
            db.collection("users")
          .where("email", "==", learning?.data?.learning?.data?.started_by?.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              db.collection("users")
                .doc(doc.id)
                .collection("learnRequests")
                .add({
                  requestEmail : user?.email,
                  requestName : userInfo?.name,
                  learning: learning?.data?.learning,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  status: "pending",
                })
                .then(() => {
                  alert("Join Request Sent!....");
                });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        }

        if(type === "my"){
            db.collection("users")
                .doc(id)
                .collection("learnRequests")
                .add({
                  requestEmail : user?.email,
                  requestName : userInfo?.name,
                  learning: learning?.data?.learning,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  status: "pending",
                })
                .then(() => {
                  alert("Join Request Sent!....");
                });
        }
    }


    return (
        <Container>
            <p className = "myLearning_learning">
                {type === "my"? learning?.data?.learning : learning?.data?.learning?.data?.learning}
            </p>
            <p className="myLearning_started">
                Started on 8th November 2021
            </p>
            <div className="join_button">
                <button onClick = {send_join_request}>Join</button>
            </div>
        </Container>
    )
};

const Container  = styled.div`
  display : flex;
  flex-direction : column;
  border : 1px solid lightgray;
  padding : 10px;
  border-radius : 10px;
  box-shadow : 0 0 15px rgba(0, 0, 0, 0.24);
  width : 70%;
  margin-bottom : 20px;

  @media(max-width: 600px){
      width : 80vw;
      margin-left : auto;
      margin-right : auto;
  }
 
 .myLearning_learning{
    margin-top : 0;
          margin-bottom : 10px;
          font-size : 18px;
          font-family : "Helvetica Neue";
          font-weight : 500;
 }

 .myLearning_started{
     margin-top : 0;
     margin-bottom : 0;
     font-style : italic;
     font-size : 14px;
 }

 .join_button{
    display : flex;
    justify-content : flex-end;
    margin-right : 5px;
    margin-bottom : 2px;
    @media(max-width : 400px) {
      margin-top : 10px;
    }
    
    button{
        width : 60px;
        padding : 7px;
        border : 0;
        border-radius : 20px;
        background-color : #0044ff;
        color : white;

        &:hover {
            cursor : pointer;
            background-color : #2e66ff
        }

    }
}




`;

export default MyLearning
