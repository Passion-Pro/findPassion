import React , {useState , useEffect} from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import PassionName from "./PassionName";

function PassionPopup() {
  const [{ openPassionPopup }, dispatch] = useStateValue();
  const[input , setInput] = useState("")

  const close_popup = () => {
    dispatch({
      type: actionTypes.OPEN_PASSION_POPUP,
      openPassionPopup: false,
    });

    setInput("")
  };

  const add_passion = () => {
       if(input !== ""){
        
        //add it to database
        dispatch({
            type : actionTypes.SET_PASSION,
            passion : input
        })

        dispatch({
            type : actionTypes.OPEN_PASSION_POPUP,
            passionPopup : false
        })

       }
  }
  return (
    <>
      {openPassionPopup === true && (
        <Container>
          <div className="passionPopup">
            <div className="passionPopup_header">
              <p>Select your passion:</p>
              <CloseIcon className="close_icon" onClick={close_popup} />
            </div>
            <div className="passion_list">
              <PassionName name="Web Development" />
              <PassionName name="App Development" />
              <PassionName name="Don't know" />
            </div>
            <div className="add_passion">
              <p>Add your passion</p>
              <input type="text" placeholder = "Enter your passion" value = {input} onChange={e => setInput(e.target.value)} />
              <div className="add_passion_button">
                <button onClick = {add_passion}>Add</button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

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

  .passionPopup {
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    .passionPopup_header{
      display: flex;
      width: 100%;
      p {
        margin-bottom: 10px;
        margin-top: 0;
        width: 100%;
      }
    }

    .close_icon {
      margin-right: 5px;
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }

    .add_passion {
      border: 1px solid lightgray;
      padding: 5px;
      border-radius: 5px;
      background-color: white;

      p {
        margin-bottom: 2px;
        margin-top: 5px;
      }

      .add_passion_button{
          display : flex;
          justify-content: flex-end;
          width : 100%;
          button{
            width : 60px;
            background-color : #479dee;
            border-radius : 20px;
            color : white;
            border : 1px solid lightgray; 
            height : 30px;

            &:hover {
                cursor : pointer;
                background-color : #61a9ec
            }
          }
      }

      input{
              border-radius : 5px;
              margin-top : 5px;
              padding-top : 3px;
              padding-bottom : 3px;
              padding-left : 4px;
              padding-right : 5px;
          }
    }
  }
`;

export default PassionPopup;
