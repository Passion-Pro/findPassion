import React, { useEffect, useState } from 'react';
import './RightSidebarGroup.css';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import db from '../../firebase';

function RightSidebarGroupTask() { 

    const history = useHistory();
    const [{ userInfo, user, groupDetails }, dispatch] = useStateValue();

    const [tasks,setTasks]=useState([]);
    useEffect(()=>{
        if(user){
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
    },[user])
console.log(tasks)
    return (
        <div className='RightSidebarGroup'>
            <div className="rightSidebarGroup__header">
                <div className="rightSidebarGroup__headMoreTask">
                <ArrowBackRoundedIcon onClick={() => {
                           history.push('/group')
                        }}/>
                </div>
                <div className="rightSidebarGroup__headName">
                    {groupDetails?.GroupName} Chat
                </div>
                <div></div>
            </div>
            <div className="rightSidebarGroup__bodyTask">
                {tasks.map((task)=>(
                <div className='taskOuter'>
                <div className="taskUpper">
                    Name :-
                    <span>{task?.data?.name} </span>
                </div>
                <div className="taskUpper">
                    Task Given By :-
                    <span>{task?.data?.givenBy} </span>
                </div>
                <div className="taskUpper">
                    Due Date :-
                    <span>{task?.data?.Duedate ? task?.data?.Duedate:'Not set yet'} </span>
                </div>
                <div className="taskUpper">
                    <div className="taskUpperHead">
                        Task
                    </div>
                    <p>
                    {task?.data?.task}
                    </p>
                    <Stack spacing={2} direction="row">
                        <Button >{task?.data?.status}</Button>
                    </Stack>
                    </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default RightSidebarGroupTask
