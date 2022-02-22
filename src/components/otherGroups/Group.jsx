import React, { useEffect, useState } from 'react';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import db from '../../firebase';
import { actionTypes } from '../../reducer';

function Group() {
  const [{ showLeftSidebarGroup, showTop, groupDetails }, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/groupother",
    });
  }, []);

  useEffect(() => {
    if (groupDetails?.email){
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').where('email', '==', groupDetails?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            dispatch({
              type: actionTypes.SET_GROUP_MEMBERDETAILS,
              groupMemberDetails: [doc.data(), doc.id],
            })
          })
        })
    }
  }, [groupDetails?.email]);

  return (
    <div className='group'>
      {showTop &&
        <GroupTopBody />
      }
      <div className={showTop ? "group__body" : 'group__bodyTwo'}>
        <div className="group__lower">
          {<div className="group__lower__leftSidebar">
            <SidebarGroup />
          </div>}
          {<div className="group__lower__rightSidebar">
            <RightSidebarGroup />
          </div>}
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup ? <div className="group__lower__leftSidebarForMobile">
            <SidebarGroup />
          </div> : <div className="group__lower__rightSidebarForMobile">
            <RightSidebarGroup />
          </div>}
        </div>
      </div>
      <GroupExpandMore />
    </div>
  )
}

export default Group;

