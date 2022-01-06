import React, { useState } from 'react';
import './Group.css';
import Header from '../header/Header';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useStateValue } from '../../StateProvider';
import RightSidebarGroupTask from './RightSidebarGroupTask';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';

function GroupTask() {
  const [{ userInfo, user ,showLeftSidebarGroup},dispatch] = useStateValue();
  const [showLeftdiv,setShowLeftdiv]=useState(true);
  const backgroundImage="https://cdn.w600.comps.canstockphoto.com/find-your-passion-in-splashs-background-stock-illustrations_csp78297071.jpg";
  const image='https://mcdn.wallpapersafari.com/medium/46/34/648IOD.jpg';

  return (
    <div className='group'>
      <Header />
      <div className="group__body">
         <GroupTopBody/>
        <div className="group__lower">
          {<div className="group__lower__leftSidebar">
          <SidebarGroup/>
          </div>}
          {<div className="group__lower__rightSidebar">
          <RightSidebarGroupTask/>
          </div>}
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup?<div className="group__lower__leftSidebarForMobile">
          <SidebarGroup/>
          </div>:<div className="group__lower__rightSidebarForMobile">
          <RightSidebarGroupTask/>
          </div>}
        </div>
      </div>
      <GroupExpandMore/>
    </div>
  )
}

export default GroupTask;

