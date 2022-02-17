import React, { useState, useEffect } from "react";
import './userProfile.css'
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db, { storage } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PassionPopup from "../sign/CreateAccount/PassionPopup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import { actionTypes } from "../../reducer";
import AddLearntPopup from "./AddLearntPopup";
import LearntStuff from "./LearntStuff";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostCard from '../post/PostCard'

function UserProfile() {
  const [{ passion, user, userInfo, EditUserProfile }, dispatch] = useStateValue();
  const [experience, setExperience] = useState();
  const [image, setImage] = useState();
  const history = useHistory();
  const [post ,setPosts]=useState([]);


  const [input, setInput] = useState("");
  const [learntStuff, setLearntStuff] = useState([]);
  const [involvement, setInvolvement] = useState("");
  const [description, setDescription] = useState("");
  const [achievement, setAchievement] = useState("");
  const[tags, setTags] = useState([]);
  const[passions ,setPassions] = useState([]);

useEffect(()=>{
if(user?.uid){
  db.collection('users').doc(user?.uid).collection('Posts').onSnapshot((snapshot)=>(
    setPosts(
      snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }))
    )
  ))
}
},[]);
console.log(post);

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

        db.collection("passions").onSnapshot((snapshot) => {
          setPassions(
            snapshot.docs.map((doc) => ({
              id : doc.id,
              data : doc.data(),
            }))
          )
        })

      setExperience(userInfo?.experience);
      dispatch({
        type: actionTypes.SET_PASSION,
        passion: userInfo?.passion,
      });
    }
  }, [user]);

  useEffect(() => {
    if(passions?.length > 0) {
       
        for(let i = 0; i < passions?.length; i++){
          db.collection("passions").doc(passions[i].id).collection("learningTags").onSnapshot((snapshot) => (
            
               snapshot.docs.map((doc) => {
                 tags.push(doc.data())
               }) 
            
          ))
        }
     }
  } , [passions, user ]);

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
              achievement: achievement
            }).then(() => {
              alert("Updated your account !!!")
              dispatch({
                type: actionTypes.SET_EDIT_USER_PROFILE,
                EditUserProfile: false,
              })
            })
          }
        }
      );
    } else {
      if (user?.uid) {
        db.collection("users").doc(user?.uid).update({
          passion: passion,
          experience: experience,
          subInterest: input,
          currentInvolvement: involvement,
          involvementDescription: description,
          achievement: achievement
        }).then(() => {
          alert("Updated your account !")
          dispatch({
            type: actionTypes.SET_EDIT_USER_PROFILE,
            EditUserProfile: false,
          })
        })
      } else {
        alert('Something went wrong !')
        dispatch({
          type: actionTypes.SET_EDIT_USER_PROFILE,
          EditUserProfile: false,
        })
      }
    }
  };

  const open_add_learnt_popup = (e) => {
    dispatch({
      type: actionTypes.OPEN_ADD_LEARNT_POPUP,
      openAddLearntPopup: true,
    });
  };

  return (
    <div className="Userprofile">
      <div className="Userprofile__In">
        <div className="userProfile__headerMobile">
          <div>
            <ArrowBackRoundedIcon />
          </div>
          <div>
            Your Profile
          </div>
          <div></div>
        </div>
        <div className="Userprofile__first">
          {image ? (
            <Avatar src={URL.createObjectURL(image)} style={{ height: '12vh', width: '12vh' }} />
          ) : (
            <Avatar src={userInfo?.profilePhotoUrl} style={{ height: '12vh', width: '12vh' }} />
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
            {EditUserProfile ? <div className="changeImage">Change profile photo</div> : <div className="changeImage">Branch: {userInfo?.branch}</div>}
          </label>
          <div className="name">{userInfo?.name}</div>
          <div className="profile__Branch" style={{ fontWeight: 800 }}>Passion  {userInfo?.passion ? userInfo?.passion : <div style={{ paddingLeft: '4px' }}>: --</div>}</div>
        </div>
        <div className="Userprofile__Second">
          <div className={window.location.pathname === '/userProfile' ? 'Userprofile__Second_Option_Active' : "Userprofile__Second_Option"} onClick={() => {
            // setwindow.location.pathname('Info')
            history.push('/userProfile');
          }}>
            About
          </div>
          <div className={window.location.pathname === '/userProfilePost' ? 'Userprofile__Second_Option_Active' : "Userprofile__Second_Option"} onClick={() => {
            history.push('/userProfilePost');
          }}>
            Posts
          </div>
          <div className={window.location.pathname === '/userProfileLearnt' ? 'Userprofile__Second_Option_Active' : "Userprofile__Second_Option"} onClick={() => {
            history.push('/userProfileLearnt');
          }}>
            Learnt Stuff
          </div>
        </div>

        {/* post page */}
        {window.location.pathname === '/userProfilePost' && <div className="Userprofile__Third__post">
          {post.map((data)=>(
        <PostCard data={data}/>
          ))}
        </div>
        }

        {/* learnt page */}
        {window.location.pathname != '/userProfilePost' && window.location.pathname === '/userProfileLearnt' && window.location.pathname != '/userProfile' && <div className="Userprofile__Third__learntstuff">
          <div className="add_learnt_stuff">
            <button onClick={open_add_learnt_popup}>
              {learntStuff?.length > 0
                ? `Add to your learnings`
                : ` Show your learnt stuff`}
            </button>
          </div>
          <div className="leant_stuff">
            {learntStuff.map((learntStuff) => (
              <LearntStuff learntStuff={learntStuff} tags = {tags} />
            ))}
          </div>
        </div>
        }


        {/* About page  */}
        {/* UPDATE PROFILE  */}
        {window.location.pathname != '/userProfilePost' && window.location.pathname != '/userProfileLearnt' && window.location.pathname === '/userProfile' && <div className="Userprofile__Third">
          {
            EditUserProfile ?
              <>
                {/* for update */}
                <div className="Userprofile__Third__info">
                  <div className="Userprofile__Third__infoIn">
                    <div className="current_involvement">
                      <TextField
                        type="text"
                        size="small"
                        label="Enter your current involvement  Eg.internship, project"
                        value={involvement}
                        onChange={(e) => setInvolvement(e.target.value)}
                        className="userProfile__input"
                      />
                      <TextField
                        type="text"
                        size="small"
                        label="Describe about your involvement"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="userProfile__input"
                      />
                      <TextField
                        type="text"
                        size="small"
                        label="Enter any of your achievement"
                        value={achievement}
                        onChange={(e) => setAchievement(e.target.value)}
                        className="userProfile__input"
                      />
                    </div>
                    <div className="subfield__userProfile">
                      <div onClick={open_passion_popup} className="select_passion">
                        Your passion :{" "}
                      </div>
                      {passion ?
                        <TextField
                          type="text"
                          id="outlined-name"
                          size="small"
                          label={passion}
                          // value={passion}
                          style={{
                            // textTransform: "uppercase",
                            width: '170px',
                          }}
                        /> :
                        <TextField
                          type="text"
                          id="outlined-name"
                          size="small"
                          label={userInfo?.passion}
                          // value={userInfo?.passion}
                          style={{
                            width: '170px',
                          }}
                        />}
                    </div>
                    <div className="subfield__userProfile">
                      <div>Your subInterest in passion:</div>
                      <TextField
                        type="text"
                        id="outlined-name"
                        size="small"
                        label={userInfo?.subInterest}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                          textTransform: "uppercase",
                          width: '170px',
                        }}
                      />
                    </div>

                    <div className="subfield__userProfile">
                      <div>Experience in your passion: </div>
                      <FormControl size="small" style={{ width: '170px' }}>
                        <InputLabel id="demo-simple-select-label" size="small" className="InputLabel__userProfile">
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
                    <div className="subfield__userProfile">
                      <Button style={{ width: '100%' }} variant="contained" onClick={update_account}>Save Changes</Button>
                    </div>
                  </div>
                  <PassionPopup />
                </div>
              </>
              :
              // show
              <>
                <div className="Userprofile__Third__info">
                  <div className="Userprofile__Third__infoIn">
                    <div className="current_involvement">
                      <TextField
                        id="filled-read-only-input"
                        type="text"
                        size="small"
                        label="Involvement"
                        defaultValue={userInfo?.currentInvolvement ? userInfo?.currentInvolvement : 'Not written anything'}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                        className="userProfile__input"
                        multiline
                      />
                      <TextField
                        id="filled-read-only-input"
                        type="text"
                        size="small"
                        label="Involvement"
                        defaultValue={userInfo?.involvementDescription ? userInfo?.involvementDescription : 'Not written anything'}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                        className="userProfile__input"
                        multiline
                      />
                      <TextField
                        id="filled-read-only-input"
                        type="text"
                        size="small"
                        label="achievement"
                        defaultValue={userInfo?.achievement ? userInfo?.achievement : 'Not written anything'}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                        className="userProfile__input"
                        multiline
                      />
                    </div>
                    <div className="current_involvement">
                      <TextField
                        id="filled-read-only-input"
                        type="text"
                        size="small"
                        label="Passion"
                        defaultValue={userInfo?.passion ? userInfo?.passion : 'Not set yet'}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                        className="userProfile__input"
                        multiline
                      />

                    </div>
                    <div className="current_involvement">
                      <TextField
                        id="filled-read-only-input"
                        type="text"
                        size="small"
                        label="Your subInterest in passion"
                        defaultValue={userInfo?.subInterest ? userInfo?.subInterest : 'Not set yet'}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                        className="userProfile__input"
                        multiline
                      />
                    </div>

                    <div className="current_involvement">
                      <TextField
                        id="filled-read-only-input"
                        type="text"
                        size="small"
                        label="Experience in your passion"
                        defaultValue={userInfo?.experience === 0
                          ? `Less than 1 year`
                          : `${userInfo?.experience} year`}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                        className="userProfile__input"
                        multiline
                      />
                    </div>
                    <div className="subfield__userProfile">
                      <Button style={{ width: '100%' }} variant="contained" onClick={() => {
                        dispatch({
                          type: actionTypes.SET_EDIT_USER_PROFILE,
                          EditUserProfile: true,
                        })
                      }}>Update</Button>
                    </div>
                  </div>
                  <PassionPopup />
                </div>
              </>
          }
        </div>
        }
      </div>
      <PassionPopup />
      <AddLearntPopup tags = {tags} />
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

  .selected_tags{
    display : flex;
    flex-wrap : wrap;
    margin-top : 10px;
  }
`;

export default UserProfile;
