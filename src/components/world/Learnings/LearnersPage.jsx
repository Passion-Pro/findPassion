import React , {useEffect, useState} from 'react'
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Member from "./Member";
import Avatar from "@mui/material/Avatar";
import { ArrowBack } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import db from '../../../firebase';



function LearnersPage() {
    const history = useHistory();
    const { learningId } = useParams();
    const [learningData, setLearningData] = useState([]);
    const[learners , setLearners] = useState([]);
    const[{user} , dispatch] = useStateValue();

    useEffect(() => {
      if(learningId) {

        db.collection("learnings")
        .doc(learningId)
        .onSnapshot((snapshot) => {
          setLearningData(snapshot.data());
        });


        db.collection("learnings")
        .doc(learningId)
        .collection("learners")
        .onSnapshot((snapshot) =>
          setLearners(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      }
    } , [learningId , user])

    return (
        <div>
           <Container>
           <div className="group_details">
            <div className="arrowBack_icon">
                <ArrowBack onClick = {e => history.goBack()}/>
            </div>
            <Avatar
              className="learningGroup_avatar"
              src={learningData?.learningImageUrl}
            />
            <p className="learning_info">Learning Node Js</p>
            <div className="members">
              <div className="learners">
                <p>{learners?.length} Learners</p>
              </div>
              {learners.map((learner) => (
                <Member learner={learner} learning = {learningData} 
                learningId = {learningId}
               />
              ))}
              
            </div>
          </div>
           </Container> 
        </div>
    )
};

const Container = styled.div`
 width : 100vw;
 max-height : 100vh;

 .learningGroup_avatar {
      margin-left: auto;
      margin-right: auto;
      width: 150px;
      height: 150px;
    }

    .learners {
      padding-left: 15px;
      p {
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }

    .learning_info {
      text-align: center;
      font-family: "Helvetica Neue";
      font-weight: 500;
      font-size: 20px;
      padding-bottom: 20px;
    }

    .members {
      border-top: 1px solid lightgray;
      overflow-y: scroll;
    }

    .members::-webkit-scrollbar {
      display: none;
    }

    .arrowBack_icon{
        margin-top : 10px;
        margin-left : 10px;
        font-size : 20px;
        color : gray;
    }
  

`;

export default LearnersPage
