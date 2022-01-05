import React, { useState } from 'react';
import './HeaderSecond.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router-dom';

function HeaderSecond() {

    const history = useHistory();
    const [pathName, setPathName] = useState('');
    
    return (
        <>
            <div className='HeaderSecond'>
                {/* <div className="followingCard "> */}
                <div className="followingCardShow">
                    Stories <ArrowDropDownRoundedIcon style={{ fontSize: 18 }} />
                </div>
                {/* </div> */}
                <div className="HeaderSecond__Div">
                    <div onClick={() =>{ history.push('/post')
                setPathName('/post')
                }} className={window.location.pathname== '/post' || pathName == '/post' ? "followingCard__active" : "followingCard"}>
                        Post
                    </div>
                    <div onClick={
                        () => {
                            history.push('/following__profile')
                            setPathName('/following__profile')
                        }
                    }
                        className={window.location.pathname== '/following__profile' || pathName == '/following__profile' ? "followingCard__active" : "followingCard"}>
                        Following
                    </div>
                    <div onClick={() =>{ history.push('/all_profile')
                      setPathName('/all_profile')
                 }} className={window.location.pathname== '/all_profile' || pathName == '/all_profile' ? "followingCard__active" : "followingCard"}>
                        All
                    </div>
                    <div className={window.location.pathname == '/more' ? "followingCard__active" : "followingCard"}>
                        <DoubleArrowRoundedIcon style={{ fontSize: 15, fontWeight: 100 }} />
                    </div>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default HeaderSecond
