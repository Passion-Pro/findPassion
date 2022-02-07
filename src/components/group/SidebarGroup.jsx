import React, { useEffect, useState } from 'react';
import GroupMemberField from './GroupMemberField';
import './SidebarGroup.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import db from '../../firebase';
import firebase from 'firebase';

function SidebarGroup() {
    const [{ showTop, userInfo, user, groupDetails, groupMember }, dispatch] = useStateValue();
    const [showAddMember, setShowAddMember] = useState(false);
    const [showInventor, setShowInventor] = useState(false);
    const [showMember, setShowMember] = useState(false);
    const [newmember, setNewmember] = useState('');

    var today = new Date();
    var date = today.toLocaleString();

const AddMember = () => {
        if (newmember) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user?.email).doc(user?.uid + 'groupmember').collection('GroupMember').where('email', '==', newmember)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty === true) {
                        db.collection('users').where('email', '==', newmember)
                            .get()
                            .then((querySnapshot) => {
                                if (querySnapshot.empty === true) {
                                    alert('This email address is not exist in platform');
                                    setNewmember('');
                                    setShowAddMember(false);
                                } else {
                                    querySnapshot.forEach((doc) => {
                                        db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user?.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(user.uid + newmember).set({
                                            date: date,
                                            name: doc.data()?.name,
                                            profilePhotoUrl: doc.data()?.profilePhotoUrl,
                                            passion: doc.data()?.passion,
                                            email: newmember,
                                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                            totalmessage: 0,
                                            totalTask: 0,
                                        }).then(() => {
                                            db.collection('users').doc(doc.id).collection('Groups').doc(doc?.id + user?.email).set({
                                                date: date,
                                                name: doc.data()?.name,
                                                email: newmember,
                                                startedby: user?.email,
                                                GroupId: user?.uid,
                                                GroupName: groupDetails?.GroupName,
                                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                backgroundImage: groupDetails?.backgroundImage,
                                                ProfileImage: groupDetails?.ProfileImage,
                                                DefaultbackgroundImage: groupDetails?.DefaultbackgroundImage,

                                            })
                                            setNewmember('');
                                            setShowAddMember(false);
                                        })
                                    })
                                }
                            })
                    } else {
                        setNewmember('');
                        setShowAddMember(false);
                        alert('Already member');
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
                                    placeholder="Email of the new member"
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
                <div className={showTop ? 'leftSidebarGroup__headerShow' : "leftSidebarGroup__header"}>
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
                <div style={{ display: 'flex', flexDirection: 'column', height: "85%", marginTop: "5%" }}>
                    <div className="leftSidebarGroup__Admin"
                        onClick={() => {
                            setShowInventor(!showInventor)
                            setShowMember(false)
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            Started by
                            {
                                !showInventor ? <ArrowRightRoundedIcon /> : <ArrowDropDownRoundedIcon />
                            }
                        </div>
                        <div>
                        </div>
                    </div>
                    {showInventor && <div className="leftSidebarGroup__body">
                        <GroupMemberField userInfo={userInfo} serial={0} sho={0} />
                    </div>}
                    {showInventor && <div className="leftSidebarGroup__body" >
                    </div>}
                    <div className="leftSidebarGroup__Admin"
                        onClick={() => {
                            setShowMember(!showMember)
                            setShowInventor(false)
                        }}>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            Member
                            {
                                !showMember ? <div title="Show member"><ArrowRightRoundedIcon/></div> : <div title="Hide member"><ArrowDropDownRoundedIcon/></div>
                            }
                        </div>
                        {user?.email == groupDetails?.startedby && <div onClick={() => {
                            setShowAddMember(true)
                        }}
                        title='Add member'>
                            <AddRoundedIcon />
                        </div>}
                    </div>
                    {showMember && <div className="leftSidebarGroup__body">
                        {groupMember.map((member, serial) => (
                            <GroupMemberField member={member} serial={serial} />
                        ))}
                    </div>}
                </div>
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