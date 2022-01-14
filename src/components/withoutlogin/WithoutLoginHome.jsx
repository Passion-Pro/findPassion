import React, { useEffect, useState } from 'react'
import Box from './Box';
import './WithoutLogin.css';
import './Header'
import Header from './Header';
import db from '../../firebase';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';


function WithoutLogin() {

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState('web');

    var webD = [];
    var appD = [];
    var gameD = [];
    var cp = [];
    var design = []; 
    var videoE = [];

    useEffect(() => {
        db.collection('SharedExperience')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
            });
    }, []);
    
    const checkwebD = (data) => {
        return data?.data?.related == 'Web Development';
    }
    webD = data.filter(checkwebD);

    const checkappD = (data) => {
        return data?.data?.related == 'app devolpment';
    }
    appD = data.filter(checkappD);

    const checkgameD = (data) => {
        return data?.data?.related == 'game devolpment';
    }
    gameD = data.filter(checkgameD);

    const checkcp = (data) => {
        return data?.data?.related == 'competitive programming';
    }
    cp = data.filter(checkcp);

    const checkdesign = (data) => {
        return data?.data?.related == 'design';
    }
    design = data.filter(checkdesign);

    const checkVideoD = (data) => {
        return data?.data?.related == 'video editing';
    }
    videoE = data.filter(checkVideoD);

    return (
        <div className='without__home'>
            {/* <Header /> */}
            <div className="without__homeBody">
                <div className="without__Head__Riv" onClick={() => setCurrent('web')}>
                    Web Devlopment
                    {current == 'web' ? <ArrowDropDownRoundedIcon /> : <ArrowRightRoundedIcon />}
                </div>
                {current == 'web' && webD.map(data => (
                    <Box data={data} />
                ))}

                <div className="without__Head__Riv" onClick={() => setCurrent('app')}>
                    App Devlopment
                    {current == 'app' ? <ArrowDropDownRoundedIcon /> : <ArrowRightRoundedIcon />}
                </div>
                {current == 'app' && appD.map(data => (
                    <Box data={data} />
                ))}

                <div className="without__Head__Riv" onClick={() => setCurrent('game')}>
                    Game Devlopment
                    {current == 'game' ? <ArrowDropDownRoundedIcon /> : <ArrowRightRoundedIcon />}
                </div>
                {current == 'game' && gameD.map(data => (
                    <Box data={data} />
                ))}
                <div className="without__Head__Riv" onClick={() => setCurrent('cp')}>
                    Competitive Programming
                    {current == 'cp' ? <ArrowDropDownRoundedIcon /> : <ArrowRightRoundedIcon />}
                </div>
                {current == 'cp' && cp.map(data => (
                    <Box data={data} />
                ))}
                <div className="without__Head__Riv" onClick={() => setCurrent('design')}>
                    Designing
                    {current == 'design' ? <ArrowDropDownRoundedIcon /> : <ArrowRightRoundedIcon />}
                </div>
                {current == 'design' && design.map(data => (
                    <Box data={data} />
                ))}
                <div className="without__Head__Riv" onClick={() => setCurrent('video')}>
                    Designing
                    {current == 'video' ? <ArrowDropDownRoundedIcon /> : <ArrowRightRoundedIcon />}
                </div>
                {current == 'video' && videoE.map(data => (
                    <Box data={data} />
                ))}
            </div>
        </div>
    )
}

export default WithoutLogin
