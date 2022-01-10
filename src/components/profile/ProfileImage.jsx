import { Avatar } from '@mui/material';
import React from 'react';
import './ProfileImage.css'

function ProfileImage({image,size}) {
    return (
        <div className='profileImage'>
            <Avatar src={image} alt="" style={{fontSize:60}} />
        </div>
    )
}

export default ProfileImage
