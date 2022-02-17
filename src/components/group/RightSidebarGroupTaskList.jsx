import React from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router-dom';
import RightSidebarGroupTaskListEach from './RightSidebarGroupTaskListEach';

function RightSidebarGroupTaskList() {
  const history = useHistory();
  const [{ userInfo, groupMember, groupDetails, showTop }, dispatch] = useStateValue();
  return (
    <>
      <div className="RightSidebarGroup">
        <div className={showTop ? 'rightSidebarGroup__headerShow' : "rightSidebarGroup__header"}>
          <div className="rightSidebarGroup__headMoreTask">
            <ArrowBackRoundedIcon onClick={() => {
              history.push('/group')
            }} />
          </div>
          <div className="rightSidebarGroup__headName">
            {groupDetails?.GroupName} Tasklist
          </div>
          <div></div>
        </div>
        <div className={showTop ? 'rightSidebarGroup__bodyTaskShow' : "rightSidebarGroup__bodyTask"}>
           <div className="rightsidebarGroupTaskList">
             {groupMember && groupMember.map((data)=>(
              <RightSidebarGroupTaskListEach data={data}/>
             ))}
           </div>
        </div>
      </div>
    </>
  )
}

export default RightSidebarGroupTaskList;
