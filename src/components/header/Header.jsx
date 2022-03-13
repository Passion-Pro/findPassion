import React, { useEffect, useState } from 'react';
import './Header.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useHistory } from 'react-router-dom';
import ProfileImage from '../profile/ProfileImage';
import AddIcon from '@mui/icons-material/Add';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ChatIcon from '@mui/icons-material/Chat';
import PostPopup from '../post/PostPopup';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function Header() {
    const [{ userInfo, courseDiv, searchInputPassion,pathnamef }, dispatch] = useStateValue();
    const history = useHistory();
    const [input, setInput] = useState('');
    const [inputPassion, setInputPassion] = useState(userInfo?.passion);
    const [search, setSearch] = useState(false);
    const [showpopup, setShowpopup] = useState(false);
console.log('inputPassion',inputPassion,userInfo.passion)

    useEffect(() => {
        if (input != '' && search) {
            history.push('/peopleforsearch')
            dispatch({
                type: actionTypes.SET_SEARCH_INPUT,
                searchInput: input,
            })
        } else if (input == '' && window.location.pathname === '/peopleforsearch') {
            history.push('/all_profile');
        }
    }, [search]);

    useEffect(() => {
        if (inputPassion!='') {
            dispatch({
                type: actionTypes.SET_SEARCH_INPUT_PASSION,
                searchInputPassion: inputPassion,
            })

        }
    }, [inputPassion]);

    useEffect(() => {
        if (inputPassion!='') {
            setInputPassion(userInfo?.passion)
        }
    }, [userInfo?.passion]);

    return (
        <>
            <div className='Loginheader' >
                <div className="Loginheader_In">
                    <div className="Loginheader__Logo">
                        Passion
                    </div>
                    <div className='searchHeader__divOut__ForLoginHeader' >
                        <div className='searchHeader__div'>
                            <SearchRoundedIcon />
                            <input placeholder='Search' className='searchHeader__input' onChange={e => {
                                setInput(e.target.value);
                                setSearch(false)
                            }} />
                            {input !== '' &&
                                <>
                                    <button style={{ height: "95%", width: '50px', color: "white", backgroundColor: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',marginRight:"10px" }}
                                        onClick={() => {
                                            setSearch(true)
                                        }}
                                    ><ArrowForwardRoundedIcon /></button>
                                </>
                            }
                            <>
                                <div style={{ height: "95%", width: '150px', color: "white", backgroundColor: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',cursor:'pointer' }} onClick={() => {
                                    setShowpopup(!showpopup)
                                }}>
                                    {inputPassion && inputPassion.length > 10 ? inputPassion.slice(0, 10)+"..." : inputPassion}
                                </div>
                                {showpopup &&
                                    <div className='popuptochoosePassion'>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none', margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Web Development')
                                            setShowpopup(!showpopup)
                                        }}>
                                            Web Development
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('App Development')
                                            setShowpopup(!showpopup)
                                        }}>
                                            App Development
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Designing')
                                            setShowpopup(!showpopup)
                                        }}>
                                            Designing
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Machine Learning')
                                            setShowpopup(!showpopup)
                                        }}>
                                            Machine Learning
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Game Development')
                                            setShowpopup(!showpopup)
                                        }}>
                                           Game Development
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Video Editing')
                                            setShowpopup(!showpopup)
                                        }}>
                                            Video Editing
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Artificial Intelligence')
                                            setShowpopup(!showpopup)
                                        }}>
                                            Artificial Intelligence
                                        </button>
                                        <button style={{
                                            height: "50px",
                                            fontSize: 'large',
                                            width: '100%', color: "#5d5c5c", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: "center", borderRadius: '6px', outline: "none", border: 'none',
                                            margin: "4px 2px" ,cursor:'pointer'
                                        }} onClick={()=>{
                                            setInputPassion('Research')
                                            setShowpopup(!showpopup)
                                        }}>
                                            Research
                                        </button>
                                    </div>
                                }
                            </>
                        </div>

                    </div>
                    <div className="Loginheader__Icons">
                        <div className="Loginheader__home__Icon" onClick={() => history.push('/')}>
                            <HomeRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/all_profile')}>
                            <LanguageRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/group')}>
                            <GroupsRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/chat')}>
                            <ChatIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                    </div>

                    <div className="Loginheader__profile" onClick={() => history.push("/userProfile")}>
                        {userInfo?.profilePhotoUrl ? <ProfileImage image={userInfo?.profilePhotoUrl} /> : <AccountCircleRoundedIcon style={{ fontSize: 50, color: "white" }} />}
                        <span className='Loginheader_profileName'>
                            {userInfo?.name && userInfo?.name?.length > 9 ? userInfo?.name.slice(0, 9) : userInfo?.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className="Loginheader__Icons__forMobile">
                <div className="Loginheader__home__Icon" onClick={() => history.push('/')}>
                    <HomeRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => history.push('/searchPage')}>
                    <SearchRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => {
                    dispatch({
                        type: actionTypes.SET_COURSEDIV,
                        courseDiv: true,
                    });
                }
                }>
                    <AddIcon style={{ fontSize: 30, color: "white", border: '1.6px solid white', borderRadius: '4px', padding: 0 }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => history.push('/group')}>
                    <GroupsRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => history.push('/all_profile')}>
                    <LanguageRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
            </div>
            {
                courseDiv &&
                <div style={{
                    display: 'flex',
                    position: 'absolute', bottom: '0', left: '0', right: '0',
                    height: '91.5vh', width: '100vw',
                    backgroundColor: 'rgba(204,204,204,1)',
                    zIndex: '21'
                }}>
                    <div className="postPopup">
                        <PostPopup />
                    </div>
                </div>
            }
        </>
    )
}

export default Header
