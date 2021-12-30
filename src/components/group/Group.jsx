import React, { useState } from 'react';
import './Group.css';
import Header from '../header/Header';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroup from './RightSidebarGroup';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

function Group() {

  const backgroundImage="https://cdn.w600.comps.canstockphoto.com/find-your-passion-in-splashs-background-stock-illustrations_csp78297071.jpg";
  const image='https://mcdn.wallpapersafari.com/medium/46/34/648IOD.jpg';

  return (
    <div className='group'>
      <Header />
      <div className="group__body">
        <div className="group__headBackgroundImg">
          <img src={backgroundImage} alt="background image" />
        </div>
        <div className="group__headImg">
          <img src={image} alt="profile image" />
        <div className="group__details">
         <div className="Group__Details__Name">
           Passion
         </div>
         <div className="Group__Details__Status">
           Our passion is make us happy which no one else can do.
         </div>
        </div>
        </div>
        <div className="group__lower">
          {<div className="group__lower__leftSidebar">
          <SidebarGroup/>
          </div>}
          {<div className="group__lower__rightSidebar">
          <RightSidebarGroup/>
          </div>}
        </div>
      </div>
      <div className="groupHead__More">
      <ExpandMoreRoundedIcon className="groupHead__More__Icon"/>
      </div>
    </div>
  )
}

export default Group;

