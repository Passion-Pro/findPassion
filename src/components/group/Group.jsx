import React from 'react';
import './Group.css';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { actionTypes } from '../../reducer';

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
        groupDetails?.GroupName ? <div className={showTop ? "group__body" : 'group__bodyTwo'}> <>
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
        </> </div> :
          <div style={{ display: 'flex', width: "100vw", height: "80vh", alignItems: 'center', justifyContent: 'center' }}>
            You haven't started any group. <Button color="secondary" onClick={() => {
              dispatch({
                type: actionTypes.SET_SHOW_GROUP_ADD,
                showgroupAdd: true,
              })
            }}>Start now</Button> </div>
      }
      <GroupExpandMore />
    </div>
  )
}

export default Group;

