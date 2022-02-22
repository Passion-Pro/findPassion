import React, { useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import GroupTopBody from './GroupTopBody';
import SidebarGroup from './SidebarGroup';
import RightSidebarGroupTaskList from './RightSidebarGroupTaskList'
import GroupExpandMore from './GroupExpandMore';
import { actionTypes } from '../../reducer';

function GroupTasklist() {
  const [{ showTop,showLeftSidebarGroup},dispatch] = useStateValue();
 
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/grouptasklist",
    });
  }, []);

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
              <RightSidebarGroupTaskList />
            </div>}
          </div>
          <div className="group__lowerForMobile">
            {showLeftSidebarGroup ? <div className="group__lower__leftSidebarForMobile">
              <SidebarGroup />
            </div> : <div className="group__lower__rightSidebarForMobile">
              <RightSidebarGroupTaskList />
            </div>}
          </div>
        </div>
        <GroupExpandMore />
      </div>
    </>
  )
}

export default GroupTasklist;
