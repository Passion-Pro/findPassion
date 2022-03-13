import React from 'react';
import './SearchName.css';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import SearchPage from './SearchPage'
function SearchName({ data,Nodata }) {
    const history=useHistory()
    return (
        <>
           {/* <div style={{height:"91.5vh",width:'100vw',display:'flex',justifyContent:"center",alignItems:"center"}}>
               <div className="options_buttons">
        <button className="stories_button"
            onClick={(e) => history.push("/peopleforsearch")}
            >People</button>
            <button className="learnings_button"
            onClick={(e) => history.push("/worldforsearch")}
            style = {{
                marginLeft : '10px'
              }}
            >Learnings</button>
            <button className="stories_button"
            style = {{
              marginLeft : '10px'
            }}
            onClick={(e) => history.push("/postforsearch")}
          >
            Posts
          </button>
        </div> */}
        {Nodata ? <div className="searchName" onClick={() => {
            history.push(`/viewProfile/${data?.id}`)
        }}>
            <div className="searchNamefirstdiv">
                <div className="searchNamefirstdiv__photo">
                    <Avatar style={{ width : '50px' , height : '50px' }} src =  {data?.data?.profilePhotoUrl}/>
                </div>
                <div className="searchNamefirstdiv__rightInfo">
                    <span className='searchName__SpanName'>{data?.data?.name}</span>
                     {data?.data?.passion!== "others" && (<p className = "user_passion">{data?.data?.passion}</p>)}
                </div>
            </div>
        </div>:<><div style={{height:"75.5vh",width:'100vw',display:'flex',justifyContent:"center",alignItems:"center"}}> Nodata </div></>}
           </>
    )
}

export default SearchName
