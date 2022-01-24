import React, { useState } from 'react';
import './HeaderSecond.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function HeaderSecond() {
    const [{ user, courseDiv, showExpandGroup, showMoreoption }, dispatch] = useStateValue();
    const history = useHistory();
    const [pathName, setPathName] = useState('');
    const [showhead, setShowhead] = useState(false);

    return (
        <>
            {showMoreoption &&
                <div className='showHeadDiv' >
                    <div className="showHeadDiv__ROW" onClick={() => {
                        history.push('/chat')
                    }}>
                        Chat
                    </div>
                    <Divider />
                    <div className="showHeadDiv__ROW" onClick={() => {
                        history.push('/shareexperience')
                    }}>
                        Add Your Advice
                    </div>
                    <Divider />
                    <div className="showHeadDiv__ROW">

                    </div>
                </div>
            }
            <div className='HeaderSecond'>
                {/* <div className="followingCard "> */}
                <div className="followingCardShow">
                    Stories <ArrowDropDownRoundedIcon style={{ fontSize: 18 }} />
                </div>
                {/* </div> */}
                <div className="HeaderSecond__Div">
                    <div onClick={() => {
                        history.push('/')
                        setPathName('/')
                    }} className={window.location.pathname == '/' || pathName == '/post' ? "followingCard__active" : "followingCard"}>
                        Post
                    </div>
                    <div onClick={() => {
                        history.push('/all_profile')
                        setPathName('/all_profile')
                    }} className={window.location.pathname == '/all_profile' || pathName == '/all_profile' ? "followingCard__active" : "followingCard"}>
                        Profiles
                    </div>
                    <div className={showMoreoption ? "followingCard__active" : "followingCard"} onClick={() => {
                        dispatch({
                            type: actionTypes.SET_SHOW_MORE_OPTION,
                            showMoreoption: true,
                        })
                    }}>
                        <DoubleArrowRoundedIcon style={{ fontSize: 15, fontWeight: 100 }} />
                    </div>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default HeaderSecond
