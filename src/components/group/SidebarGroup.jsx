import React, { useEffect, useState } from 'react';
import GroupMemberField from './GroupMemberField';
import './SidebarGroup.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Divider from '@mui/material/Divider';
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import db from '../../firebase';
import firebase from 'firebase';

function SidebarGroup() {
    const [{ userInfo, user, groupDetails, groupMember }, dispatch] = useStateValue();
    const [showAddMember, setShowAddMember] = useState(false);
    const [showInventor, setShowInventor] = useState(false);
    const [showMember, setShowMember] = useState(false);
    const [newmember, setNewmember] = useState('');
    // const [members,setMembers]=useState([]);

    var today = new Date();
    var date = today.toLocaleString();

    const AddMember = () => {
        if (newmember) {
            db.collection('users').where('email', '==', newmember)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty === true) {
                        alert('This email address is not exist in platform');
                    } else {
                        querySnapshot.forEach((doc) => {
                            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user?.email).doc(user.uid + 'groupmember').collection('GroupMember').add({
                                date: date,
                                name: doc.data()?.name,
                                email: newmember,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            }).then(() => {
                                db.collection('users').doc(doc.id).collection('Groups').add({
                                    date: date,
                                    name: doc.data()?.name,
                                    email: newmember,
                                    startedby: user?.email,
                                    GroupId: user?.uid,
                                    GroupName: groupDetails?.GroupName,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                })
                                setNewmember('');
                                setShowAddMember(false)
                            })
                        })
                    }
                })
        }
    }

    useEffect(() => {
        if (user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user?.email).doc(user?.uid + 'groupmember').collection('GroupMember')
                .onSnapshot((snapshot) => (
                    dispatch({
                        type: actionTypes.SET_GROUP_MEMBER,
                        groupMember: snapshot.docs.map((doc) => ({
                            data: doc.data(),
                            id: doc.id,
                        })),
                    })
                ))
        }
    }, [user])

    return (
        <>
            {showAddMember && (
                <Container>
                    <div className="addLearning">
                        <div className="add_learning_header">
                            <CloseIcon className="close_icon"
                                onClick={() => {
                                    setShowAddMember(false)
                                }}
                            />
                        </div>
                        <div className="group_photo">
                            <div className="learning_detail">
                                <input
                                    type="text"
                                    placeholder="Group Name"
                                    maxlength="70"
                                    onChange={e => setNewmember(e.target.value)}
                                />
                            </div>
                            <div className="start_button">
                                <button onClick={AddMember} >Add</button>
                            </div>
                        </div>
                    </div>
                </Container>
            )}
            <div className='SidebarGroup'>
                <div className="leftSidebarGroup__header">
                    {groupDetails?.GroupName} Family
                    <div className="leftSidebarGroup__headeRIcon">
                        <ArrowForwardRoundedIcon
                            onClick={() => {
                                dispatch({
                                    type: actionTypes.SET_SHOW_LEFTSIDEBARGROUP,
                                    showLeftSidebarGroup: false,
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="leftSidebarGroup__Admin"
                    onClick={() => {
                        setShowInventor(!showInventor)
                        setShowMember(false)
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>

                        Inventor
                        {
                            !showInventor ? <ArrowRightRoundedIcon /> : <ArrowDropDownRoundedIcon />
                        }
                    </div>
                    <div>
                    </div>
                </div>
                {showInventor && <div className="leftSidebarGroup__body" >
                    {/* <GroupMemberField inventor={"name"}/>  */}
                </div>}
                <div className="leftSidebarGroup__Admin"
                    onClick={() => {
                        setShowMember(!showMember)
                        setShowInventor(false)
                    }}>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        Member
                        {
                            !showMember ? <ArrowRightRoundedIcon /> : <ArrowDropDownRoundedIcon />
                        }
                    </div>
                    {user?.email == groupDetails?.startedby && <div onClick={() => {
                        setShowAddMember(true)
                    }}>
                        <AddRoundedIcon />
                    </div>}
                </div>
                {showMember && <div className="leftSidebarGroup__body">
                    {groupMember.map((member, serial) => (
                        <GroupMemberField member={member} serial={serial} />
                    ))}
                </div>}
            </div>
        </>
    )
}

export default SidebarGroup;

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
    align-item:center;
    flex-direction: column;
    width:100%;
    .group_photo_Image{
        display:flex;
        flex-direction: column;
        align-item:center !important;
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