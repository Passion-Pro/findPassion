import React, { useState } from 'react';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import { useStateValue } from '../../StateProvider';

function GroupMemberField({ member,sho ,serial }) {
  const [{ user, groupDetails,groupsOtherDetails, groupMemberDetails },dispatch] = useStateValue();
  
  return (
    <>
      <div className='GroupMemberField'>
        <div className="groupmember__name">
          {member?.data?.name && member?.data?.name}
          {sho==0 && groupsOtherDetails?.name}
          <div>
          { sho==0 && groupDetails &&
          <div className='groupDetailStartedDate'>
            {"Made group on "+new Date(groupDetails?.timestamp.toDate()).toUTCString()}
          </div>
            }
          </div>
        </div> 
      </div>
      <Divider />
    </>
  )
}

export default GroupMemberField;