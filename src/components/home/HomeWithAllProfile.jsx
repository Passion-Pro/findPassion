import React, { useEffect, useState } from 'react';
import './Home.css';
import ProfileCard from '../profilecard/ProfileCard';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import db from '../../firebase';
import ShowStoriesSeries from '../stories/ShowStoriesSeries.jsx';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import {useStateValue} from "../../StateProvider"
import { actionTypes } from '../../reducer';

function HomeWithAllProfile() {
    const[{userInfo} , dispatch] = useStateValue();
    const [data, setData] = useState([]);
    const [down,setDown]=useState(true);
    const [down2,setDown2]=useState(true);

    useEffect(() => {
        dispatch({
          type: actionTypes.SET_PATHNAMEF,
          pathnamef: "/all_profile",
        });
      }, []);

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
            <div className="homeBody">
                <div className="header__ProfileName">
                    <div className='header__ProfileName__Head'>
                       Find students in {userInfo?.passion}
                       <div className='ArrowDropDownRoundedIcon' onClick={()=>{setDown(!down)}}>
                        <ArrowDropDownRoundedIcon />
                       </div>
                    </div>

                    {down && <div className="recommendPeople" id='box1'>
                        {data.map((data) => (
                            <ProfileCard data={data} />
                        ))}
                        <div className="Arrow__showrecommendProfile" onClick={funct1}>
                            <ArrowForwardRoundedIcon className='Arrow__showrecommendInProfile' />
                        </div>
                    </div>}
                </div>
                <div className="header__ProfileName">
                    <div className='header__ProfileName__Head'>
                        Other Students
                        <div className='ArrowDropDownRoundedIcon' onClick={()=>{setDown2(!down2)}}>
                        <ArrowDropDownRoundedIcon />
                       </div>
                    </div>
                   {down2 && <div className="recommendPeople2" id='box'>
                    {data.map((data) => (
                            <>
                              {data?.data?.passion !== userInfo?.passion && (
                                  <>
                                 
                                  <ProfileCard data={data} />
                                  </>
                              )}
                            </>
                        ))}
                        <div className="Arrow__showrecommendProfile" onClick={funct}>
                            <ArrowForwardRoundedIcon className='Arrow__showrecommendInProfile' />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default HomeWithAllProfile;