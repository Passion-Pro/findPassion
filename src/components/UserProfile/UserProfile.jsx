import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db, { storage } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import PassionPopup from "../sign/CreateAccount/PassionPopup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import { actionTypes } from "../../reducer";
import AddLearntPopup from "./AddLearntPopup";
import LearntStuff from "./LearntStuff";

function UserProfile() {
  const [{ passion, user, userInfo }, dispatch] = useStateValue();
  const [experience, setExperience] = useState();
  const [image, setImage] = useState();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [learntStuff, setLearntStuff] = useState([]);
  const [involvement, setInvolvement] = useState("");
  const [description, setDescription] = useState("");
  const [achievement, setAchievement] = useState("");

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("learntStuff")
        .onSnapshot((snapshot) =>
          setLearntStuff(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );

      setExperience(userInfo?.experience);
      dispatch({
        type: actionTypes.SET_PASSION,
        passion: userInfo?.passion,
      });
    }
  }, [user]);

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

  const update_account = (e) => {
    e.preventDefault();
    if (image) {
      const id1 = uuid();

      const upload = storage.ref(`JourneyImages/${id1}`).put(image);

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
          const imageUrl = await upload.snapshot.ref.getDownloadURL();
          if (imageUrl) {
            db.collection("users").doc(user?.uid).update({
              passion: passion,
              experience: experience,
              subInterest: input,
              currentInvolvement: involvement,
              involvementDescription: description,
              profilePhotoUrl: imageUrl,
              achievement : achievement
            }).then(() => {
              alert("Updated your account !!!")
            })
          }
        }
      );
    } else {
      db.collection("users").doc(user?.uid).update({
        passion: passion,
        experience: experience,
        subInterest: input,
        currentInvolvement: involvement,
        involvementDescription: description,
        achievement : achievement
      }).then(() => {
        alert("Updated your account !!!")
      })
    }

    console.log("Passion is ", passion);
    console.log("Experience is ", experience);
  };

  const open_add_learnt_popup = (e) => {
    dispatch({
      type: actionTypes.OPEN_ADD_LEARNT_POPUP,
      openAddLearntPopup: true,
    });
  };

  return (
    <Container>
      <div className="left">
        {image ? (
          <Avatar className="avatar" src={URL.createObjectURL(image)} />
        ) : (
          <Avatar className="avatar" src={userInfo?.profilePhotoUrl} />
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
          <p>Change profile photo</p>
        </label>
        <p className="name">Ronak</p>
      </div>
      <div className="right">
        <div className="right_header">
          <p>Passion</p>
        </div>
        <div className="right_details">
          <div className="add_learnt_stuff">
            <button onClick={open_add_learnt_popup}>
              {learntStuff?.length > 0
                ? `Add to your learnings`
                : ` Show your learnt stuff`}
            </button>
          </div>
          <div className="leant_stuff">
            {learntStuff.map((learntStuff) => (
              <LearntStuff learntStuff={learntStuff} />
            ))}
          </div>
          <div className="current_involvement">
            <input
              type="text"
              placeholder="Enter your current involvement  Eg.internship, project"
              value={involvement}
              onChange={(e) => setInvolvement(e.target.value)}
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Describe about your involvement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Enter any of your achievement"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
            />
          </div>
          <div className="passion">
            <p onClick={open_passion_popup} className="select_passion">
              Your passion :{" "}
            </p>
            {passion ? <p>{passion}</p> : <p>{userInfo?.passion}</p>}
          </div>
          <>
            <div className="subfield">
              <p>Your subInterest in passion:</p>
              <input
                type="text"
                placeholder={userInfo?.subInterest}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  textTransform: "uppercase",
                }}
              />
            </div>
          </>

          <div className="experience">
            <p>Experience in your passion: </p>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel id="demo-simple-select-label">
                {userInfo?.experience === 0
                  ? `Less than 1 year`
                  : `${userInfo?.experience} year`}
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

          <div className="create_account_button">
            <button onClick={update_account}>Update Account</button>
          </div>
        </div>
      </div>
      <PassionPopup />
      <AddLearntPopup />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
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
        margin-bottom: 10px;
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

  .name {
    text-align: center;
    margin-top: 0;
    font-family: "Helvetica Neue";
    font-size: 20px;
  }

  .add_learnt_stuff {
    margin-top: 20px;
    margin-bottom: 10px;

    button {
      width: 200px;
      padding: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #00a2ff;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #418dff;
      }
    }
  }

  .current_involvement {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      border-radius: 5px;
      height: 15px;
      padding: 10px;
      width: 60%;
      border: 1px solid gray;
      margin-bottom: 20px;
      outline: 0;
    }

    textarea {
      resize: none;
      border-radius: 5px;
      width: 70%;
      border: 1px solid gray;
      padding: 5px;
      outline: 0;
      margin-bottom : 20px;
    }
  }
`;

export default UserProfile;
