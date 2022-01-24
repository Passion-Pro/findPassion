import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useStateValue } from '../../StateProvider';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import db from '../../firebase';
import { useParams } from 'react-router-dom';
import { actionTypes } from '../../reducer';

function RightSidebarGroupTask() {

    const history = useHistory();
    const [{ showTop, user, groupDetails, groupMemberDetails}, dispatch] = useStateValue();
    const [dueDate, setDueDate] = useState(null);
    const { id } = useParams();

    const setDue = () => {
        if (dueDate && groupDetails && groupMemberDetails) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                .doc(groupDetails?.GroupId+user?.email).update({
                    Duedate: dueDate,
                    status: !groupMemberDetails.status ? 'pending' : groupMemberDetails.status
                })
                history.push(`/groupother/${id}`)
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <>
            {groupDetails && <div className='RightSidebarGroup'>
            <div className={showTop ? 'rightSidebarGroup__headerShow':"rightSidebarGroup__header"}>
                    <div className="rightSidebarGroup__headMoreTask">
                        <ArrowBackRoundedIcon onClick={() => {
                            history.push(`/groupother/${id}`)
                        }} />
                    </div>
                    <div className="rightSidebarGroup__headName">
                        {groupDetails && groupDetails?.GroupName} Chat
                    </div>
                    <div></div>
                </div>
                <div className="rightSidebarGroup__bodyTask">
                    <div className="taskUpper">
                        Task Given By :-
                        <span>{groupMemberDetails && groupMemberDetails?.givenBy}</span>
                    </div>
                    {groupMemberDetails && groupMemberDetails?.Duedate ? <div className="taskUpper">
                        Due Date :-
                        {groupMemberDetails?.Duedate}
                    </div> :
                        <div className="taskUpper">
                            Set Due Date :-
                            <input type="date" onChange={e => setDueDate(e.target.value)} />
                            <Button variant="contained" onClick={setDue}>Set</Button>
                        </div>}
                    <div className="taskUpper">
                        <div className="taskUpperHead">
                            Task
                        </div>
                        <p>
                            {groupMemberDetails && groupMemberDetails?.task}
                        </p>
                        <Stack spacing={2} direction="row">
                            Status :
                            <Button variant={groupMemberDetails?.status == 'Done' ? "contained" : "primary"} onClick={() => {
                                if (groupDetails && groupMemberDetails) {
                                    db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                                        .doc(groupDetails?.GroupId+user?.email).update({
                                            status: 'Done',
                                        })
                                        history.push(`/groupother/${id}`)
                                } else {
                                    alert('Something went wrong')
                                }
                            }}>Done</Button>
                            <Button variant={groupMemberDetails?.status == 'Doing' ? "contained" : "primary"} onClick={() => {
                                if (groupDetails && groupMemberDetails) {
                                    db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                                        .doc(groupDetails?.GroupId+user?.email).update({
                                            status: "Doing"
                                        })
                                        history.push(`/groupother/${id}`)
                                } else {
                                    alert('Something went wrong')
                                }
                            }}>Doing</Button>
                        </Stack>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default RightSidebarGroupTask
