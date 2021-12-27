import React from 'react';
import { useState } from 'react'
import './Header.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useHistory } from 'react-router-dom';

function Header() {
    const [showSearch, setShowSearch] = useState(false)
    const history = useHistory();
    const signupimage = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyIOUxxjs2jzo7X6iOYOBKWDzVhPkx0dxK8w&usqp=CAU`;
    return (
        <div className='header' >
            <div className="header_In">
                <div className="header__Logo">
                    Passion
                </div>
                <div className="header__Icons">

                    <div className="header__Icon__search">
                        {<div className='searchHeader__divOut' >
                            <div className='searchHeader__div'>
                                <SearchRoundedIcon />
                                <input placeholder='Search' className='searchHeader__input' />
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="header__profile">
                    <button>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Header
