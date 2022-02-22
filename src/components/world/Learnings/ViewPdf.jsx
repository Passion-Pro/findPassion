import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory, useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import db from "../../../firebase";
import firebase from "firebase";
import { actionTypes } from "../../../reducer";

function ViewPdf() {

  const fileType = ["application/pdf"];
  const [{ user }, dispatch] = useStateValue();
  
useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/learnings",
    });
  }, []);

  const { learningId } = useParams();
  const { messageId } = useParams();
  const { chatEmail } = useParams();
  const history = useHistory();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfUrl, setPdfUrl] = useState();

  useEffect(() => {
    if (learningId && messageId) {
      db.collection("learnings")
        .doc(learningId)
        .collection("messages")
        .doc(messageId)
        .onSnapshot((snapshot) => {
          setPdfUrl(snapshot.data().pdfUrl);
        });
    }
  }, [learningId, messageId]);

  useEffect(() => {
    if (chatEmail && messageId && user?.uid) {
      console.log(chatEmail);
      db.collection("users")
        .doc(user?.uid)
        .collection("chats")
        .where("email", "==", chatEmail)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            db.collection("users")
              .doc(user?.uid)
              .collection("chats")
              .doc(doc.id)
              .collection("messages")
              .doc(messageId)
              .onSnapshot((snapshot) => {
                setPdfUrl(snapshot.data().pdfUrl);
                console.log(snapshot.data().pdfUrl);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [chatEmail, messageId, user?.uid]);

  const back_to_previous_page = () => {
    history.goBack();
  };

  return (
    <Container>
      <div className="viewPdf_header">
        <ArrowBackIcon
          onClick={back_to_previous_page}
          className="arrow_back_icon"
        />
      </div>
      <div className="pdf-container">
        {pdfUrl && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1efef;

  .viewPdf_header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    p {
      width: 100%;
      text-align: center;
      margin-bottom: 0px;
      font-size: 18px;
    }
  }

  .pdf-container {
    width: 90%;
    height: 90%;
    background-color: #e4e4e4;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  .arrow_back_icon {
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }
`;

export default ViewPdf;
