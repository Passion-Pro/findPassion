import React, { useEffect, useState } from 'react';
import './Group.css';
import Header from '../header/Header';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useStateValue } from '../../StateProvider';
import RightSidebarGroupTask from './RightSidebarGroupTask';
import GroupExpandMore from './GroupExpandMore';
import RightSidebarGroupEnvolvement from './RightSidebarGroupEnvolvement';
import GroupTopBody from './GroupTopBody';
import { actionTypes } from '../../reducer';

function GroupEnvolvement() {
  const [{ userInfo,groupDetails, user, showLeftSidebarGroup, showTop }, dispatch] = useStateValue();
  const [showLeftdiv, setShowLeftdiv] = useState(true);
  const backgroundImage = "https://cdn.w600.comps.canstockphoto.com/find-your-passion-in-splashs-background-stock-illustrations_csp78297071.jpg";
  const image = 'https://mcdn.wallpapersafari.com/medium/46/34/648IOD.jpg';

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/groupevolvement",
    });
  }, []);

  return (
    <div className='group'>
      {groupDetails?.GroupName && showTop &&
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
