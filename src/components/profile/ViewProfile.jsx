import React from 'react'
import { useParams } from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';
import './ViewProfile.css'

function ViewProfile() {
    const {id}=useParams();

    return (
        <div className='viewprofile'>
           <ProfilePage id = {id}/>
        </div>
    )
}

export default ViewProfile
