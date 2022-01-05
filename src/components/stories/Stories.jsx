import React from 'react';
import { useHistory } from 'react-router-dom';
import './Stories.css';

function Stories({ data }) {
    const history=useHistory();

    return (
        <div className='Stories' onClick={()=>history.push('/showstory')}>
            <div className='CreateProfile'>
                <img src={data.profileimage} style={{ fontSize: 40, color: "lightgray" }} />
            </div>
            <div className='AddStory__text'>
                {data.name.length > 8 ? data.name.slice(0, 9) + '..' : data.name}
            </div>
        </div>
    )
}

export default Stories;