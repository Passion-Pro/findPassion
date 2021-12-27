import React from 'react';
import './ProfileImage.css'

function ProfileImage({image,size}) {
    return (
        <div className='profileImage'>
            <img src={image} alt=""  />
        </div>
    )
}

export default ProfileImage
