import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import db from "../../../firebase";

function RemoveMemberPopup({ learning }) {
  const [{ user, openRemoveMemberPopup, learner}, dispatch] = useStateValue();
  const [id, setId] = useState();
  const [joinedLearnings, setJoinedLearnings] = useState([]);

   

  useEffect(() => {
    if (learner?.email) {
      db.collection("users")
        .where("email", "==", learner?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            setId(doc.id);

            db.collection("users")
              .doc(doc.id)
              .collection("myJoinedLearnings")
              .onSnapshot((snapshot) =>
                setJoinedLearnings(
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
    }
  }, [learner]);

  const remove_member = () => {
    db.collection("learnings")
      .doc(learning?.id)
      .collection("learners")
      .doc(learner?.id)
      .delete();

    for (let i = 0; i < joinedLearnings?.length; i++) {
      console.log("joinedLearnings are", joinedLearnings);
      if (
        joinedLearnings[i]?.data?.learning?.data?.learning ===
        learning?.learning
      ) {
        console.log("YUP");
        db.collection("users")
          .doc(id)
          .collection("myJoinedLearnings")
          .doc(joinedLearnings[i]?.id)
          .delete();
      }
    }
  };

  return (
    <Container>
      <div className="remove_popup">
        <div className="remove_popup_header">
          <CloseIcon
            className="close_icon"
            onClick={() => {
              dispatch({
                type: actionTypes.OPEN_REMOVE_MEMBER_POPUP,
                openRemoveMemberPopup: false,
              });
            }}
          />
        </div>
        <p>Are you sure you want to remove {learner?.name} </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button onClick={remove_member}>Remove</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .remove_popup {
    background-color: #fff;
    width: 350px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .remove_popup_header {
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    font-size: 18px !important;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;

    &:hover {
      cursor: pointer;
      color: #555454;
    }
  }

  button {
    width: 80px;
    padding: 7px;
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

  p {
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export default RemoveMemberPopup;
