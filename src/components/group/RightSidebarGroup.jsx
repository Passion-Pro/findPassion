import React from 'react';
import './RightSidebarGroup.css';
import { useHistory } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function RightSidebarGroup() {
    const history = useHistory();
    const [{ groupDetails }, dispatch] = useStateValue();
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
                {groupDetails?.GroupName} Chat
                </div>
            </div>
            <div className="rightSidebarGroup__body">
                <div className="group__Chat" onClick={() => history.push('/grouptask')}>
                    Given Task
                </div>
                <div className="group__Chat" onClick={() => history.push('/groupchat')}>
                    Group Chat
                </div>
                <div className="group__Chat" onClick={() => history.push('/groupevolvement')}>
                    Involvement
                </div>
            </div>
        </div>
    )
}

export default RightSidebarGroup
