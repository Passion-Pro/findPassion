import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";
import PostCard from "../../post/PostCard";
import "../../home/Home.css"
import { PhotoCamera } from "@mui/icons-material";
import PostPopup from "../../post/PostPopup";

function PostsPage() {
  const history = useHistory();
  const [{ userInfo, user,searchInput,searchInputPassion },dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const[openPopup , setOpenPopup] = useState(false);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/posts",
    });
  }, []);
  useEffect(() => {
   if(searchInput==''){
     history.push('/all_profile')
   }
  }, []);


  useEffect(() => {
    if (searchInput) {
      db.collection(searchInputPassion ? searchInputPassion:userInfo?.passion)
        .doc('Csb15iOnGedmpceiQOhX')
        .collection("Posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        )
    }
  }, [userInfo])

  return (
    <Container>
       <div >
        <div className="options_buttons">
        <button className="stories_button"
            onClick={(e) => history.push("/peopleforsearch")}
            >People</button>
            <button className="stories_button"
            onClick={(e) => history.push("/worldforsearch")}
            style = {{
              marginLeft : '10px'
            }}
            >Learnings</button>
            <button className="learnings_button"
            style = {{
              marginLeft : '10px'
            }}
            onClick={(e) => history.push("/postforsearch")}
          >
            Posts
          </button>
        </div>
      </div>
      <div className="postBody">
          {<div className="recommendPosts">
            {posts.length>0 ? posts.map((data) => (
              <PostCard data={data} Nodata={true}/>
            )):<PostCard  Nodata={false}/>}
          </div>}
        </div>
       {openPopup && ( <PostPopup setOpenPopup = {setOpenPopup}/>)}
    </Container>
  )
};

const Container  = styled.div`
  width: 100vw;
  flex: 1;
  min-height: 90vh;
  height : fit-content;
  display: flex;
  flex-direction: column;
  /* background-image: url("https://itxitpro.com/front/img/web-development-services.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color : #fff;

  .options_header {
    display: flex;
    padding: 20px;
    padding-bottom: 0;
    justify-content : space-between;
    /* width : 100%; */

    @media (max-width: 500px){
      flex-direction : column;
    }

    .options_buttons {
      display: flex;

     @media (max-width: 500px){
       margin-bottom : 30px;
     }

    }

    .learnings_button {
      margin-right: 10px;
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #252525;
      color: white;
      height : 40px;
    }

    .stories_button {
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      height : 40px;
      margin-left: 10px ;

      &:hover {
        cursor: pointer;
        background-color: #dfdede;
      }
    }
  }

  .add_learning_button {
    display: flex;
    margin-right: 10px;

    button {
     display : flex;
      width: 180px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #6868fa;
      color: white;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      justify-content: center;
      text-align: center;

      @media (max-width: 500px){
       width : 85vw;
       margin-bottom: 0px;
     }

      &:hover {
        cursor: pointer;
        background-color: #9595ff;
      }
    }
    @media (max-width: 800px){
       display: none;
     }
  }


  .postBody{
      display : flex;
      flex-direction: column;
      margin-left : auto;
      margin-right : auto;
  }


`

export default PostsPage