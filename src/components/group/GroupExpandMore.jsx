import React, { useEffect, useState } from 'react';
import './Group.css'
import styled from "styled-components";
import './GroupExpandMore.css'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useStateValue } from '../../StateProvider';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { actionTypes } from '../../reducer';
import CloseIcon from "@mui/icons-material/Close";
import db from '../../firebase';
import firebase from 'firebase';
import GroupNameField from './GroupNameField';
import { useHistory } from 'react-router-dom';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { v4 as uuid } from "uuid";

function GroupExpandMore() {
  const history = useHistory();
  const [{ showExpandGroup, showgroupAdd, editGroup, user, userInfo, showTop, mygroupDetail }, dispatch] = useStateValue();
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_MY_GROUP_DETAILS,
            mygroupDetail: snapshot.data(),
          })
        })
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch({
        type: actionTypes.SET_LOADING,
        loading: true,
      })

      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_GROUP_DETAILS,
            groupDetails: snapshot.data(),
          })
          dispatch({
            type: actionTypes.SET_LOADING,
            loading: false,
          })
        })
      dispatch({
        type: actionTypes.SET_LOADING,
        loading: false,
      })
    }
  }, [user])

  const AddGroup = () => {
    if (user) {
      const id = uuid();
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details').set({
        GroupName: groupName ? groupName : 'Your Group',
        GroupStatus: "Our passion makes us happy which no one else can do.",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        startedby: user.email,
        totalmessage: 0,
        totalmessageAdmin: 0,
        ProfileImage: 'https://mcdn.wallpapersafari.com/medium/46/34/648IOD.jpg',
        backgroundImage: '',
        DefaultbackgroundImage: 'https://firebasestorage.googleapis.com/v0/b/find-passion.appspot.com/o/LearningImages%2F8b87d5d2-1ff3-4830-a62f-d30b5046a1d3?alt=media&token=d8a46f9c-6666-4466-bba8-beb20bf439e1',
        id: id,
        name: userInfo?.name,
        groupSlogan: 'Improve your performance by discussing the skill you have common with others.',
      }).then(() => {
        setGroupName('')
        dispatch({
          type: actionTypes.SET_SHOW_GROUP_ADD,
          showgroupAdd: false,
        })
      }).catch(err => {
        console.log(err.message);
      })
    } else {
      alert('Something went wrong');
    }
  }

  useEffect(() => {
    if (user?.uid) {
      db.collection('users').doc(user.uid).collection('Groups')
        .onSnapshot((snapshot) => (
          setGroups(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            })))
        ));
    }
  }, [user])

  return (
    <>
      {showgroupAdd && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon"
                onClick={() => {
                  dispatch({
                    type: actionTypes.SET_SHOW_GROUP_ADD,
                    showgroupAdd: false,
                  })
                }}
              />
            </div>
            <div className="group_photo">
              <div className="learning_detail">
                <input
                  type="text"
                  placeholder="Group Name"
                  maxlength="70"
                  onChange={e => setGroupName(e.target.value)}
                />
              </div>
              <div className="start_button">
                <button onClick={AddGroup} title='Add group'>Add</button>
              </div>
            </div>
          </div>
        </Container>
      )}

      <div className="groupHead__More">

        <button onClick={() => {
          dispatch({
            type: actionTypes.SET_SHOW_TOP,
            showTop: false,
          })
          dispatch({
            type: actionTypes.SET_EDIT_GROUP,
            editGroup: false,
          })
          dispatch({
            type: actionTypes.SET_SHOW_EXPANDGROUP,
            showExpandGroup: true,
          })
        }} className={!showTop && !editGroup && showExpandGroup ?'Button__groupExpand_Active':'Button__groupExpand'} title="More option">
          More
        </button>

        {mygroupDetail?.GroupName &&
          <>
            <button onClick={() => {
               dispatch({
                type: actionTypes.SET_SHOW_TOP,
                showTop: !showTop,
              })
              dispatch({
                type: actionTypes.SET_EDIT_GROUP,
                editGroup: !editGroup,
              })
              dispatch({
                type: actionTypes.SET_SHOW_EXPANDGROUP,
                showExpandGroup: false,
              })
              console.log("Edit Group is ", editGroup)
            }} className={showTop && editGroup && !showExpandGroup ?'Button__groupExpand_Active':'Button__groupExpand' } title='Edit group'>
              Edit
            </button>

            <button onClick={() => {
              dispatch({
                type: actionTypes.SET_SHOW_TOP,
                showTop: !showTop,
              })
              dispatch({
                type: actionTypes.SET_EDIT_GROUP,
                editGroup: false,
              })
              dispatch({
                type: actionTypes.SET_SHOW_EXPANDGROUP,
                showExpandGroup: false,
              })
            }} className={showTop && !showExpandGroup ?'Button__groupExpand_Active':'Button__groupExpand' } title='Hide group'>
              {showTop?"Hide":"Show"}
            </button>
          </>
        }

      </div>

      {showExpandGroup &&
        <div className="showExpandGroup">
          {!mygroupDetail?.GroupName ?
            <div className="showExpandGroup__AddGroup" onClick={() => {
              dispatch({
                type: actionTypes.SET_SHOW_GROUP_ADD,
                showgroupAdd: true,
              })
            }}  title="Add your group">
              <AddCircleRoundedIcon style={{ color: '#0173ab', paddingRight: "12px" }} title='Add your group' />
              Start Group
            </div> :
            <div className="showExpandGroup__AddGroup" onClick={() => {
              history.push('/group')
            }} title="View your group">
              <VisibilityRoundedIcon style={{ color: '#0173ab', paddingRight: "12px" }} />
              Your Group
            </div>
          }
         {groups && groups.length!=0 && <div className="showExpandGroup__OtherGroup">
            <div className="showExpandGroup__OtherGroup__Head">
              Groups
            </div>
            {groups && groups.map((group) => (
              <div title='Other group you have added'>
                <GroupNameField group={group} key={group?.id} />
              </div>
            ))}
          </div>}
        </div>
      }
    </>
  )
}

export default GroupExpandMore

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