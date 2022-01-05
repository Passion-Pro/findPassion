import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

function GroupTopBody() {
    const [{ userInfo, user ,showLeftSidebarGroup,groupDetails},dispatch] = useStateValue();
    const [groupInfo,setGroupInfo]=useState([]);

    useEffect(()=>{
      if(user){
        db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid+'Details')
        .onSnapshot((snapshot) => {
            // console.log(snapshot.data())
            dispatch({
                type: actionTypes.SET_GROUP_DETAILS,
                groupDetails:snapshot.data(),
              })
        })
        // .then((querySnapshot) => {
        //     console.log(querySnapshot.data())
        //     // setGroupInfo
        //     // querySnapshot.forEach((doc) => {
        //     //     console.log(doc.data())
        //     //   })
            // dispatch({
            //     type: actionTypes.SET_SHOW_EXPANDGROUP,
            //     showExpandGroup: ,
            //   })
        // })
      }
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
