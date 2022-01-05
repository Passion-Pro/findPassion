import React from 'react';
import './PostPopup.css';
import landscape from './img/landscape.svg'
import portrait from './img/portrait.svg'
import regularPost from './img/regularPost.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';

function PostPopup() {
 
    const history=useHistory();
    const [{user, courseDiv  }, dispatch] =useStateValue();

    return (
        <div className='PostPopup' >
            <div className="PostPopup__IN">
                <div className="postPopup__Field" onClick={()=>history.push('/addpost')}>
                   <img src={regularPost} alt="" style={{color:"blue"}} />
                    Regular Post
                </div>
                <div className="postPopup__Field" onClick={()=>history.push('/landspacepost')}>
                <img src={landscape} alt="" />
                    Landscape Post
                </div>
                <div className="postPopup__Field" onClick={()=>history.push('/portraitpost')}>
                <img src={portrait} alt="" />
                    Portrait Post
                </div>
            </div>
        </div>
    )
}

export default PostPopup
