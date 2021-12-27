import React from 'react';
import './Box.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Divider from '@mui/material/Divider';
import ProfileImage from '../profile/ProfileImage';

function Box({data}) {
    const signupimage = null;
    return (
        <div className='PeopleStartedSame'>
            <div className="PeopleStartedSameIn">
                <div className="PeopleStartedSameIn__Accountname">
                    {signupimage ? <ProfileImage image={signupimage} size={30} /> : <AccountCircleRoundedIcon style={{ fontSize: 30 }} />}
                    <div className="PeopleStartedSameIn__Accountname__name">
                       {data.accountname}
                       <br />
                       <span>{data.date}</span>
                    </div>
                </div>
                <Divider/>
                <div className="PeopleStartedSameIn__head">
                {data.infoHead}
                </div>
                <div className="PeopleStartedSameIn__Text">
                {data.info}
                </div>
            </div>
        </div>
    )
}

export default Box
