import React from 'react';
import './CreateStory.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useHistory } from 'react-router-dom';

function CreateStory() {
    const history=useHistory();
    return (
        <>
            <div style={{margin:'3px 3px 0 3px'}} >
                <div className='CreateProfile' onClick={()=>{
                    history.push('/createStory')
                }}>
                    <AddCircleOutlineRoundedIcon style={{ fontSize: 60, color: "lightgray"}} />
                </div>
                    <div className='AddStory__text'>
                        Add Story
                    </div>
            </div>
        </>
    )
}

export default CreateStory
