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
import PostPopup from '../post/PostPopup';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { HistoryEduRounded } from '@mui/icons-material';

function Header() {
    const [{ userInfo, courseDiv }, dispatch] = useStateValue();
    const history = useHistory();
    const [input, setInput] = useState('');

    useEffect(() => {
        if (input) {
            history.push('/searchPage')
            dispatch({
                type: actionTypes.SET_SEARCH_INPUT,
                searchInput: input,
            })
        } else if (!input && window.location.pathname == '/searchPage') {
            history.push('/')
        }
    }, [input]);

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
                            <input placeholder='Search' className='searchHeader__input' onChange={e => setInput(e.target.value)} />
                        </div>
                    </div>
                    <div className="Loginheader__Icons">
                        <div className="Loginheader__home__Icon" onClick={() => history.push('/')}>
                            <HomeRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__addIcon" onClick={() => {
                            dispatch({
                                type: actionTypes.SET_COURSEDIV,
                                courseDiv: true,
                            });
                        }
                        }>
                            <AddIcon style={{ fontSize: 30, color: "white", cursor: "pointer" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/group')}>
                            <GroupsRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/world')}>
                            <LanguageRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                    </div>

                    <div className="Loginheader__profile" onClick={()=>{
                            history.push('/userProfile')
                        }}>
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
                <div className="Loginheader__Icon__search" onClick={() => history.push('/searchpage')}><SearchRoundedIcon style={{ fontSize: 30, color: "white" }} />
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
                <div className="Loginheader__Icon__search" onClick={() => history.push('/world')}>
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
