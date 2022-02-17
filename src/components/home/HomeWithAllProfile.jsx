import React, { useEffect, useState } from 'react';
import './Home.css';
import ProfileCard from '../profilecard/ProfileCard';
import CreateStory from '../stories/CreateStory';
import HeaderSecond from '../header/HeaderSecond';
import db from '../../firebase';
import ShowStoriesSeries from '../stories/ShowStoriesSeries.jsx';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useStateValue } from '../../StateProvider';

function HomeWithAllProfile() {

    const [data, setData] = useState([]);
    const[{userInfo} , dispatch] = useStateValue();

    useEffect(() => {
        db.collection(userInfo?.gender=='male'? "girls":"boys")
            .onSnapshot((snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
            })
    }, []);

    const funct = () => {
        console.log("object")
        document.getElementById('box').scrollLeft += 900;
    }
    const funct1 = () => {
        console.log("object")
        document.getElementById('box1').scrollLeft += 900;
    }

    return (
        <div className='home'>
            <HeaderSecond />
            <div className="homeBody">
                <div className="stories">
                    <div className="createStory" >
                        <CreateStory />
                    </div>
                    <ShowStoriesSeries />
                </div>
                <div className="header__ProfileName">
                    <div className='header__ProfileName__Head'>
                        Similiar Passion
                    </div>
                    <div className="recommendPeople" id='box1'>
                        {data.map((data) => (
                            <ProfileCard data={data} />
                        ))}
                        <div className="Arrow__showrecommendProfile" onClick={funct1}>
                            <ArrowForwardRoundedIcon className='Arrow__showrecommendInProfile' />
                        </div>
                    </div>
                </div>
                <div className="header__ProfileName">
                    <div className='header__ProfileName__Head'>
                        Other Passion
                    </div>
                    <div className="recommendPeople" id='box'>
                        {data.map((data) => (
                            <ProfileCard data={data} />
                        ))}
                        <div className="Arrow__showrecommendProfile" onClick={funct}>
                            <ArrowForwardRoundedIcon
                                className='Arrow__showrecommendInProfile' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeWithAllProfile;