import React from 'react';
import './SearchBodyRightBox.css'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function SearchBodyRightBox() {
    return (
        <div className='searchBodyRightBox'>
        <div className='searchBodyRightBox__In1'>
            <div className="searchBodyRightBox__firstdiv">
             <div className="firstdiv__photo">
               <AccountCircleRoundedIcon style={{color:"gray",fontSize:60}}/>
             </div>
             <div className="firstdiv__rightInfo">
                 <span style={{color:"indigo",fontWeight:"bold"}}>Nishant</span>
               <div style={{}}>
                   <span style={{color:"gray",}}>Learning :- </span>
                   Lorem ipsum dolor
                   </div>
               <span>
               <span style={{color:"gray",}}>Learned :- </span>
                   Lorem, ipsum dolor.</span>
             </div>
            </div>
            <div className="searchBodyRightBox__firstdiv">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, officiis!
            </div>
        </div>
         <div className="searchBodyRightBox__In2">
             <div className="txt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus corporis laudantium fugit assumenda nobis veritatis, nihil sunt deserunt inventore, similique alias, accusamus harum reprehenderit velit commodi itaque deleniti suscipit dolor?</div>
         </div>
        </div>
    )
}

export default SearchBodyRightBox;