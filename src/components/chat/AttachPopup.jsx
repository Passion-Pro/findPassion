import React , {useState , useEffect} from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function AttachPopup() {
    const[{openAttachPopup} , dispatch] = useStateValue();
    

    const closePopup = () => {
        dispatch({
            type : actionTypes.OPEN_ATTACH_POPUP,
            openAttachPopup : false
        })
    }

    return (
       <>
         {openAttachPopup === true && (
             <Container>
                <div className="attachPopup">
                  <div className="header">
                      <CloseIcon className="close_icon" onClick = {closePopup}/>
                  </div>
                  <div className="icons">
                     <div className="icon_detail">
                     <div className="icon image_icon">
                        <ImageIcon/>
                      </div>
                      <p>Attach</p>
                      <p>Image</p>
                     </div>
                     <div className="icon_detail">
                     <div className="icon video_icon">
                        <VideocamIcon/>
                      </div>
                      <p>Attach</p>
                      <p>Video</p>
                     </div>
                     <div className="icon_detail">
                     <div className="icon file_icon">
                        <InsertDriveFileIcon/>
                      </div>
                      <p>Attach</p>
                      <p>Pdf</p>
                     </div>
                  </div>
                </div>
             </Container>
            )}
       </>
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


  .attachPopup{
    background-color: #fff;
    width: 250px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px; 
  }

  .header{
      display : flex;
      justify-content : flex-end;
      margin-bottom : 10px;

      .close_icon {
      margin-right: 5px;
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }

  }

  .icons{
      display : flex;
      justify-content : space-around;

      p{
          font-size: 12px;
          margin-top : 0;
          margin-bottom : 0;
          text-align: center;
      }

      .icon{
          border : 1px solid gray;
          border-radius : 50%;
          padding : 10px;
          display : flex;
          margin-bottom : 10px;

          
          .MuiSvgIcon{
              margin : auto;
          }
      }

      .image_icon{
        background-color : #4684e0;

        &:hover {
            background-color : #84aff0;
            cursor : pointer;
        }
      }

      .video_icon{
          background-color : #3aca3a;

          &:hover {
              background-color : #98dd98;
              cursor : pointer;
          }
      }
      
      .file_icon{
          background-color : #fc6a08;

          &:hover {
              background-color : #f19150;
              cursor : pointer;
          }
      }
  }
`;

export default AttachPopup
