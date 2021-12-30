import React from 'react';
import './Stories.css'

function Stories({data}) {
    return (
        <div className='Stories'>
           <div className='CreateProfile'>
                    <img src={data.profileimage} style={{ fontSize: 40, color: "lightgray" }} />
                </div>
                    <div className='AddStory__text'>
                        {data.name.length>8?data.name.slice(0,9)+'..':data.name}
                    </div>
        </div>
    )
}

export default Stories
{/* <div>
                <div className='CreateProfile'>
                    <AddCircleOutlineRoundedIcon style={{ fontSize: 40, color: "lightgray" }} />
                </div>
                    <div className='AddStory__text'>
                        Add Story
                    </div>
            </div> */}