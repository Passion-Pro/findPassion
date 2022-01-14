import React, { useState } from 'react';
import './Group.css';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';

function Group() {
  const [{ userInfo, user ,showLeftSidebarGroup,groupDetails},dispatch] = useStateValue();
  const [showLeftdiv,setShowLeftdiv]=useState(true);
  const backgroundImage="https://cdn.w600.comps.canstockphoto.com/find-your-passion-in-splashs-background-stock-illustrations_csp78297071.jpg";
  const image='https://mcdn.wallpapersafari.com/medium/46/34/648IOD.jpg';

  return (
    <div className='group'> 
      <div className="group__body">
      <GroupTopBody/>
      {groupDetails?.GroupName ? <>
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
        </>:"You have not added any group"}
      </div>
     <GroupExpandMore/>
    </div>
  )
}

export default Group;

