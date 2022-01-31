import React from 'react';
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";

function PartnerName({data , name ,setAddPartner}) {
const[{user} , dispatch] = useStateValue();

  return (
  <Container onClick = {() => {
    if(data){
        dispatch({
            type : actionTypes.ADD_PARTNER_INFO,
            partnerInfo : data
        })
    }else if(name){
        dispatch({
            type : actionTypes.ADD_PARTNER_INFO,
            partnerInfo : {
                data : {
                    name : name
                }
            }
        })
    }

    setAddPartner(false);

  }}>
    {data && (<>
    <Avatar className = "partner_avatar" src = {data?.data?.profilePhotoUrl}/>
    <div className="partnername_info">
    <p className = "partnername_name">{data?.data?.name}</p>
        <p>{data?.data?.email}</p>
    </div>
    </>)}
    {name && (
        <p>{name}</p>
    )}
  </Container>
  )
};

const Container = styled.div`
 display : flex;
 width : 80%;
 margin-left : 30px;
 margin-top : 5px;
 border : 1px solid lightgray;
 padding-left : 10px;
 padding-right : 10px;
 border-radius : 5px;
 padding-top : 5px;
 padding-bottom : 5px;
 margin-bottom : 5px;

 &:hover {
     cursor: pointer;
     background-color : #ebebeb;
 }

 .partner_avatar{
     margin-right : 10px;
     width : 50px;
     height : 50px;
 }



 .partnername_info{
     display : flex;
     flex-direction : column;

     p{
        margin-top : 0;
        margin-bottom : 0;
     }
 }

 .partnername_name{
     margin-bottom : 3px !important;
 }

`;

export default PartnerName;
