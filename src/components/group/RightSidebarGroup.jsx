import React from 'react';
import './RightSidebarGroup.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function RightSidebarGroup() {
    const history = useHistory();
    const [{ groupDetails,showTop , user }, dispatch] = useStateValue();
    return (
        <div className='RightSidebarGroup'>
            <div className={showTop ? 'rightSidebarGroup__headerShow':"rightSidebarGroup__header"}>
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
            </div>
            <div className="rightSidebarGroup__body">
                <div className="group__Chat" onClick={() => history.push('/grouptasklist')} title='Task that you have given to member'>
                    Given Goal
                </div>
                <div className="group__Chat" onClick={() => history.push('/groupchat')}>
                    Group Chat
                </div>
                <div className="group__Chat" onClick={() => history.push('/groupevolvement')} title='Involvement of member'>
                    Involvement
                </div>
            </div>
        </div>
    )
}

export default RightSidebarGroup
