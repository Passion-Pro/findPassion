import React from 'react';
import './PostPopup.css';
import landscape from './img/landscape.svg'
import portrait from './img/portrait.svg'
import regularPost from './img/regularPost.svg'

function PostPopup() {
    return (
        <div className='PostPopup'>
            <div className="PostPopup__IN">
                <div className="postPopup__Field">
                   <img src={regularPost} alt="" style={{color:"blue"}} />
                    Regular Post
                </div>
                <div className="postPopup__Field">
                <img src={landscape} alt="" />
                    Landscape Post
                </div>
                <div className="postPopup__Field">
                <img src={portrait} alt="" />
                    Portrait Post
                </div>
            </div>
        </div>
    )
}

export default PostPopup
