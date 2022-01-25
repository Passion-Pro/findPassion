import React, { useState } from 'react';
import './GroupMemberField.css';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import CloseIcon from "@mui/icons-material/Close";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

function GroupMemberField({ member, serial }) {
  const [{ user,groupDetails }] = useStateValue();
  const [showAddTask, setshowAddTask] = useState(false);
  const [showRemove, setshowRemove] = useState(false);

  const [task, settask] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  var today = new Date();
  var date = today.toLocaleString();
 console.log('groupDetails',groupDetails?.startedby)
  const AddTask = () => {
    if (user) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(member.id).update({
        task: task,
        date: date,
        givenBy: user?.email,
        Duedate: null,
        status: 'pending'
      }).then(() => {
        setshowAddTask(false);
      })
    }
  }

  const removeMember = () => {
    if (user && confirmEmail==member?.data?.email && groupDetails) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(member.id).delete().then(() => {
        db.collection('users').where('email', '==', confirmEmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection('users').doc(doc.id).collection('Groups').doc(doc?.id +groupDetails?.startedby).delete().then(()=>{
                alert('Wooooo');
              })
            })
          })
        setshowAddTask(false);
        alert('User deleted successfully!')
      })
    }
  }
  return (
    <>
      {showAddTask && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon"
                onClick={() => {
                  setshowAddTask(false)
                }}
              />
            </div>
            <div className="group_photo">
              <div className="learning_detail">
                <input
                  type="text"
                  placeholder="Type a task"
                  maxlength="70"
                  onChange={e => settask(e.target.value)}
                />
              </div>
              <div className="start_button">
                <button onClick={AddTask} >Add</button>
              </div>
            </div>
          </div>
        </Container>
      )}

      {showRemove && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon"
                onClick={() => {
                  setshowRemove(false)
                }}
              />
            </div>
            <div className="group_photo">
              <div className="learning_detail">
                <input
                  type="text"
                  placeholder="Confirm Email"
                  maxlength="70"
                  onChange={e => confirmEmail(e.target.value)}
                />
              </div>
              <div className="start_button">
                <button onClick={removeMember} >Remove</button>
              </div>
            </div>
          </div>
        </Container>
      )}
      <div className='GroupMemberField'>
        <div className="groupmember__name">
          {member?.data?.name}
        </div>
        <div className='groupField__Icon'>
          <div className="groupmember__icons" onClick={() => {
            setshowAddTask(true)
          }}>
            <AddTaskRoundedIcon />
          </div>
          <div className="groupmember__icons" onClick={() => {
            setshowRemove(true)
          }}>
            <PersonRemoveAlt1RoundedIcon />
          </div>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default GroupMemberField;


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