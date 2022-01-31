import React, { useState } from 'react';
import './GroupMemberField.css';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import CloseIcon from "@mui/icons-material/Close";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import firebase from 'firebase';

function GroupMemberField({ member, userInfo }) {
  const [{ user, groupDetails }] = useStateValue();
  const [showAddTask, setshowAddTask] = useState(false);
  const [showRemove, setshowRemove] = useState(false);
  const [dueDate, setDueDate] = useState(null)
  const [task, settask] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  var today = new Date();
  var date = today.toLocaleString();

  const AddTask = () => {
    if (user) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(member.id).update({
        task: task,
        date: date,
        givenBy: user?.email,
        Duedate: dueDate,
        status: 'pending',
        statusDateDoing: null,
        statusDateDone: null,
        totalTask: member?.data?.totalTask + 1,
      }).then(() => {
        db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(member.id).collection('Tasks').add({
          task: task,
          date: date,
          givenBy: user?.email,
          Duedate: dueDate,
          status: 'pending',
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          totalTask: member?.data?.totalTask + 1,
        })
        setshowAddTask(false);
      })
    }
  }

  const removeMember = () => {
    if (user && confirmEmail == member?.data?.email && groupDetails) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(member.id).delete().then(() => {
        db.collection('users').where('email', '==', confirmEmail)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection('users').doc(doc.id).collection('Groups').doc(doc?.id + groupDetails?.startedby).delete().then(() => {
                alert('User deleted successfully!')
                setshowAddTask(false);
              })
            })
          })
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
                  onChange={e => settask(e.target.value)}
                />
              </div>
              <div className="learning_detail">
                <div style={{ display: 'flex', flexDirection: "column", width: '150px' }}>
                  {/* <div> */}
                  Set due date
                  {/* </div> */}
                  <div style={{ display: "flex", fontSize: 'xx-small', color: '#e01515', fontWeight: "600" }}>
                    If you not set due date {member?.data?.name} can set the due date.
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <input
                    type="date"
                    onChange={e => setDueDate(e.target.value)}
                  />
                </div>
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
                  onChange={e => setConfirmEmail(e.target.value)}
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
        <div className="groupmember__name" style={{ flexDirection: 'column' }}>
          {member?.data?.name && <div>
            {member?.data?.name}
          </div>}
          {userInfo?.email && <div>
            {userInfo?.name}
          </div>}
          {!member?.data?.name && groupDetails && <div className="groupDetailStartedDate">
            {"Made group on " + new Date(groupDetails?.timestamp.toDate()).toUTCString()}
          </div>
          }
        </div>
        {!userInfo?.email && <div className='groupField__Icon'>
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
        </div>}
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
    }

    .learning_detail {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-bottom:8px;
      align-items: center;

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