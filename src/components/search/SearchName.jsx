import React from 'react';
import './SearchName.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function SearchName({ data }) {
    const learned='Reactjs, HTML, CSS, Javascript, C++'
    const learning='Blockchain, React Native, Redux, Machine Learning'
    return (
        <div className="searchName">
            <div className="searchNamefirstdiv">
                <div className="searchNamefirstdiv__photo">
                    <AccountCircleRoundedIcon style={{ color: "gray", fontSize: 60 }} />
                </div>
                <div className="searchNamefirstdiv__rightInfo">
                    <span className='searchName__SpanName'>{data?.data?.name}</span>
                    <div className='searchName__SpanDiv'>
                        <span className='searchName__SpanStatus'>Learning :- </span>
                        <span className='searchName__SpanStatus_text'>
                         {learning.length>20 ? learning.slice(0,20)+'...': learning}
                        </span>
                    </div>
                    <div className='searchName__SpanDiv'>  
                    <span className='searchName__SpanStatus'>Learned :- </span>
                        <span className='searchName__SpanStatus_text'>
                        {learned.length>20 ? learned.slice(0,20)+'...': learned}
                        </span>  
                </div>
                </div>
            </div>
        </div>
    )
}

export default SearchName
