import React from 'react';
import { useState } from 'react'
import './Header.css';
import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';

function Header() {
    const [{ userInfo, user }] = useStateValue();
    const [showSearch, setShowSearch] = useState(false);
    const history = useHistory();
    const signupimage = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyIOUxxjs2jzo7X6iOYOBKWDzVhPkx0dxK8w&usqp=CAU`;

    const [showAddAdvice, setShowAddAdvice] = useState(false);
    const [advice, setAdvice] = useState('');
    const [adviceHead, setAdviceHead] = useState('');

    var today = new Date();
    var date = today.toLocaleString();

    const addAdvice = () => {
        if (userInfo?.passion) {
            db.collection(userInfo?.passion).doc('Csb15iOnGedmpceiQOhX').collection('advice').add({
                date: date,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                advice: advice,
                adviceHead: adviceHead,
                name: userInfo?.name,
                email: user?.email,
                passion:userInfo?.passion,
            }).then(()=>{
                setShowAddAdvice(false)
            })
        } else {
            alert('Something went wrong');
        }
    }
    return (
        <div className='header' >
            {showAddAdvice && (
                <Container>
                    <div className="addLearning">
                        <div className="add_learning_header">
                            <CloseIcon className="close_icon"
                                onClick={() => {
                                    setShowAddAdvice(false)
                                }}
                            />
                        </div>
                        <div className="group_photo">
                            <div className="learning_detail" style={{flexDirection:'column'}}>
                                <textarea 
                                    style={{
                                        resize: 'none',
                                        outline: 'none',
                                        border: '1px solid lightblue',
                                        padding: '2%',
                                        margin: '2% 0',
                                        width:'94%',
                                        height: '50px',
                                        borderRadius:'6px',
                                    }}
                                    type="text"
                                    placeholder="Advice heading"
                                    maxlength="70"
                                    onChange={e => setAdviceHead(e.target.value)}
                                />
                                <textarea 
                                    style={{
                                        resize: 'none',
                                        outline: 'none',
                                        border: '1px solid lightblue',
                                        padding: '2%',
                                        margin: '2% 0',
                                        width:'94%',
                                        height: '300px',
                                        borderRadius:'6px',
                                    }}
                                    type="text"
                                    placeholder="Advice"
                                    maxlength="70"
                                    onChange={e => setAdvice(e.target.value)}
                                />
                            </div>
                            <div className="start_button">
                                <button onClick={addAdvice} >Add</button>
                            </div>
                        </div>
                    </div>
                </Container>
            )}
            <div className="header_In">
                <div className="header__Logo">
                    Passion
                </div>
                <div className="header__Icons">
                    <div className="header__Icon__search">
                        {/* {<div className='searchHeader__divOut' >
                            <div className='searchHeader__div'>
                                <SearchRoundedIcon />
                                <input placeholder='Search' className='searchHeader__input' />
                            </div>
                        </div>} */}
                    </div>
                </div>
                <div className="header__profile">
                    <button onClick={() => user?.email ? history.push('/shareexperience'):'You are not sign up'}>Add Your Advice</button>
                </div>
                <div className="header__profile">
                    {!user?.email && <button onClick={() => history.push('/login')}>Sign In</button>}
                </div>
            </div>
        </div>
    )
}

export default Header;

const Container = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 12;
color: black;
background-color: #858484cc;
display: flex;
justify-content: center;
animation: fadeIn 0.7s;
z-index:101;

.addLearning {
  background-color: #fff;
  width: 400px;
  height: fit-content;
  margin: auto;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
  padding: 10px;

  @media (max-width: 500px) {
    width: 85vw;
  }

  .add_learning_header {
    display: flex;
    justify-content: flex-end;

    .close_icon {
      margin-right: 5px;
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }
  }

  .group_photo {
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    width:100%;
    .group_photo_Image{
        display:flex;
        flex-direction: column;
        align-items:center !important;
        justify-content:center;
        padding:4px 0 8px 0 ;
    }
    .group_photo_avatar {
      width: 150px;
      height: 150px;
      margin-left: auto;
      margin-right: auto;
    }

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

  .learning_detail {
    width: 100%;
    display: flex;
    justify-content: center;

    input {
      margin-left: auto;
      margin-right: auto;
      border-radius: 10px;
      border: 1px solid gray;
      padding: 10px;
      width: 80%;
      outline: 0;
    }
  }
}

.start_button {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  width: 95%;

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
}
`;