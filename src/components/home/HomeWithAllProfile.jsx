import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../header/Header';
import ProfileCard from '../profilecard/ProfileCard';
import CreateStory from '../stories/CreateStory';
import Stories from '../stories/Stories';
import PostCard from '../post/PostCard';
import HeaderSecond from '../header/HeaderSecond';
import db from '../../firebase';
import ShowStoriesSeries from '../stories/ShowStoriesSeries.jsx';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import {useStateValue} from "../../StateProvider"

function HomeWithAllProfile() {
    const[{userInfo} , dispatch] = useStateValue();
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

    function sideScroll(element,direction,speed,distance,step){
        console.log("2")
       var scrollAmount=0;
        var slideTimer=setInterval(function(){
            if(direction=='left'){
                element.scrollLeft-=step;
            }else{
                element.scrollleft+=step;
            }
            scrollAmount+=step;
            if(scrollAmount>=distance){
                window.clearInterval(slideTimer);
            }
        },speed);
    }

    const funct=()=>{
        console.log("object")
        document.getElementById('box').scrollLeft+=900;
    }
    const funct1=()=>{
        console.log("object")
        document.getElementById('box1').scrollLeft+=900;
    }

    return (
        <div className='home'>
            <div className="homeBody">
                {/* <div className="stories">
                    <div className="createStory" >
                        <CreateStory />
                    </div>
                    <ShowStoriesSeries />
                </div> */}
                <div className="header__ProfileName">
                    <div className='header__ProfileName__Head'>
                       Find students in {userInfo?.passion}
                    </div>
                    <div className="recommendPeople" id='box1'>
                        {data.map((data) => (
                            <>
                              {data?.data?.passion === userInfo?.passion && (
                                  <ProfileCard data={data} />
                              )}
                            </>
                        ))}
                         <div className="Arrow__showrecommendProfile" onClick={funct1}>
                            <ArrowForwardRoundedIcon className='Arrow__showrecommendInProfile' />
                        </div>
                    </div>
                </div>
                <div className="header__ProfileName">
                    <div className='header__ProfileName__Head'>
                        
                    </div>
                    <div className="other_students" id='box'>
                    {data.map((data) => (
                            <>
                              {data?.data?.passion !== userInfo?.passion && (
                                  <ProfileCard data={data} />
                              )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeWithAllProfile;