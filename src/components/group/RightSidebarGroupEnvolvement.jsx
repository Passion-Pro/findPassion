import React, { useState } from 'react';
import './RightSidebarGroupEnvolvement.css';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useStateValue } from '../../StateProvider';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EnvolveGraph from './EnvolveGraph';
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import db from '../../firebase';

function RightSidebarGroupEnvolvement() {

    const history = useHistory();
    const [{ userInfo, user, groupMember, groupDetails,showTop }, dispatch] = useStateValue();
    const [newSlogan,setNewSlogan]=useState('');
    const [showPop,setShowPop]=useState(false);

    const changeSlogan=()=>{
        if(groupDetails && newSlogan){
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user?.uid+'Details').update({
                groupSlogan:newSlogan,
            })
        }else{
            alert('Something went wrong!');
        }
    }

    return (
        <>
        {showPop && (
                <Container>
                    <div className="addLearning">
                        <div className="add_learning_header">
                            <CloseIcon className="close_icon"
                                onClick={() => {
                                    setShowPop(false)
                                }}
                            />
                        </div>
                        <div className="group_photo">
                            <div className="learning_detail">
                                <input
                                    type="text"
                                    placeholder="New line"
                                    maxlength="80"
                                    onChange={e => setNewSlogan(e.target.value)}
                                />
                            </div>
                            <div className="start_button">
                                <button onClick={changeSlogan} >Add</button>
                            </div>
                        </div>
                    </div>
                </Container>
            )}
        <div className='RightSidebarGroup'>
            <div className={showTop ? 'rightSidebarGroup__headerShow':"rightSidebarGroup__header"}>
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push('/group')
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                    Involvement
                </div>
                <div></div>
            </div>
            <div className={showTop ? 'rightSidebarGroup__bodyTaskShow':"rightSidebarGroup__bodyTask"}>
                <div className={showTop?"rightSidebarGroup__bodyEnvolvement2Show":"rightSidebarGroup__bodyEnvolvement2"}>
                    <Button variant="outlined" onClick={()=>{
                        setShowPop(true);
                    }}>Change</Button>
                    {groupDetails?.groupSlogan}
                </div>
                <div className={showTop?"rightSidebarGroup__bodyEnvolvement1Show":"rightSidebarGroup__bodyEnvolvement1"}>
                    {groupMember && groupMember.map((data) => (
                        <div className="rightSidebarGroup__bodyEnvolvement1Div">
                            <EnvolveGraph data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default RightSidebarGroupEnvolvement


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