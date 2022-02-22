import React, { useState } from 'react';
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useStateValue } from '../../StateProvider';
import db from '../../firebase';
import CloseIcon from "@mui/icons-material/Close";

function ShowAllTaskEach({ task, serial }) {
    const [{ user, groupMemberDetails}] = useStateValue();
    const [showAddTask, setshowAddTask] = useState(false);
    
    var today = new Date();
    var date = today.toLocaleString();

    const deleteTask = () => {
        if (user && groupMemberDetails.email) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(user?.uid+groupMemberDetails.email).update({
                task: task,
                date: date,
                givenBy: user?.email,
                status: 'Deleted',
                statusDateDoing: null,
                statusDateDone: null,
                totalTask: groupMemberDetails?.totalTask - 1,
            }).then(() => {
                db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'groupmember').collection('GroupMember').doc(user?.uid+groupMemberDetails.email).collection('Tasks').doc(task?.id).delete()
            })
        }else{
            alert('Something went wrong!')
        }
    }
   
    return (
        <>{showAddTask && (
            <Container>
                <div className="addLearning" >
                    <div className="add_learning_header">
                        <CloseIcon className="close_icon"
                            onClick={() => {
                                setshowAddTask(false)
                            }}
                        />
                    </div>
                    <div className="group_photo">
                        <div className="learning_detail">
                            Delete Goal <br/>
                           <b style={{padding:0}}>Status</b>{task?.data?.status != "pending" ? <>  {groupMemberDetails?.data?.name} {task?.data?.status != 'Done' && 'started '}{task?.data?.status} the task on {task?.data?.statusDateDone ? task?.data?.statusDateDone : task?.data?.statusDateDoing ? task?.data?.statusDateDoing : "You have't set yet"}</> : "Pending"}
                        </div>
                        <div className="start_button">
                            <button onClick={deleteTask} >Yes</button>
                            <button onClick={() => {
                                setshowAddTask(false)
                            }} >No</button>
                        </div>
                    </div>
                </div>
            </Container>
        )}
            <div className='taskOuter' >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 15px 0 15px', alignItems: 'center', fontWeight: '600' }}>
                    <div>
                        {groupMemberDetails?.timestamp < task?.data?.timestamp ? task?.data?.totalTask : 'Old tasks'}
                    </div>
                    <div title='Delete the assignment'>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => {
                            setshowAddTask(true)
                        }}>
                            Delete
                        </Button>
                    </div>
                </div>
                <div className="taskUpper">
                    <div style={{ display: 'flex', fontSize: '15px', padding: '0 0 8px 0' }}>
                        Due Date :-
                        <span>{task?.data?.date ? task?.data?.Duedate : 'Not set yet'} </span>
                    </div>
                    <div style={{ display: 'flex', fontSize: '15px', padding: '0 0 8px 0', color: '#585252' }}>
                        Given on {task?.data?.date}
                    </div>
                </div>
                <div className="taskUpper">
                    <div className="taskUpperHead">
                        Goal
                    </div>
                    <p>
                        {task?.data?.task}
                    </p>
                <div title='Status of assignment given by member'>
                    <Stack spacing={2} direction="row">
                        <Button >{task?.data?.status != "pending" ? <>  {groupMemberDetails?.data?.name} {task?.data?.status != 'Done' && 'started '}{task?.data?.status} the task on {task?.data?.statusDateDone ? task?.data?.statusDateDone : task?.data?.statusDateDoing ? task?.data?.statusDateDoing : "You have't set yet"}</> : "Pending"}</Button>
                    </Stack>
                </div>
                </div>
            </div>
        </>
    )
}

export default ShowAllTaskEach;



const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;
  z-index:101;

  .addLearning {
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    @media (max-width: 500px) {
      width: 85vw;
    }

    .add_learning_header {
      display: flex;
      justify-content: flex-end;

      .close_icon {
        margin-right: 5px;
        &:hover {
          color: #6d6969;
          cursor: pointer;
        }
      }
    }

    .group_photo {
      display: flex;
      justify-content: center;
      align-items:center;
      flex-direction: column;
      width:100%;
      .group_photo_Image{
          display:flex;
          flex-direction: column;
          align-items:center !important;
          justify-content:center;
          padding:4px 0 8px 0 ;
      }
      .group_photo_avatar {
        width: 150px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
      }

      label {
        p {
          color: #006eff;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .learning_detail {
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        width: 100%;
    }
  }

  .start_button {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    width: 95%;

    button {
      width: 80px;
      padding: 7px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0044ff;
      color: white;
      margin: 0 6px;

      &:hover {
        cursor: pointer;
        background-color: #2e66ff;
      }
    }
  }
`;