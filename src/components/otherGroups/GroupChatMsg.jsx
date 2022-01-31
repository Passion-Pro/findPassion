import React, { useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import firebase from 'firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStateValue } from '../../StateProvider';
import db from '../../firebase';

function GroupChatMsg({ data }) {
    const [{user,groupDetails}] = useStateValue();

    const [popupshowImageFUll, setPopupshowImageFUll] = useState(false);
    const [popupshowPdfFUll, setPopupshowPdfFUll] = useState(false);
    // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const deleteMessage = () => {
       if(groupDetails){
           db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupchat').collection('GroupChat').doc(data?.id).delete().then(()=>{
               console.log("huhuhuhh!");
           })
       }
    }
console.log("first",data?.id);
    return (
        <div className={data?.data?.sendby === user?.email ? "chatTeacher__message":'chatTeacher__messageByOther'}>
            <div className= "chatTeacher__message__my">
                <div style={{ display: "flex", fontSize: 'xx-small', fontWeight: 'bold', alignItems: "center",height:"20px"}}>
                    {data.data?.name && data.data?.name}
                    {data?.data?.sendby === user?.email && <div className="deleteIcon">
                        < DeleteIcon style={{ fontSize: 15 }} onClick={deleteMessage}/></div>}
                </div>
                <div className={data?.data?.sendby == user?.email ? "chatTeacher__message_divmy":"chatTeacher__message_div"}>
                    <div className='GroupChatMsg__Message'>
                        {data.data?.message}
                    </div>
                    <div className="dateChat">{data.data?.date}</div>
                </div>
            </div>
        </div>
    )
}

export default GroupChatMsg;
