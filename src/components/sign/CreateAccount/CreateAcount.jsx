import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  const[year , setYear] = useState();
  const[branch , setBranch] = useState();

  useEffect(() => {
    if(year === 1){
      dispatch({
        type : actionTypes.SET_PASSION,
        passion : "Don't know"
      })
    }
  } , [year])

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

    if (email && password && name && selectedQualities.length > 0 && passion && branch && year) {
      console.log(experience);
      if (
        (passion !== "Don't know" && experience) ||
        passion === "Don't know"
      ) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
            if (auth) {
              dispatch({
                type: actionTypes.SET_USER,
                user: auth.user,
              });

              if (passion === "Don't know") {
                db.collection("users").doc(auth.user.uid).set({
                  name: name,
                  email: email,
                  qualities: selectedQualities,
                  passion: passion,
                  subInterest : input,
                  branch : branch,
                  year : year,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
              } else {
                db.collection("users").doc(auth.user.uid).set({
                  name: name,
                  email: email,
                  qualities: selectedQualities,
                  passion: passion,
                  experience: experience,
                  subInterest : input,
                  branch : branch,
                  year : year,
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
                      db.collection("users").doc(auth.user.uid).update({
                        profilePhotoUrl: url,
                      });
                    }
                  }
                );
              }

              history.push("/world");
            }
          })
          .catch((error) => alert(error.message));
      } else {
        alert("Please fill all the details");
      }
    } else {
      alert("Please fill all the details");
    }
  };

  return (
    <Container>
      <div className="left">
        {image ? (
          <Avatar className="avatar" src={URL.createObjectURL(image)} />
        ) : (
          <Avatar className="avatar" />
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
        <label htmlFor="photo">
          <p>Select a profile photo</p>
        </label>
      </div>
      <div className="right">
        <div className="right_header">
          <p>Passion</p>
        </div>
        <div className="right_details">
          <div className="info">
            <p>Email:</p>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="info">
            <p>Password:</p>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="info">
            <p>Username:</p>
            <input
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="info">
            <p>Branch:</p>
            <input
              type="text"
              placeholder="Enter branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="info">
            <p>Year:</p>
            <input
              type="text"
              placeholder="Enter email"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="description">
            <p onClick={openQaulitiesPopup} className="let_us">
              Let us know more about you
            </p>
            {selectedQualities.length > 0 && (
              <div className="selected_qualities_div">
                {selectedQualities?.length > 0 && (
                  <p className="your_qualities">Your Qualities:</p>
                )}
                <div className="selected_qualities_div_qualities">
                  {selectedQualities.map((quality) => (
                    <Quality quality={quality} />
                  ))}
                </div>
              </div>
            )}
          </div>
         <div className="passion">
            <p onClick={open_passion_popup} className="select_passion">
              Select your passion , interest:{" "}
            </p>
            <p>{passion}</p>
          </div>
          {passion && passion !== "Don't know" && (
            <>
              <div className="subfield">
                <p>Mention subInterest in your passion:</p>
                <input
                  type="text"
                  placeholder=""
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style = {{
                    textTransform : "uppercase"
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
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* align-items : center; */
  overflow: hidden;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    padding-bottom: 20px;
  }

  .left {
    flex: 0.3;
    padding-top: 20px;
    border-right: 1px solid lightgray;
    align-items: center;
    justify-content: center;
    height: 100%;

    label {
      p {
        color: #006eff;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .avatar {
    width: 150px !important;
    height: 150px !important;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  }

  .right {
    flex: 0.7;
    display: flex;
    flex-direction: column;

    .right_header {
      padding-left: 20px;
      border-bottom: 1px solid lightgray;
    }

    .right_details {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding-bottom: 20px;
    }

    .right_details::-webkit-scrollbar {
      display: none;
    }

    .info {
      p {
        margin-bottom: 6px;
      }
      input {
        margin-bottom: 0px;
        border-radius: 5px;
        height: 15px;
        padding: 5px;
        width: 40%;
      }
    }

    .description {
    }

    .let_us {
      &:hover {
        cursor: pointer;
        color: blue;
      }
    }

    .selected_qualities_div {
      display: flex;
      flex-direction: column;
      border: 1px solid lightgray;
      padding-left: 10px;
      padding-top: 10px;
      width: 75%;
      border-radius: 10px;
    }

    .selected_qualities_div_qualities {
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
      }
    }

    .create_account_button {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      button {
        /* padding-top : 10px;
            padding-bottom : 10px; */
        border-radius: 20px;
        padding: 10px;
        background-color: #7cdff8;
        border: 1px solid lightgray;

        &:hover {
          cursor: pointer;
          background-color: #56caf8;
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
`;

export default CreateAccount;
