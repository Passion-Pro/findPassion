import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/group",
    });
  }, []);

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
            <div className='start_group_box'>
              <div style = {{
                  fontSize : '17px',
                  fontWeight:'bold',
                  padding: '4px',
                  margin: 0,
                }}>Find the perfect team member with the desired skills through our community site</div>
               <p
                style = {{
                  fontSize : '17px',
                  padding: '4px',
                  margin: 0,
                }}
               >Start your group here and enjoy the benifits of</p>
               <p
                style = {{
                  marginLeft : '3px',
                  fontStyle : 'italic'
                }}
               > A goal giving system to your teammates</p>
               <p
                style = {{
                  marginTop : '5px',
                  marginLeft : '3px',
                  fontStyle : 'italic'
                }}
               >Checking involvement of every team member in the group</p>
               <div style = {{
                 display : 'flex',
                 justifyContent : 'flex-end'
               }}>
               <Button color="secondary" onClick={() => {
              dispatch({
                type: actionTypes.SET_SHOW_GROUP_ADD,
                showgroupAdd: true,
              })
            }}>Add Team</Button>

               </div>
            </div>
             </div>
      }
      <GroupExpandMore />
    </div>
  )
}

export default Group;

