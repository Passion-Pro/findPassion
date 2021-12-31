import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import db from "../../firebase";
import Avatar from "@mui/material/Avatar";

function Request({ request }) {
  const [{ user , userInfo }, dispatch] = useStateValue();

  const accept_request = (e) => {
    e.preventDefault();

    db.collection("users")
      .doc(user?.uid)
      .collection("learnRequests")
      .where("learning", "==", request?.data?.learning)
      .where("requestFrom", "==", request.data.requestFrom)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection("users")
            .doc(user?.uid)
            .collection("learnRequests")
            .doc(doc.id)
            .update({
              status: "accepted",
            });


        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

      
      db.collection("learnings")
      .where("learning", "==", request?.data?.learning?.data?.learning)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection("learnings").doc(doc.id).collection("learners").add({
              learner : userInfo
          })

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

      db.collection("users")
      .where("email", "==", request?.data?.requestFrom?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

           db.collection("users").doc(doc.id).collection("myLearnings").add({
               
           })
        

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });


  };

  

  const delete_request = () => {
    db.collection("users")
      .doc(user?.uid)
      .collection("learnRequests")
      .where("learning", "==", request?.data?.learning)
      .where("requestFrom", "==", request.data.requestFrom)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          db.collection("users")
          .doc(user?.uid)
          .collection("learnRequests").doc(doc.id).delete()


        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }


  return (
    <Container>
      <div className="request_info">
        <Avatar
          className="request_info_avatar"
          src={request?.data?.requestFrom?.profilePhotoUrl}
        />
        <div className="request_name_info">
          <p>
            <span className="name">{request?.data?.requestFrom?.name}</span> has
            requested to join your learning
          </p>
          <span className="learning">
            {request?.data?.learning?.data?.learning}
          </span>
        </div>
      </div>
      <div className="buttons">
        <button className="accept" onClick={accept_request}>
          Accept
        </button>
        <button className="delete" onClick = {delete_request}>Delete</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 450px;
  background-color: white;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);

  .request_info {
    display: flex;
    /* flex-direction : column; */

    span {
      &:hover {
        cursor: pointer;
        color: #006eff;
      }
    }

    .name {
      font-family: "Helvetica Neue";
    }

    .learning {
      margin-top: 7px !important;
      font-size: 17px;
      font-weight: 500;
    }

    .request_name_info {
      p {
        margin-top: 0;
        margin-bottom: 3px;
      }
    }
  }

  .request_info_avatar {
    margin-right: 10px;
    width: 60px;
    height: 60px;
  }

  .buttons {
    display: flex;
    margin-top: 0px;
    justify-content: flex-end;

    .accept {
      width: 80px;
      padding: 5px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0044ff;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #2e66ff;
      }
    }

    .delete {
      width: 80px;
      padding: 5px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #00d9ff;
      color: white;
      margin-left: 10px;

      &:hover {
        cursor: pointer;
        background-color: #8eebfc;
      }
    }
  }
`;

export default Request;
