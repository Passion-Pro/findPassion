import React, { useEffect, useState } from 'react';
import './Group.css';
import './GroupChat.css';
import Header from '../header/Header';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useStateValue } from '../../StateProvider';
import RightSidebarGroupChat from './RightSidebarGroupChat';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import { actionTypes } from '../../reducer';

function GroupChat() {

  const [{ userInfo, groupMember, showLeftSidebarGroup, groupDetails, showTop }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/groupchat",
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
            <RightSidebarGroupChat />
          </div>}
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup ? <div className="group__lower__leftSidebarForMobile">
            <SidebarGroup />
          </div> : <div className="group__lower__rightSidebarForMobile">
            <RightSidebarGroupChat />
          </div>}
        </div>
      </div>
      <GroupExpandMore />
    </div>
  )
}

export default GroupChat;

