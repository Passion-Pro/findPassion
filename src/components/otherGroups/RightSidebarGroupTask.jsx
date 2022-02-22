import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import db from '../../firebase';
import { useParams } from 'react-router-dom';
import RightSidebarGroupTaskEach from './RightSidebarGroupTaskEach';

function RightSidebarGroupTask() {

    const history = useHistory();
    const [{ showTop, user, groupDetails, groupMemberDetails}] = useStateValue();
    const { id } = useParams();
    const [tasks, setTasks] = useState([])
    
    var today = new Date();
    var date = today.toLocaleString();

    useEffect(() => {
        if (groupDetails?.GroupId && user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails?.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember').doc(groupDetails?.GroupId + user?.email).collection('Tasks')
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
    }, [user,groupDetails?.GroupId]);

    return (
        <>
            {groupDetails && <div className='RightSidebarGroup'>
                <div className={showTop ? 'rightSidebarGroup__headerShow' : "rightSidebarGroup__header"}>
                    <div className="rightSidebarGroup__headMoreTask">
                        <ArrowBackRoundedIcon onClick={() => {
                            history.push(`/groupother/${id}`)
                        }} />
                    </div>
                    <div className="rightSidebarGroup__headName">
                        Your Goals
                    </div>
                    <div></div>
                </div>
                {groupMemberDetails?.task ?
            <div className={showTop ? 'rightSidebarGroup__bodyTasklistShow' : "rightSidebarGroup__bodylistTask"}>
            {tasks.map((task,serial) => (
                <RightSidebarGroupTaskEach tasks={tasks.length} task={task} serial={serial}/>
            ))}
        </div>
             :
                    <div style={{ display: 'flex', width: '100%', height: "100%", alignItems: 'center', justifyContent: "center" }}>
                        No goal given
                    </div>
                }
            </div>}
        </>
    )
}

export default RightSidebarGroupTask
