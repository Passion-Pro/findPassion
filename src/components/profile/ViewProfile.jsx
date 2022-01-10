import React from 'react'
import { useParams } from 'react-router-dom';
import './ViewProfile.css'

function ViewProfile() {
    const {id}=useParams();

    return (
        <div className='viewprofile'>
            <div className="viewprofileHead">

            </div>
        </div>
    )
}

export default ViewProfile
