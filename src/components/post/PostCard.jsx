import React, { useEffect, useState } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Divider from '@mui/material/Divider';
import ProfileImage from '../profile/ProfileImage';
import './PostCard.css';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import firebase from 'firebase';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {Avatar} from '@mui/material';

function PostCard({ data }) {
    const [{ user, userInfo }] = useStateValue();
    const [postUserInfo,setPostUserInfo]=useState(null);

    const handleLike = () => {
        const currentLikeStatus = !data.data.likedUser.includes(
            user?.email
        )

        db.collection(userInfo?.passion)
            .doc('Csb15iOnGedmpceiQOhX')
            .collection("Posts").doc(data.id).update({
                likedUser: currentLikeStatus ? firebase.firestore.FieldValue.arrayUnion(
                    user?.email,
                ) : firebase.firestore.FieldValue.arrayRemove(
                    user?.email
                ),
                totalLike: currentLikeStatus ?data?.data?.totalLike+1:data?.data?.totalLike-1,
            }).then(() => {
                db.collection("users")
                    .doc(user.uid)
                    .collection("Posts").doc(data.id).update({
                        likedUser: currentLikeStatus ? firebase.firestore.FieldValue.arrayUnion(
                            user?.email
                        ) : firebase.firestore.FieldValue.arrayRemove(
                            user?.email
                        ),
                        totalLike: currentLikeStatus ? data?.data?.totalLike+1:data?.data?.totalLike-1,
                    })
                console.log("sucess", user.uid, data.id);
            }).catch(() => {
                console.log("error");
            })
    }

    useEffect(()=>{
       if(data?.data?.userID){
           db.collection('users').doc(data?.data?.userID).onSnapshot((snapshot) => {
            setPostUserInfo(snapshot.data());
            console.log("first",postUserInfo?.profilePhotoUrl);
          })
       }
    },[])

    return (
        <>
            <div className='PostCard'>
                <div className='PostCardStarted'>
                    <div className="PostCardStartedIn">
                        <div className="PeopleStartedSameIn__Accountname">
                            {postUserInfo?.profilePhotoUrl ? 
                                <Avatar src={postUserInfo?.profilePhotoUrl} alt="" style={{display:'flex',height:'50px',width:"50px"}} />
                             : <AccountCircleRoundedIcon style={{ fontSize: 30 }} />}
                            <div className="PeopleStartedSameIn__Accountname__name">
                                {postUserInfo?.name}
                                <br />
                                <span>{data?.data?.date}</span>
                            </div>
                        </div>
                        <Divider />
                        <div className="PostCard__lower">
                            <div className="PostCard__lower__In">
                                <div className="PostCard__lower__head">
                                    {data?.data?.postHead}
                                </div>
                                <div className="postCard__Text">
                                    {data?.data?.postText}
                                </div>
                                {data?.data?.postType == 'Regular' && <div className="PostCard__image">
                                    <img src={data?.data?.imageURL} alt='image' />
                                </div>}
                                {data?.data?.postType == 'landscape' && <div className="LandscapePostCard__image">
                                    <img src={data?.data?.imageURL} alt='image' />
                                </div>}
                                {data?.data?.postType == 'portrait' && <div className="PortraitPostCard__image">
                                    <img src={data?.data?.imageURL} alt='image' />
                                </div>}
                                <div className="postCard__icons">
                                    <div className="postCard__likeicon" onClick={handleLike}>
                                        {!data?.data?.likedUser.includes(
                                            firebase.auth().currentUser?.email) ? <ThumbUpOutlinedIcon /> : <ThumbUpRoundedIcon />}
                                        <span>{data?.data?.likedUser.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCard
