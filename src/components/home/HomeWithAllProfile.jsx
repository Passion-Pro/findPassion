import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../header/Header';
import ProfileCard from '../profilecard/ProfileCard';
import CreateStory from '../stories/CreateStory';
import Stories from '../stories/Stories';
import PostCard from '../post/PostCard';
import HeaderSecond from '../header/HeaderSecond';
import db from '../../firebase';
import ShowStoriesSeries from '../stories/ShowStoriesSeries.jsx'

function HomeWithAllProfile() {

    const [data, setData] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        db.collection('users')
            .onSnapshot((snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
            })
    }, []);
    
    return (
        <div className='home'>
            <Header />
            <HeaderSecond />
            <div className="homeBody">
                <div className="stories">
                    <div className="createStory" >
                        <CreateStory />
                    </div>
                    <ShowStoriesSeries />
                </div>
                <div className="header__ProfileName">
                    <div className="recommendPeople">
                        {data.map((data) => (
                            <ProfileCard data={data} />
                        ))}
                    </div>
                </div>
                <div className="recommendPeople">
                    {data.map((data) => (
                        <ProfileCard data={data} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default HomeWithAllProfile;