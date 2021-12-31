import React from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Divider from '@mui/material/Divider';
import ProfileImage from '../profile/ProfileImage';
import './PostCard.css';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

function PostCard({data}) {
    return (
        <div className='PostCard'>
            <div className='PostCardStarted'>
            <div className="PostCardStartedIn">
                <div className="PeopleStartedSameIn__Accountname">
                    {data.Profileimage ? <ProfileImage image={data.Profileimage} size={30} /> : <AccountCircleRoundedIcon style={{ fontSize: 30 }} />}
                    <div className="PeopleStartedSameIn__Accountname__name">
                       {data.name}
                       <br />
                       <span>{data.date}</span>
                    </div>
                </div>
                <Divider/>
                <div className="PostCard__lower">
                <div className="PostCard__lower__In">
                <div className="PostCard__lower__head">
                {data.infoHead}
                </div>
                <div className="postCard__Text">
                {data.info}
                </div>
                <div className="PostCard__image">
                <img src={data?.image} />
                </div>
                <div className="postCard__icons">
                    <div className="postCard__likeicon">
                 <ThumbUpRoundedIcon/>
                 <span>246</span>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PostCard
