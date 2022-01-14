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
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import PostPopup from '../post/PostPopup';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Header() {
    const [{  user, courseDiv  }, dispatch] =useStateValue();
    const history = useHistory();    
    const [input,setInput]=useState('');
    
    useEffect(()=>{
      if(input){
          history.push('/searchPage')
        dispatch({
            type: actionTypes.SET_SEARCH_INPUT,
            searchInput: input,
          })
      }else if(!input && window.location.pathname=='/searchPage'){
          history.push('/')
      }
    },[input])

    const signupimage = 'https://image.cnbcfm.com/api/v1/image/105815446-1553624918736gettyimages-1078542150.jpeg?v=1612303414';
    
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
                            <input placeholder='Search' className='searchHeader__input' onChange={e=>setInput(e.target.value)}/>
                        </div>
                    </div>

                    <div className="Loginheader__Icons">
                        <div className="Loginheader__home__Icon" onClick={() => history.push('/')}>
                            <HomeRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__addIcon" onClick={() =>
                    {   
                            dispatch({
                              type: actionTypes.SET_COURSEDIV,
                              courseDiv: true,
                            });
                }
                    }>
                            <AddIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/')}>
                            <GroupsRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                        <div className="Loginheader__Icon__search" onClick={() => history.push('/')}>
                            <LanguageRoundedIcon style={{ fontSize: 30, color: "white" }} />
                        </div>
                    </div>

                    <div className="Loginheader__profile">
                        {signupimage ? <ProfileImage image={signupimage} /> : <AccountCircleRoundedIcon style={{ fontSize: 50, color: "white" }} />}
                        <span className='Loginheader_profileName'>
                            Nishant
                            <ArrowDropDownRoundedIcon />
                        </span>
                    </div>
                </div>
            </div>
            <div className="Loginheader__Icons__forMobile">
                <div className="Loginheader__home__Icon" onClick={() => history.push('/')}>
                    <HomeRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => history.push('/search')}><SearchRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() =>
                    {   
                            dispatch({
                              type: actionTypes.SET_COURSEDIV,
                              courseDiv: true,
                            });
                }
                    }>
                    <AddIcon style={{ fontSize: 30, color: "white", border: '1.6px solid white', borderRadius: '4px', padding: 0 }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => history.push('/search')}>
                    <GroupsRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
                <div className="Loginheader__Icon__search" onClick={() => history.push('/search')}>
                    <LanguageRoundedIcon style={{ fontSize: 30, color: "white" }} />
                </div>
            </div>
            {
                courseDiv  &&
                <div className="postPopup">
                    <PostPopup />
                </div>
            }
        </>
    )
}

export default Header
