import { Avatar } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Stories.css';

function Stories({ data }) {
    const history=useHistory(); 
    return (
        <div className='Stories' onClick={()=>history.push(`/viewstory/${data?.id}`)}>
            <div className='CreateProfile'>
                {/* <img src={data?.data?.profilePhotoUrl} style={{ fontSize: 40, color: "lightgray" }} /> */}
                <Avatar src={data?.data?.profilePhotoUrl} style={{display: "flex",height: 60,width: 60,borderRadius: '50%'}}/>
            </div>
            <div className='AddStory__text'>
                {data?.data?.username && data?.data?.username.length > 8 ? data?.data?.username.slice(0, 9) + '..' : data?.data?.username}
            </div>
        </div>
    )
}

export default Stories;