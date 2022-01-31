import React from 'react';
import './Group.css';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import { CircularProgress } from '@mui/material';

function Group() {
  const [{ loading, showLeftSidebarGroup, groupDetails, showTop }, dispatch] = useStateValue();

  return (
    <div className='group'>
      {
      groupDetails?.GroupName && showTop &&
        <GroupTopBody />
      }
      {loading ?
        <div style={{ display: 'flex', width: "100vw", height: "80vh", alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </div> :
        <div className={showTop ? "group__body" : 'group__bodyTwo'}> {groupDetails?.GroupName ? <>
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
        </div>}
      <GroupExpandMore />
    </div>
  )
}

export default Group;

