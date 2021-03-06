import React, { useEffect, useState } from 'react';
import './RightSidebarGroup.css';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useStateValue } from '../../StateProvider';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import db from '../../firebase';

function RightSidebarGroupTask() {

    const history = useHistory();
    const [{ user, groupDetails, showTop }] = useStateValue();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember')
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setTasks(
                        snapshot.docs.map((doc) => ({
                            data: doc.data(),
                            id: doc.id,
                        }))
                    );
                });
        }
    }, [user]);

    return (
        <div className='RightSidebarGroup'>
            <div className={showTop ? 'rightSidebarGroup__headerShow' : "rightSidebarGroup__header"}>
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push('/group')
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                     Chat
                </div>
                <div></div>
            </div>
            <div className="rightSidebarGroup__bodyTask">
                {tasks.map((task) => (
                    <div className='taskOuter'>
                        {task?.data?.task != null ? <><div className="taskUpper">
                            To
                            <span>{task?.data?.name} </span>
                            ,
                            Due Date :-
                            <span>{task?.data?.Duedate ? task?.data?.Duedate : 'Not set yet'} </span>
                        </div>
                            <div className="taskUpper">
                                <div className="taskUpperHead">
                                    Goal
                                </div>
                                <p>
                                    {task?.data?.task}
                                </p>
                                <Stack spacing={2} direction="row">
                                    <Button >{task?.data?.status} on {task?.data?.statusDateDone ? task?.data?.statusDateDone : task?.data?.statusDateDoing}</Button>
                                </Stack>
                            </div></> :
                            <div>
                                No Goal given
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RightSidebarGroupTask
