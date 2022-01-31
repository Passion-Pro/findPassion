import React, { useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import './RightSidebarGroupTaskListEach.css'

function RightSidebarGroupTaskListEach({ data }) {
    const [ {},dispatch] = useStateValue();
    const history = useHistory();

    return (
        <>
            <div className="RightSidebarGroupTaskListEach" onClick={() => {
                history.push(`/showalltask/${data?.id}`)
            }} style={{cursor:'pointer'}}>
                <div className="RightSidebarGroupTaskListEach__Name">
                    {data?.data?.name}
                </div>
                <div className="RightSidebarGroupTaskListEach__Info">
                    {data?.data?.statusDateDone ? "Last task done on " + data?.data?.statusDateDoing : data?.data?.statusDateDoing ? "Last  task started doing on " + data?.data?.statusDateDoing : data?.data?.status=='Deleted' ? "Last task deleted on " + data?.data?.date + " by you" : data?.data?.status ?"Last task given on "+data?.data?.date+' but not yet started':"No task given"}
                </div>
            </div>
        </>
    )
}

export default RightSidebarGroupTaskListEach;
