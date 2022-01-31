import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import GroupExpandMore from './GroupExpandMore';
import GroupTopBody from './GroupTopBody';
import ShowAllTask from './ShowAllTask';
import SidebarGroup from './SidebarGroup';

function ShowTask() {
    const [{ user, showTop,showLeftSidebarGroup }, dispatch] = useStateValue();
    const history=useHistory();
    return (
        <>
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
            <ShowAllTask />
          </div>}
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup ? <div className="group__lower__leftSidebarForMobile">
            <SidebarGroup />
          </div> : <div className="group__lower__rightSidebarForMobile">
            <ShowAllTask />
          </div>}
        </div>
      </div>
      <GroupExpandMore />
    </div>
        </>
    )
}

export default ShowTask;
