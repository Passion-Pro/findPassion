
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import QualitiesPopup from "./QualitiesPopup";
import Quality from "./Quality";
import PassionPopup from "./PassionPopup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import db, { auth, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import LearningsPopup from "./LearningsPopup";
import firebase from "firebase";
import { styled as style } from "@mui/material/styles";

import { PhotoCamera } from "@mui/icons-material";
import BackgroundI from "../../images/home_indicator.svg";
import DownImage from "../../images/down_image.svg";


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
  const [experience, setExperience] = useState(0);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [year, setYear] = useState(0);
  const [branch, setBranch] = useState();
  const [coverImage, setCoverImage] = useState();
  const[personInfo , setPersonInfo] = useState();


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

    console.log("User is ", user);
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
    if (name && passion && branch && year && user?.uid && experience) {

      console.log(experience);

        // db.collection("users").doc(user.uid).set({
        //   name: name,
        //   email: user?.email,
        //   passion: passion,
        //   branch: branch,
        //   year: year,
        //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // });
     
        db.collection("users").doc(user.uid).set({
          name: name,
          email: user?.email,
          passion: passion,
          experience: experience,
          // subInterest: input,
          branch: branch,
          year: year,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      
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

      db.collection("users")
        .doc(user.uid)
        .collection("pageViews")
        .doc("learningsPage")
        .set({
          views: 0,
        });
      db.collection("users")
        .doc(user.uid)
        .collection("pageViews")
        .doc("journeysPage")
        .set({
          views: 0,
        });
      db.collection("users")
        .doc(user.uid)
        .collection("pageViews")
        .doc("postsPage")
        .set({
          views: 0,
        });

      history.push("/world");
    } else {
      alert("Please fill all the details");
    }
  };

  const add_background_image = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  return (
    <Container>
      <img src={BackgroundI} alt="" className="left_image" />
      <img src={DownImage} alt="" className="right_image" />
      <div className="create_header">
        <p className="passion_title">Passion</p>
      </div>
      <div className="create_boxes">
        <div className="box_1">
          <div
            className="box_1_up"
            style={{
              backgroundImage:
                coverImage && `url(${URL.createObjectURL(coverImage)})`,
            }}
          >
            {image ? (
              <div className="photo">
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
              <div className="photo">
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
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  Add background image
                </p>
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
          <div className="box_1_down">
            <p
              style={{
                width: "80%",
                fontSize: "14px",
                paddingBottom : '20px'
              }}
            >
              Logged in as {user?.email} , if you want to change email
              <span
                style={{
                  marginLeft: "5px",
                  textDecoration: "underline",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                logout
              </span>
            </p>
            <input type="text" placeholder="Name" 
             value = {name}
             onChange={(e) => setName(e.target.value)}
            />
            <input type="text" placeholder="Branch" 
              value = {branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            <input type="text" placeholder="Year" 
               value = {year}
               onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        <div className="box_2">
          <button
            onClick = {open_passion_popup}
          > {passion ? passion : 'Select Your Passion'}</button>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Write about yourself"
            value = {personInfo}
            onChange = {(e) => setPersonInfo(e.target.value)}
          ></textarea>
          <div className="experience">
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-label">Experience</InputLabel>
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
        </div>
        <button className="create_button"
         onClick = {create_account}
        >Create Account</button>
      </div>
      <PassionPopup/>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height : 100vh;

  @media(max-width: 900px){
    height : 100%;
  }

  .left_image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    min-width: 200px;
    max-width: 25vw;
    object-fit: contain;
  }

  .right_image {
    position: absolute;
    bottom: 0 !important;
    right: 0;
    z-index: -1;
    max-width: 25vw;
    min-width: 200px;
    object-fit: contain;
  }

  .passion_title {
    font-family: "Signika";
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 59px;
    color: #03045e;
    margin-top: 0;
    margin-bottom: 30px;
    padding-left: 30px;
    padding-top: 20px;
  }

  .create_boxes {
    display: flex;
    justify-content: space-around;
    max-width: 1250px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
    }

    .box_1 {
      width: 400px;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      @media (max-width: 900px) {
       width : 370px;
    }
    }

    .avatar {
      width: 80px !important;
      height: 80px !important;
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
      border: 2px solid white;
      margin-bottom: 10px;
    }

    .box_1_up {
      align-items: center;
      justify-content: center;
      height: 180px;
      border-bottom: 1px solid lightgray;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background: #f2f2f2;

      @media (max-width: 900px) {
      height : 180px;
    }
    }

    .box_1_down {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #b4ecf6;
      padding: 20px 0 20px 0;
      height: 300px !important;
      justify-content: center;

      span {
        &:hover {
          cursor: pointer;
        }
      }

      input {
        border: 0;
        border-radius: 10px;
        padding: 10px;
        width: 80%;
        outline: 0;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }

    .box_2 {
      width: 400px;
      height: 521px;
      background: #b4ecf6;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (max-width: 900px) {
       width : 370px;
       height : 510px;
    }

      button {
        margin-top: 20px;
        width: 80%;
        background-color: #fff;
        border: 1px solid lightgray;
        padding: 10px;
        border-radius: 5px;

        &:hover {
          cursor: pointer;
          background-color: lightgray;
        }
      }

      textarea {
        margin-top: 20px;
        flex: 1;
        margin-bottom: 10px;
        width: 75%;
        background-color: #fff;
        border: 1px solid lightgray;
        resize: none;
        padding: 10px;
      }

      .MuiFormControl-root.css-1f4ug3e-MuiFormControl-root {
        background: white;
        width: 100% !important;
      }

      .experience {
        width: 81%;
        margin-bottom: 10px;
      }
    }
  }

  .create_button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 20px;
    margin-bottom: 20px;
    background: #0077b6;
    border-radius: 16px;
    color: white;
    border: 0;
    min-width: 200px;
    font-size: 16px;
    height: 56px;

    @media (max-width: 900px) {
      position : relative;
      margin-top : 20px;
    }

    &:hover {
      cursor : pointer;
    }
  }
`;

export default CreateAccount;
