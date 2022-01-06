import React , {useState, useEffect} from 'react'
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import PassionPopup from '../sign/CreateAccount/PassionPopup';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import { actionTypes } from '../../reducer';





function UserProfile() {
    const [{ passion , user , userInfo }, dispatch] =
    useStateValue();
  const [experience, setExperience] = useState();
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const history = useHistory();
  const [input, setInput] = useState("");
  
  useEffect(() => {
     
  } , [])


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
     
  }


    return (
    <Container>
      <div className="left">
        {image ? (
          <Avatar className="avatar" src={URL.createObjectURL(image)} />
        ) : (
          <Avatar className="avatar" src = {userInfo?.profilePhotoUrl} />
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
        <p className = "name">Ronak</p>
      </div>
      <div className="right">
        <div className="right_header">
          <p>Passion</p>
        </div>
        <div className="right_details">
           <div className="add_learnt_stuff">
              <p></p> 
           </div>
          <div className="passion">
            <p onClick={open_passion_popup} className="select_passion">
              Change your passion , interest:{" "}
            </p>
           {passion? (<p>{passion}</p>):( <p>{userInfo?.passion}</p>)}
          </div>
            <>
              <div className="subfield">
                <p>Mention subInterest in your passion:</p>
                <input
                  type="text"
                  placeholder= {userInfo?.subInterest}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style = {{
                    textTransform : "uppercase"
                  }}
                />
              </div>
            </>
      
         
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
          
          <div className="create_account_button">
            <button onClick={update_account}>Update Account</button>
          </div>
        </div>
      </div>
      <PassionPopup />
    </Container>
    )
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
        margin-bottom : 10px;
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

  .name{
        text-align: center;
        margin-top : 0;
        font-family: "Helvetica Neue";
        font-size : 20px;

        
    }
`;

export default UserProfile