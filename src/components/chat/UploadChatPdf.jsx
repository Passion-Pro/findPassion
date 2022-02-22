import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import db, { storage } from "../../firebase";
import firebase from "firebase";
import { useHistory, useParams } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../Loading";


function UploadChatPdf() {
  const history = useHistory();
  const [{ userInfo, user }, dispatch] = useStateValue();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const { chatId } = useParams();
  const { chatEmail } = useParams();
  // const [fileUrl, setFileUrl] = useState();

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  const [messages, setMessages] = useState([]);

  // onchange event
  const fileType = ["application/pdf"];
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const[loading , setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/messagesUploadPdf",
    });
  }, []);

  useEffect(() => {
    console.log(chatId);
    if (user?.uid && chatEmail) {
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
              .orderBy("timestamp", "desc")
              .onSnapshot((snapshot) =>
                setMessages(
                  snapshot.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                  }))
                )
              );
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [user?.uid, chatEmail]);

  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        if (selectedFile.size < 25000 * 1024) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setPdfFile(e.target.result);
            setFileName(selectedFile.name);
            setFile(selectedFile);
            setPdfFileError("");
          };
        } else {
          setPdfFileError("Please enter a file below 25 MB");
        }
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  const close_send_pdf = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEND_PDF,
      sendPdf: false,
    });
  };

  const back_to_previous_page = () => {
    history.goBack();
  };

  const send_pdf = async (e) => {
    e.preventDefault();
    if (viewPdf) {
      const upload = storage.ref(`files/${fileName}`).put(file);
      upload.on(
        "state_changed",
        (snapshot) => {
        setLoading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();

          if (downloadURL) {
            console.log("ChatId is " , chatId);
       if (chatId) {
              if (messages?.length === 0) {
                console.log("X is ", 0);
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
                        .add({
                          name: userInfo?.name,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "pdf",
                          pdfUrl: downloadURL,
                          pdfName: fileName,
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });

                db.collection("users")
                  .doc(chatId)
                  .collection("chats")
                  .add({
                    name: userInfo?.name,
                    email: userInfo?.email,
                  })
                  .then(() => {
                    db.collection("users")
                      .doc(chatId)
                      .collection("chats")
                      .where("email", "==", userInfo?.email)
                      .get()
                      .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          // doc.data() is never undefined for query doc snapshots
                          console.log(doc.id, " => ", doc.data());

                          db.collection("users")
                            .doc(chatId)
                            .collection("chats")
                            .doc(doc.id)
                            .collection("messages")
                            .add({
                              name: userInfo?.name,
                              timestamp:
                                firebase.firestore.FieldValue.serverTimestamp(),
                              type: "pdf",
                              pdfUrl: downloadURL,
                              pdfName: fileName,
                              status : "unseen"
                            });
                        });
                      })
                      .catch((error) => {
                        console.log("Error getting documents: ", error);
                      });
                  });
                  setLoading(false);
                  history.goBack();
              } else {
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
                        .add({
                          name: userInfo?.name,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "pdf",
                          pdfUrl: downloadURL,
                          pdfName: fileName,
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });

                db.collection("users")
                  .doc(chatId)
                  .collection("chats")
                  .where("email", "==", userInfo?.email)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());

                      db.collection("users")
                        .doc(chatId)
                        .collection("chats")
                        .doc(doc.id)
                        .collection("messages")
                        .add({
                          name: userInfo?.name,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                          type: "pdf",
                          pdfUrl: downloadURL,
                          pdfName: fileName,
                          status : "unseen"
                        });
                    });
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
                  setLoading(false);
                  history.goBack(); 
              }
            }
          }
        }
      );
    }
  };

  return (
    <>
      {loading === false ?(<Container>
        <>
          <div className="submit_assignment_page_header">
            <ArrowBackIcon
              className="arrow_back_icon"
              onClick={close_send_pdf}
            />
          </div>
          <div className="upload_pdf">
            <input
              type="file"
              name="file"
              onChange={handlePdfFileChange}
              required
            />
            {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
            <button type="submit" className="" onClick={handlePdfFileSubmit}>
              Upload
            </button>
          </div>
          <p className="view_pdf">View Pdf</p>
          <div className="pdf-container">
            {/* show pdf conditionally (if we have one)  */}
            {viewPdf && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={viewPdf}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}

            {/* if we dont have pdf or viewPdf state is null */}
            {!viewPdf && <>No pdf file selected</>}
          </div>
          <div className="submit_button_div">
            <button onClick={send_pdf}>Send</button>
          </div>
        </>
      </Container>): (<Loading/>)}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  height: 100%;

  .submit_assignment_page_header {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-top: 10px;
    p {
      width: 100%;
      text-align: center;
      margin-bottom: 0px;
      font-size: 18px;
    }
  }

  .arrow_back_icon {
    font-size: 18px;
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  .upload_pdf {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    width: 92%;
    margin-left: auto;
    margin-right: auto;

    button {
      width: 80px;
      border-radius: 20px;
      background-color: white;
      padding: 7px;
      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }

  .view_pdf {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    font-size: 17px;
  }

  .pdf-container {
    width: 90%;
    height: 75vh;
    background-color: #e4e4e4;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  .error-msg {
    width: 100%;
    color: red;
    font-size: 14px;
    font-weight: 600;
  }

  .marks {
    width: 90%;
    margin-left: auto;
    margin-right: auto;

    p {
      margin-bottom: 5px;
    }
  }

  .submit_button_div {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: flex-end;

    button {
      width: 80px;
      border-radius: 20px;
      background-color: #1183e0;
      color: white;
      padding: 7px;
      &:hover {
        cursor: pointer;
        background-color: #63b3f5;
      }
    }
  }

  @media (max-width: 420px) {
    .upload_pdf {
      display: flex;
      flex-direction: column;
      button {
        margin-top: 10px;
        width: 100%;
        border-radius: 10px;
      }
    }
  }
`;

export default UploadChatPdf;
