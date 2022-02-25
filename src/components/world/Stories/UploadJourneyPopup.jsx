import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useStateValue } from "../../../StateProvider";
import { v4 as uuid } from "uuid";
import db, { storage } from "../../../firebase";
import { useHistory } from "react-router-dom";
import Loading from "../../../Loading";
import { actionTypes } from "../../../reducer";

function UploadJourneyPopup({ setUploadJourney  , imagesInfo }) {
  const [{ user, userInfo }, dispatch] = useStateValue();
  const [image, setImage] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const upload_journey = (e) => {
    if (image) {
      const id = uuid();

      const upload = storage.ref(`JourneyImages/${id}`).put(image);
      setLoading(true);

      upload.on(
        "state_changed",
        (snapshot) => {
          dispatch({
            type : actionTypes.SET_UPLOADING,
            uploading : true
          })
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const imageUrl = await upload.snapshot.ref.getDownloadURL();
          if (imageUrl) {

            db.collection("users")
              .doc(user?.uid)
              .update({
                journeyThrough: "photos",
                journeyCards : imagesInfo
              })


            db.collection("journeys")
              .doc(user?.uid)
              .update({
                achievementUrl: imageUrl,
                upload: "yes",
              })
              .then(() => {
                history.push("/stories");
                dispatch({
                  type : actionTypes.SET_UPLOADING,
                  uploading : true
                })
              });
          }
        }
      );
    }
  };

  return (
    <>
        <Container>
          <div className="uploadJourney_Popup">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <CloseIcon
                className="close_icon"
                onClick={() => {
                  setUploadJourney(false);
                }}
              />
            </div>
            <input
              type="file"
              id={"image"}
              style={{ display: "none" }}
              onChange={selectImage}
              accept="image/git , image/jpeg , image/png"
            />
            <label htmlFor="image">
              <p>Upload any image of your achievement in {userInfo?.passion}</p>
            </label>
            {image && (
              <div className="selected_image">
                <img src={URL.createObjectURL(image)} alt="" />
              </div>
            )}
            {image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                  marginRight: "10px",
                }}
              >
                <button onClick={upload_journey}>
                  <p>Upload Journey</p>
                  <span>🎬</span>
                </button>
              </div>
            )}
          </div>
        </Container>
    </>
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

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .uploadJourney_Popup {
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .close_icon {
    margin-right: 5px;
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  label {
    p {
      color: #006eff;
      margin-top: 0;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .selected_image {
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 80%;
      border-radius: 10px;
      object-fit: contain;
    }
  }

  button {
    padding: 10px;
    border-radius: 20px;
    background-color: #6868fa;
    color: white;
    border: 0;
    display: flex;

    img {
      height: 20px;
      width: 20px;
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }

    span {
      margin-left: 5px;
    }

    &:hover {
      cursor: pointer;
      background-color: #9090fc;
    }
  }
`;

export default UploadJourneyPopup;
