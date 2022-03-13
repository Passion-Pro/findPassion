import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import db from "../../../firebase";
import {useHistory} from "react-router-dom"


function PartnerCard({partner}) {
  const [{ openStoryPopup, startJourney, journey, userInfo, user }, dispatch] =
    useStateValue();
    const[profilePhotoUrl, setProfilePhotoUrl] = useState()
    const history = useHistory();

    useEffect(() => {
        if(partner?.data?.email){
          db.collection("users")
            .where("email", "==", partner?.data?.email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setProfilePhotoUrl(doc.data().profilePhotoUrl);

              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
    } , [partner?.data?.email]);

    const goToProfilePage = (e) => {
      e.preventDefault();
  
      db.collection("users")
              .where("email", "==", partner?.data?.email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  
                  history.push(`/viewProfile/${doc.id}`)
                
  
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
    }


  return (
    <Container
     onClick={goToProfilePage}
    >
      <div className="partner_info"
       style = {{
        backgroundImage: `url(${profilePhotoUrl})`, 
       }}
      >
        <p>{partner?.data?.name}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 160px;
  margin-right : 20px;
  margin-bottom : 20px;

  .partner_info{
  height: 150px;
  border: 1px solid gray;
  border-radius: 10px;
   background-position : center;
   background-repeat : no-repeat;
   background-size : cover;
   display : flex;
   justify-content : flex-end;
   flex-direction : column;
   background-color : black;

   &:hover {
    cursor : pointer;
    border : 1px solid white;
    border-radius: 10px;
  }
 

   p{
     color : white;
     margin-top : 0;
     margin-bottom : 5px;
     text-align : center;
     font-size : 16px;
   }
  }
`;

export default PartnerCard;
