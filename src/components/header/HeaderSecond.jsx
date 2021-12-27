import React from 'react';
import './HeaderSecond.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import Divider from '@mui/material/Divider';

function HeaderSecond() {
    return (
        <>
            <div className='HeaderSecond'>
                <div className="followingCard">
                    Stories <ArrowDropDownRoundedIcon style={{fontSize:18}}/>
                </div>
                <div className="HeaderSecond__Div">
                    <div className={"followingCard"}>
                        Post
                    </div>
                    <div className={"followingCard"}>
                        Following
                    </div>
                    <div className={"followingCard"}>
                        All
                    </div>
                    <div className={"followingCard"}>
                        <DoubleArrowRoundedIcon style={{ fontSize: 15, fontWeight: 100 }} />
                    </div>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default HeaderSecond
