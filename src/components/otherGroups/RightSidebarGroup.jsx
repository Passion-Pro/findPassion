import React from 'react';
import { useHistory } from 'react-router-dom'; 
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useParams } from 'react-router-dom';

function RightSidebarGroup() {
    const history = useHistory();
    const [{ userInfo, user, groupDetails },dispatch] = useStateValue();
    const {id} =useParams();
    return (
        <div className='RightSidebarGroup'>
            <div className="rightSidebarGroup__header">
                <div className="rightSidebarGroup__headMore">
                    <ArrowBackRoundedIcon onClick={() => {
                        dispatch({
                            type: actionTypes.SET_SHOW_LEFTSIDEBARGROUP,
                            showLeftSidebarGroup: true,
                        })
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                    {groupDetails?.GRoupName}Chat
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
    )
}

export default RightSidebarGroup
