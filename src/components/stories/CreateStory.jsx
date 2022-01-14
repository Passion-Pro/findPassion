import React, { useEffect, useState } from 'react';
import './CreateStory.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { Avatar } from '@mui/material';
import db from '../../firebase';

function CreateStory() {
    const [{ userInfo }, dispatch] = useStateValue();

    const [status, setStatus] = useState(null);
    const history = useHistory();

    return (
        <>
            <div style={{ margin: '3px 3px 0 3px' }} >
                <div className='CreateProfile' onClick={() => {
                    userInfo?.statusID ? <div>{
                        history.push(`/viewStory/${userInfo?.statusID}`)
                    }</div> :
                        history.push('/createStory')
                }}>
                    {userInfo?.statusID ? <Avatar src={userInfo?.profilePhotoUrl} style={{display: "flex",height: 60,width: 60,borderRadius: '50%'}}/> : <AddCircleOutlineRoundedIcon style={{ fontSize: 60, color: "lightgray" }} />}
                </div>
                <div className='AddStory__text'>
                    {userInfo?.statusID ? "View Story" : "Add Story"}
                </div>
            </div>
        </>
    )
}

export default CreateStory;
