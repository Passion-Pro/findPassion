import React, { useEffect, useState } from 'react';
import './Group.css';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { actionTypes } from '../../reducer';
import db from '../../firebase';

function Group() {
  const [{  user, showLeftSidebarGroup, groupDetails, showTop }, dispatch] = useStateValue();
  const [showLeftdiv, setShowLeftdiv] = useState(true);

  console.log(groupDetails)

  useEffect(() => {
    if (user) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_GROUP_DETAILS,
            groupDetails: snapshot.data(),
          })
        })
    }
  }, [user])
console.log(showTop)
  return (
    <div className='group'>
      {groupDetails?.GroupName && showTop &&
        <GroupTopBody />
      }
      <div className={showTop ? "group__body" : 'group__bodyTwo'}>
        {groupDetails?.GroupName ? <>
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
        </> : "You have not added any group"}
      </div>
      <GroupExpandMore />
    </div>
  )
}

export default Group;

