import React, { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import db from '../../firebase';

function RightSidebarGroupTaskEach({ task }) {
    const [{ user, groupDetails, groupMemberDetails }] = useStateValue();

    const [editStatus, setEditStatus] = useState(false);
    const [editDue, setEditDue] = useState(false);
    const [dueDate, setDueDate] = useState(null);

    var today = new Date();
    var date = today.toLocaleString();

    const setDueDateFunct = () => {
        if (groupDetails?.GroupId && user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').doc(groupDetails?.GroupId + user?.email).update({
                Duedate: dueDate,
            }).then(() => {
                db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').doc(groupDetails?.GroupId + user?.email).collection('Tasks').doc(task?.id).update({
                    Duedate: dueDate,
                }).then(() => {
                    setEditDue(false)
                })
            })
        }
    }

    return (
        <>
            <div className='taskOuter' onClick={() => {
                if (editStatus == true) {
                    setEditStatus(false);
                }
            }}>
                <div style={{ display: 'flex', padding: '8px 0 0 15px', fontWeight: '600' }}>
                    {groupMemberDetails?.timestamp < task?.data?.timestamp ? "Task No. " + task?.data?.totalTask : 'Old tasks'}
                </div>
                <div className="taskUpper">
                    {!editDue && <div style={{ display: 'flex', fontSize: '15px', padding: '0 0 8px 0' }}>
                        Due Date :-
                        <span>{task?.data?.Duedate ? task?.data?.Duedate : <div style={{ display: 'flex', alignItems: 'center' }}> <span style={{ display: 'flex', color: '#413d3d', paddingRight: '10px' }}>Not set yet </span> <EditRoundedIcon onClick={() => {
                            setEditDue(true)
                        }} fontSize='small' /></div>} </span>
                    </div>}
                    {editDue && <div className='editDue' style={{ display: 'flex', fontSize: '15px', padding: '0 0 8px 0' }}>
                        <div>
                            Set due Date :-
                            <span><input type="date" onChange={e=>setDueDate(e.target.value)} /> </span>
                        </div>
                        <div className='EditDueBottonDiv'>
                            <Button className='editDueBotton' variant="contained" size="small" color="success" onClick={setDueDateFunct}>
                                Set
                            </Button>
                            <Button className='editDueBotton' variant="outlined" size="small" color="error" onClick={() => {
                                setEditDue(false)
                            }}>
                                cancel
                            </Button>
                        </div>
                    </div>}
                    <div style={{ display: 'flex', fontSize: '15px', padding: '0 0 8px 0', color: '#585252' }}>
                        Given on {task?.data?.date}
                    </div>
                </div>
                <div className="taskUpper">
                    <div className="taskUpperHead">
                        Task
                    </div>
                    <p>
                        {task?.data?.task}
                    </p>
                    <Stack spacing={2} >
                        {editStatus && <>{task?.data?.statusDateDoing ? <Button disabled>Started the task on  {task?.data?.statusDateDoing}</Button> : <Button onClick={() => {
                            if (groupDetails && groupMemberDetails) {
                                db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                                    .doc(groupDetails?.GroupId + user?.email).update({
                                        status: 'Doing',
                                        statusDateDoing: date
                                    }).then(() => {
                                        db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                                            .doc(groupDetails?.GroupId + user?.email).collection('Tasks').doc(task?.id).update({
                                                status: 'Doing',
                                                statusDateDoing: date
                                            })
                                    })
                            }
                        }}>Start</Button>}
                            {task?.data?.statusDateDone ? <Button disabled>Finish the task on {task?.data?.statusDateDone}</Button> : <Button
                                onClick={() => {
                                    if (groupDetails && groupMemberDetails) {
                                        db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                                            .doc(groupDetails?.GroupId + user?.email).update({
                                                status: 'Done',
                                                statusDateDone: date
                                            }).then(() => {
                                                db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
                                                    .doc(groupDetails?.GroupId + user?.email).collection('Tasks').doc(task?.id).update({
                                                        status: 'Done',
                                                        statusDateDone: date
                                                    })
                                            })
                                    }
                                }}
                            >Done</Button>}</>}
                        {!editStatus && <Button variant="contained" endIcon={!editStatus && <EditRoundedIcon />} onClick={() => {
                            setEditStatus(!editStatus)
                        }}>{task?.data?.status != "pending" ? <>  {groupMemberDetails?.data?.name} {task?.data?.status != 'Done' && 'started '}{task?.data?.status} the task on {task?.data?.statusDateDone ? task?.data?.statusDateDone : task?.data?.statusDateDoing ? task?.data?.statusDateDoing : "You have't set yet"}</> : "Pending"}</Button>}
                    </Stack>
                </div>
            </div>
        </>
    )
}

export default RightSidebarGroupTaskEach;
