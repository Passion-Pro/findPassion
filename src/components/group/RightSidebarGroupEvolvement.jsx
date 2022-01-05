import React from 'react';
import './RightSidebarGroup.css';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function RightSidebarGroupTask() {

    const history = useHistory();
    const [{ userInfo, user, groupDetails }, dispatch] = useStateValue();

    return (
        <div className='RightSidebarGroup'>
            <div className="rightSidebarGroup__header">
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push('/group')
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
               { groupDetails?.GroupName} Chat
                </div>
                <div></div>
            </div>
            <div className="rightSidebarGroup__bodyTask">
                <div className="taskUpper">
                    Task Given By :-
                    <span>Nishant Mainwal </span>
                </div>
                <div className="taskUpper">
                    Set Due Date :-
                    <input type="date" />
                </div>
                <div className="taskUpper">
                    <div className="taskUpperHead">
                        Task
                    </div>
                    <p>
                        You have to learn about how the github work!
                        You have to learn about how the github work!
                        You have to learn about how the github work!
                        You have to learn about how the github work!
                    </p>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained">Done</Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default RightSidebarGroupTask
