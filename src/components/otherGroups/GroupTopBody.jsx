import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

function GroupTopBody({id}) {
    const [{ userInfo, user ,showLeftSidebarGroup,groupDetails},dispatch] = useStateValue();
    const [groupInfo,setGroupInfo]=useState([]);

    useEffect(()=>{
      if(user?.uid && id){ 
        db.collection('users').doc(user.uid).collection('Groups').doc(id)
        .onSnapshot((snapshot) => {
            dispatch({
                type: actionTypes.SET_GROUP_DETAILS,
                groupDetails:snapshot.data(),
              })
        })}
    },[user])

    const backgroundImage="https://cdn.w600.comps.canstockphoto.com/find-your-passion-in-splashs-background-stock-illustrations_csp78297071.jpg";
    const image='https://mcdn.wallpapersafari.com/medium/46/34/648IOD.jpg';

    return (
        <>
        <div className="group__headBackgroundImg">
        <img src={backgroundImage} alt="background image" />
      </div>
      <div className="group__headImg">
        <img src={image} alt="profile image"/>
      <div className="group__details">
       <div className="Group__Details__Name">
         {groupDetails?.GroupName}
       </div>
       <div className="Group__Details__Status">
       {groupDetails?.GroupStatus}
       </div>
      </div>
      </div>
      </>
    )
}

export default GroupTopBody
