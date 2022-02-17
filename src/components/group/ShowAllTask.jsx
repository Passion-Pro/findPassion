import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './ShowAllTask.css';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ShowAllTaskEach from './ShowAllTaskEach';
import { actionTypes } from '../../reducer';

function ShowAllTask() {
    const [{ user, showTop, groupMemberDetails }, dispatch] = useStateValue();
    const { id } = useParams();
    const [tasks, setTasks] = useState([])
    const history = useHistory();
    useEffect(() => {
        if (id && user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user?.uid + 'groupmember').collection('GroupMember').doc(id).collection('Tasks')
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

    useEffect(() => {
        if (id && user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user?.email).doc(user?.uid + 'groupmember').collection('GroupMember').doc(id).onSnapshot((snapshot) => {
                console.log("////;;;;//;;/;/; ",snapshot?.data());
            dispatch({
                type: actionTypes.SET_GROUP_MEMBERDETAILS,
                groupMemberDetails: snapshot.data(),
            })
        })
        }
    }, [id,user]);

    return (
        <>
            <div className='RightSidebarGroup' >
                <div className={showTop ? 'rightSidebarGroup__headerShow' : "rightSidebarGroup__header"}>
                    <div className="rightSidebarGroup__headMoreTask" title='back to task list of member'>
                        <ArrowBackRoundedIcon onClick={() => {
                            history.push('/grouptasklist')
                        }} />
                    </div>
                    <div className="rightSidebarGroup__headName">
                        {groupMemberDetails?.name}'s all task
                    </div>
                    <div></div>
                </div>
                <div className={showTop ? 'rightSidebarGroup__bodyTasklistShow' : "rightSidebarGroup__bodylistTask"}>
                    {tasks.map((task, serial) => (
                        <ShowAllTaskEach task={task} serial={serial} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ShowAllTask;
