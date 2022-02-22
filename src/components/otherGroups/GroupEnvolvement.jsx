import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useStateValue } from '../../StateProvider'; 
import GroupExpandMore from './GroupExpandMore';
import RightSidebarGroupEnvolvement from './RightSidebarGroupEnvolvement';
import GroupTopBody from './GroupTopBody';
import { actionTypes } from '../../reducer';

function GroupEnvolvement() {
  const [{ userInfo, user, showTop, showLeftSidebarGroup }, dispatch] = useStateValue();
  const [showLeftdiv, setShowLeftdiv] = useState(true);
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/groupevolvementother",
    });
  }, []);
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
            <RightSidebarGroupEnvolvement />
          </div>}
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup ? <div className="group__lower__leftSidebarForMobile">
            <SidebarGroup />
          </div> : <div className="group__lower__rightSidebarForMobile">
            <RightSidebarGroupEnvolvement />
          </div>}
        </div>
      </div>
      <GroupExpandMore />
    </div>
  )
}

export default GroupEnvolvement
