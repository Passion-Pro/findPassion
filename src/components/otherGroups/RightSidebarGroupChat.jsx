import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import db from '../../firebase';
import firebase from 'firebase';
import GroupChatMsg from './GroupChatMsg';
import { useParams } from 'react-router-dom';

function RightSidebarGroupChat() {

    const history = useHistory();
    const [{ userInfo, user,showTop, groupDetails, groupDetailsmain,groupMemberDetails }] = useStateValue();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const { id } = useParams();

    var today = new Date();
    var date = today.toLocaleString();

    const sendMessage = () => {
        if (input && groupDetails) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupchat').collection('GroupChat').add({
                date: date,
                message: input,
                name: userInfo?.name,
                sendby: user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(() => {
                db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'Details').update({
                    totalmessage: groupDetailsmain?.totalmessage + 1,
                })
                db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').doc(groupDetails?.GroupId + user?.email).update({
                    totalmessage: groupMemberDetails?.totalmessage + 1,
                })

                setInput('')
            })
        } else {
            alert('Something went wrong')
        }
    }
    console.log(user, groupDetails)

    useEffect(() => {
        if (groupDetails) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails.GroupId + 'groupchat').collection('GroupChat')
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            data: doc.data(),
                            id: doc.id,
                        }))
                    );
                });
        }
    }, [groupDetails]);

    return (
        <div className='RightSidebarGroup'>
            <div className={showTop ? 'rightSidebarGroup__headerShow' : "rightSidebarGroup__header"}>
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push(`/groupother/${id}`)
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                    {groupDetails?.GroupName} Chat
                </div>
                <div></div>
            </div>
            <div className={showTop ? 'rightSidebarGroup__bodyTaskShow':"rightSidebarGroup__bodyTask"}>
                <div className={showTop ? 'GroupChat__bodyShow':"GroupChat__body"}>
                    {messages.map((data) => (
                        <GroupChatMsg data={data} />
                    ))}
                </div>
                <div className={showTop ?'GroupChat__FooterShow':"GroupChat__Footer"}>
                    <textarea type="text" placeholder='Type a message...' value={input} onChange={e => setInput(e.target.value)} />
                    <SendRoundedIcon style={{ color: '#208bc0', border: '1px solid rgb(20, 218, 226)', padding: '0.6%', borderRadius: "50%", backgroundColor: "rgb(209, 218, 226)" }} onClick={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default RightSidebarGroupChat
