import React from 'react';
import './Box.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Divider from '@mui/material/Divider';
import ProfileImage from '../profile/ProfileImage';

function Box({data}) {
    const signupimage = null;
    console.log("data",data)
    return (
        <div className='PeopleStartedSame'>
            <div className="PeopleStartedSameIn">
                <div className="PeopleStartedSameIn__Accountname">
                    {signupimage ? <ProfileImage image={signupimage} size={30} /> : <AccountCircleRoundedIcon style={{ fontSize: 30 }} />}
                    <div className="PeopleStartedSameIn__Accountname__name">
                       {data?.data?.username}
                       <br />
                       <span>{data?.data.date}</span>
                    </div>
                </div>
                <Divider/>
                <div className="PeopleStartedSameIn__head">
                {data?.data.postHead}
                </div>
                <div className="PeopleStartedSameIn__Text">
                {data?.data.postText}
                </div>
            </div>
        </div>
    )
}

export default Box
