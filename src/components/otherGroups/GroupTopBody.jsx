import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

function GroupTopBody({ id }) {
  const [{ userInfo, user, groupsOtherDetails, groupDetails }, dispatch] = useStateValue();

  useEffect(() => {
    if (user?.uid && id) {
      db.collection('users').doc(user.uid).collection('Groups').doc(id)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_GROUP_DETAILS,
            groupDetails: snapshot.data(),
          })
        })
    }
  }, [user]);

  return (
        <>
      <div className="group__headBackgroundImg">
        <img src={groupsOtherDetails?.backgroundImage ? groupsOtherDetails?.backgroundImage : groupsOtherDetails?.DefaultbackgroundImage} alt="background image" />
      </div>
      <div className="group__headImg">
        <div className="group__headPro">
          <img src={groupsOtherDetails?.ProfileImage} alt="profile image" />
          </div>
          <div className="group__details">
            <div className="Group__Details__Name">
              {groupsOtherDetails?.GroupName}
            </div>
            <div className="Group__Details__Status">
              {groupsOtherDetails?.GroupStatus}
            </div>
          </div>
        </div>
      </>
      )
}

      export default GroupTopBody
