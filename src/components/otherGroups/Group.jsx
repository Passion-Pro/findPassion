import React, { useEffect, useState } from 'react';
import './Group.css';
import Header from '../header/Header';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { actionTypes } from '../../reducer';

function Group() {
  const [{ showLeftSidebarGroup,groupDetails},dispatch] = useStateValue();
  const [showLeftdiv,setShowLeftdiv]=useState(true);

  const {id} = useParams();

  useEffect(() => {
    if (groupDetails) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').where('email','==',groupDetails?.email)
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          dispatch({
            type: actionTypes.SET_GROUP_MEMBERDETAILS,
            groupMemberDetails: [doc.data(),doc.id],
          })
        })
      })
    }
  }, [groupDetails]);

  return (
    <div className='group'>
      <Header />
      <div className="group__body">
      <GroupTopBody id = {id}/>
        <div className="group__lower">
          {<div className="group__lower__leftSidebar">
          <SidebarGroup/>
          </div>}
          {<div className="group__lower__rightSidebar">
          <RightSidebarGroup/>
          </div>}
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup?<div className="group__lower__leftSidebarForMobile">
          <SidebarGroup/>
          </div>:<div className="group__lower__rightSidebarForMobile">
          <RightSidebarGroup/>
          </div>}
        </div>
      </div>
     <GroupExpandMore/>
    </div>
  )
}

export default Group;

