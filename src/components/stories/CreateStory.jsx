import React from 'react';
import './CreateStory.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

function CreateStory() {
    return (
        <>
            <div>
                <div className='CreateProfile'>
                    <AddCircleOutlineRoundedIcon style={{ fontSize: 40, color: "lightgray" }} />
                </div>
                    <div className='AddStory__text'>
                        Add Story
                    </div>
            </div>
        </>
    )
}

export default CreateStory
