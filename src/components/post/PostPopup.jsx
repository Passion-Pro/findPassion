import React from 'react';
import landscape from './img/landscape.svg'
import portrait from './img/portrait.svg'
import regularPost from './img/regularPost.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close";

function PostPopup({setOpenPopup}) {
 
    const history=useHistory();
    const [{user, courseDiv  }, dispatch] =useStateValue();

    return (
        <Container>
            <div className="post_Popup">
                <div className="popup_header">
                   <CloseIcon className = "close_icon"
                    onClick = {() => {
                        setOpenPopup(false);
                    }}
                   />
                </div>
                <div className="post_options">
                <div className="regular_post" onClick={()=>history.push('/addpost')}>
                   <img src={regularPost} alt="" style={{color:"blue"}} />
                    Regular Post
                </div>
                <div className="regular_post" onClick={()=>history.push('/landspacepost')}>
                <img src={landscape} alt="" />
                    Landscape Post
                </div>
                <div className="regular_post" onClick={()=>history.push('/portraitpost')}>
                <img src={portrait} alt="" />
                    Portrait Post
                </div>
                </div>
            </div>

            
        </Container>
    )
};

const Container = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;
  align-items: center;

  .post_Popup{
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .popup_header{
      display: flex;
      justify-content: flex-end;
  }

  .close_icon {
      margin-right: 5px;
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }

  .post_options{
      display: flex;
      flex-direction : column;
      margin-top : 10px;
  }


  .regular_post{
      border : 1px solid lightgray;
      background-color : #d3d3d3;
      border-radius : 10px;
      padding : 10px;
      margin-bottom : 10px;
      
      img{
          margin-right : 10px;
      }

      &:hover {
          background-color : #6e6e6e;
          color : white;
          cursor : pointer;
      }
  }
`

export default PostPopup
