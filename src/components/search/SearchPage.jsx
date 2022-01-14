import React from 'react'
import SearchBody from './SearchBody'
import SearchBodyRightBox from './SearchBodyRightBox'

function searchPage() {
    return (
        <div style={{display:'flex',alignItem:'center',justifyContent:"center",width:"100vw",paddingTop:"12px",backgroundColor:"#f1f6fa"}}>
            <div style={{display:'flex',maxWidth: '1300px',width:"94vw"}}>
            <SearchBody/>
            <SearchBodyRightBox/>
            </div>
        </div>
    )
}

export default searchPage
