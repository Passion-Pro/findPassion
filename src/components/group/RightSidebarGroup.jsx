import React from 'react';
import './RightSidebarGroup.css';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

function RightSidebarGroup() {
    return (
        <div className='RightSidebarGroup'>
            <div  className="rightSidebarGroup__header">
                <div className="rightSidebarGroup__headName">
                    Passion Chat
                </div>
              <div className="rightSidebarGroup__headMore">
                  <MoreVertRoundedIcon/>
              </div>
            </div>
            <div className="rightSidebarGroup__body">
              <div className="group__Chat">
                 Your Task
              </div>
              <div className="group__Chat">
                 Group Chat
              </div>
              <div className="group__Chat">
                 Group More 
              </div>
            </div>
        </div>
    )
}

export default RightSidebarGroup
