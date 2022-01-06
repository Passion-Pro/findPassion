import React from 'react'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { useHistory } from 'react-router-dom';

function GroupNameField({group}) {
    const history=useHistory();
    return (
        <div className="showExpandGroup__AddGroup" onClick={()=>{
           history.push(`/groupother/${group.id}`)
        }}>
            <GroupsRoundedIcon style={{
                color: '#0173ab',
                padding: '4px', marginRight: "12px", borderRadius: '50%', border: '1px solid lightgray', height: "22px", width: '22px'
            }} />
            {group.data.GroupName}
        </div>
    )
}

export default GroupNameField
