import React, { useState } from 'react';
import './RightSidebarGroup.css'
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import db from '../../firebase';

function RightSidebarGroup() {
    const history = useHistory();
    const [{ showTop, showgroupMoreRight,user, groupDetails }, dispatch] = useStateValue();
    const [showMore, setShowMore] = useState(false);
    const { id } = useParams();

    const leaveGroup=()=>{
        if(groupDetails && user){
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').doc(groupDetails?.GroupId+user?.email).delete().then(()=>{
                db.collection('users').doc(user?.uid).collection('Groups').doc(user?.uid+groupDetails?.startedby).delete().then(()=>{
                    alert('You leave group successfully !')
                })
                    })
        }else{
            alert('Something went wrong!')
        }
    }
    
    return (
        <>
            
            <div className='RightSidebarGroup'>
                <div className={showTop ? 'rightSidebarGroup__headerShow' : "rightSidebarGroup__header"}>
                    <div className="rightSidebarGroup__headMore">
                        <ArrowBackRoundedIcon onClick={() => {
                            dispatch({
                                type: actionTypes.SET_SHOW_LEFTSIDEBARGROUP,
                                showLeftSidebarGroup: true,
                            })
                        }} />
                    </div>
                    <div className="rightSidebarGroup__headName">
                        {groupDetails?.GroupName}
                    </div>
                    <div onClick={()=>{
                        dispatch({
                            type: actionTypes.SET_SHOW_GROUP_MORE_RIGHT,
                            showgroupMoreRight: true,
                          })
                    }}>
                        <MoreVertIcon />
                        {
                            showgroupMoreRight && 
                            <div className="rightSidebarGroup__Moreoption">
                                <div className="rightSidebarGroup__option" onClick={leaveGroup} >
                                    Leave Group
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="rightSidebarGroup__body">
                    <div className="group__Chat" onClick={() => history.push(`/grouptaskother/${id}`)}>
                        Your Task
                    </div>
                    <div className="group__Chat" onClick={() => history.push(`/groupchatother/${id}`)}>
                        Group Chat
                    </div>
                    <div className="group__Chat" onClick={() => history.push(`/groupevolvementother/${id}`)}>
                        Involvement
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightSidebarGroup
