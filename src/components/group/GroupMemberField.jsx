import React from 'react';
import './GroupMemberField.css';
import Divider from '@mui/material/Divider';

function GroupMemberField({name,serial}) {
    return (
        <>
        <div className='GroupMemberField'>
            <div className="groupmember__name">
            {name.name}
            </div>
            <div className="groupmember__icons">
             <img src="https://www.vhv.rs/dpng/d/78-784488_chat-icon-png-transparent-png.png" alt="" />
            </div>
        </div>
            <Divider/>
            </>
    )
}

export default GroupMemberField;
