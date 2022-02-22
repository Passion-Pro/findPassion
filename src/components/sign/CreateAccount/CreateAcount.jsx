import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import QualitiesPopup from "./QualitiesPopup";
import Quality from "./Quality";
import PassionPopup from "./PassionPopup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import db, { auth, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import LearningsPopup from "./LearningsPopup";
import Learning from "./Learning";
import Skill from "./Skill";
import firebase from "firebase";
import { styled as style } from "@mui/material/styles";

import { PhotoCamera } from "@mui/icons-material";

const StyledBadge = style(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = style(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function CreateAccount() {
  const [{ selectedQualities, passion, user, learnings }, dispatch] =
    useStateValue();
  const [experience, setExperience] = useState();
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [year, setYear] = useState();
  const [branch, setBranch] = useState();
  const[coverImage ,setCoverImage] = useState();
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/newAccount",
    });
  }, []);
  useEffect(() => {
    if (year === 1) {
      dispatch({
        type: actionTypes.SET_PASSION,
        passion: "Don't know",
      });
    }

    console.log("User is ", user)
  }, [year]);

  const openQaulitiesPopup = () => {
    dispatch({
      type: actionTypes.OPEN_QUALITIES_POPUP,
      openQualitiesPopup: true,
    });
  };

  const open_passion_popup = () => {
    dispatch({
      type: actionTypes.OPEN_PASSION_POPUP,
      openPassionPopup: true,
    });
  };

  const handleChange = (e) => {
    setExperience(e.target.value);
  };

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const open_learnings_popup = () => {
    dispatch({
      type: actionTypes.OPEN_LEARNINGS_POPUP,
      openLearningsPopup: true,
    });
  };

  const create_account = (e) => {
    e.preventDefault();

    if (
      name &&
      selectedQualities.length > 0 &&
      passion &&
      branch &&
      year
      && user?.uid
    ) {
      console.log(experience);
      if (
        (passion !== "Other" && experience) ||
        passion === "Other"
      ) {
        if (passion === "Don't know") {
          db.collection("users").doc(user.uid).set({
            name: name,
            email: user?.email,
            qualities: selectedQualities,
            passion: passion,
            subInterest: input,
            branch: branch,
            year: year,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          db.collection("users").doc(user.uid).set({
            name: name,
            email: user?.email,
            qualities: selectedQualities,
            passion: passion,
            experience: experience,
            subInterest: input,
            branch: branch,
            year: year,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
        const id = uuid();

        if (image) {
          const upload = storage.ref(`images/${id}`).put(image);

          upload.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              console.log(`Progress : ${progress}%`);
              if (snapshot.state === "RUNNING") {
                console.log(`Progress : ${progress}%`);
              }
            },
            (error) => console.log(error.code),
            async () => {
              const url = await upload.snapshot.ref.getDownloadURL();
              if (url) {
                db.collection("users").doc(user.uid).update({
                  profilePhotoUrl: url,
                });
              }
            }
          );
        }

        if (coverImage) {
          const upload = storage.ref(`images/${id}`).put(coverImage);

          upload.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              console.log(`Progress : ${progress}%`);
              if (snapshot.state === "RUNNING") {
                console.log(`Progress : ${progress}%`);
              }
            },
            (error) => console.log(error.code),
            async () => {
              const url = await upload.snapshot.ref.getDownloadURL();
              if (url) {
                db.collection("users").doc(user.uid).update({
                  coverImageUrl: url,
                });
              }
            }
          );
        }

        db.collection('users').doc(user.uid).collection('pageViews').doc('learningsPage').set({
          views: 0
        });
        db.collection('users').doc(user.uid).collection('pageViews').doc('journeysPage').set({
          views: 0
        });
        db.collection('users').doc(user.uid).collection('pageViews').doc('postsPage').set({
          views: 0
        });

        history.push("/world");

      } else {
        alert("Please fill all the details");
      }
    } else {
      alert("Please fill all the details");
    }
  };

  const add_background_image = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  }

  return (
    <Container>
      <div className="createIn">
        <div className="up"
          style={{
            backgroundImage: coverImage && `url(${URL.createObjectURL(coverImage)})`
          }}
        >
          {image ? (
            <div className="photo"
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <label htmlFor="photo" className="camera_label">
                    <PhotoCamera className="camera_icon" />
                  </label>
                }
              >
                <Avatar className="avatar" src={URL.createObjectURL(image)} />
              </Badge>
            </div>
          ) : (
            <div className="photo"
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <label htmlFor="photo" className="camera_label">
                    <PhotoCamera className="camera_icon" />
                  </label>
                }
              >
                <Avatar className="avatar" />
              </Badge>
            </div>
          )}
          <input
            type="file"
            style={{
              display: "none",
            }}
            id="photo"
            onChange={selectImage}
            accept="image/git , image/jpeg , image/png"
          />
          <div className="cover_photo">
            <label htmlFor="photo_background">
              <p>Add background image</p>
            </label>
            <input
              type="file"
              style={{
                display: "none",
              }}
              id="photo_background"
              onChange={add_background_image}
              accept="image/git , image/jpeg , image/png"
            />
          </div>
        </div>
        <div className="down">
          <div className="down_details">
            <div className="info">
              <input
                type="text"
                placeholder="Enter username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="info">
              <input
                type="text"
                placeholder="Enter branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>
            <div className="info">
              <input
                type="number"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="description">
              {selectedQualities?.length === 0 && (
                <button onClick={openQaulitiesPopup} className="let_us">
                  Let us know more about you
                </button>
              )}
              {selectedQualities.length > 0 && (
                <div className="selected_qualities_div">
                  <div className="selected_qualities_div_qualities">
                    <div className="edit_button">
                      <button onClick={openQaulitiesPopup}>Edit</button>
                    </div>
                    <div className="s_qualities">
                      {selectedQualities.map((quality) => (
                        <Quality quality={quality} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="passion">
              {!passion && (<button onClick={open_passion_popup} className="let_us">
                Select your passion , interest
              </button>)}
              {passion && (<p>{passion}</p>)}
            </div>
            {passion && passion !== "Don't know" && (
              <>
                <div className="subfield">
                  {passion === 'Research' ? (
                    <p>Mention your topic of Research</p>
                  ) : (<p>Mention subInterest in your passion:</p>)}
                  <input
                    type="text"
                    placeholder=""
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                      textTransform: "uppercase",
                    }}
                  />
                </div>
              </>
            )}
            {passion && passion !== "Don't know" && (
              <div className="experience">
                <p>Experience in your passion: </p>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                  <InputLabel id="demo-simple-select-label">
                    Experience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={experience}
                    label="Experience"
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>Less than 1 year</MenuItem>
                    <MenuItem value={1}>1 year</MenuItem>
                    <MenuItem value={2}>2 years</MenuItem>
                    <MenuItem value={3}>3 years</MenuItem>
                    <MenuItem value={4}>4 years</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            <div className="create_account_button">
              <button onClick={create_account}>Create Account</button>
            </div>
          </div>
        </div>
        <QualitiesPopup />
        <PassionPopup />
        <LearningsPopup />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  .createIn {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    /* border-left : 1px solid lightgray;
    border-right : 1px solid lightgray; */
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    padding-bottom: 20px;
  }

  .up {
    padding-top: 50px;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-bottom: 1px solid lightgray;
    margin-bottom: 20px;
    background-color: #e9e6e6;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

  }

  .avatar {
    width: 150px !important;
    height: 150px !important;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    border: 2px solid white;
  }

  .down {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .right_header {
      padding-left: 20px;
      border-bottom: 1px solid lightgray;
    }

    .down_details {
      /* padding-left: 20px; */
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding-bottom: 20px;
      width : 550px;
    }

    .down_details::-webkit-scrollbar {
      display: none;
    }

    .info {
      margin-bottom: 20px;
      input {
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        border: 1px solid gray;
        padding: 10px;
        width: 400px;
        outline: 0;
      }
    }

    .description {
    }

    .let_us {
      padding: 10px;
      border : 1px solid lightgray;
      border-radius : 5px;
      background-color : white;

      &:hover {
        cursor : pointer;
        background-color : lightgray;
      }
    }

    .selected_qualities_div {
      display: flex;
      flex-direction: column;
      padding: 10px;
      width: 90%;
      border-radius: 10px;
      border: 1px solid lightgray;
    }

    .edit_button {
      button {
        background-color: #ecebeb;
        border: 1px solid gray;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 7px;
        width: 80px;

        &:hover {
          background-color: #b3b3b3;
          cursor: pointer;
        }
      }
    }

    .s_qualities {
      display: flex;
      flex-wrap: wrap;
    }

    .your_qualities {
      margin-bottom: 10px;
      margin-top: 0px;
    }

    .passion {
      margin-top: 15px;
      .select_passion {
        margin-bottom: 10px;
        &:hover {
          cursor: pointer;
          color: blue;
        }
      }
      p {
        margin-top: 0px;
        border : 0;
        padding : 10px;
        background-color : #2174f1;
        color : white;
        border-radius : 20px;
      }
    }

    .create_account_button {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;

      button {
        /* padding-top : 10px;
            padding-bottom : 10px; */
        border-radius: 20px;
        padding: 10px;
        background-color: #847cf8;
        border: 1px solid lightgray;
        color : white;

        &:hover {
          cursor: pointer;
          background-color: #a59fff;
        }
      }
    }

    .subfield {
      p {
        margin-bottom: 5px;
      }

      input {
        border-radius: 5px;
        border: 1px solid gray;
        padding: 7px;
        width: 50%;
        outline: 0;
      }
    }
  }

  .photo {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .camera_label{
    background-color: white;
    padding: 5px;
    padding-bottom: 2px;
    border-radius: 50%;
    display: inline-block;
  }

  .cover_photo{
      margin-bottom : 10px;
      display : flex;
      justify-content : flex-end;
      width : 100%;

      p {
        margin-right : 10px;
        padding : 7px;
        border-radius : 5px;
        background-color : white;
        border : 1px solid lightgray;
        font-size : 14px;
        margin-top : 0;
        margin-bottom : 0;
      }

  }
`;

export default CreateAccount;
