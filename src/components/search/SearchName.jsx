import React from 'react';
import './SearchName.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Avatar } from '@material-ui/core';



function SearchName({ data }) {
    const learned='Reactjs, HTML, CSS, Javascript, C++'
    const learning='Blockchain, React Native, Redux, Machine Learning'
    return (
        <div className="searchName">
            <div className="searchNamefirstdiv">
                <div className="searchNamefirstdiv__photo">
                    <Avatar style={{ width : '50px' , height : '50px' }} src =  {data?.data?.profilePhotoUrl}/>
                </div>
                <div className="searchNamefirstdiv__rightInfo">
                    <span className='searchName__SpanName'>{data?.data?.name}</span>
                     {data?.data?.passion!== "others" && (<p className = "user_passion">{data?.data?.passion}</p>)}
                </div>
            </div>
        </div>
    )
}

export default SearchName
