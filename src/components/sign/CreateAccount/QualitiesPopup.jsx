import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import CloseIcon from "@mui/icons-material/Close";
import Quality from "./Quality";
import SelectedQuality from "./SelectedQuality";
import db from "../../../firebase";

function QualitiesPopup() {
  const [{ openQualitiesPopup, selectedQualities }, dispatch] = useStateValue();
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    db.collection("qualities").onSnapshot((snapshot) =>
      setQualities(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    );
  }, []);

  const closePopup = () => {
    dispatch({
      type: actionTypes.OPEN_QUALITIES_POPUP,
      openQualitiesPopup: false,
    });
  };

  const done = () => {
    dispatch({
        type: actionTypes.OPEN_QUALITIES_POPUP,
        openQualitiesPopup: false,
      });
  }
  return (
    <>
      {openQualitiesPopup === true && (
        <Container>
          <div className="qualitiesPopup">
            <div className="qualitiesPopup_header">
              <CloseIcon className="close_icon" onClick={closePopup} />
            </div>
            {selectedQualities?.length > 0 && (
              <p className="your_qualities">Your qualities:</p>
            )}
            <div className="qualities_selected">
              {console.log("Selected Qualities are", selectedQualities)}
              {selectedQualities.map((quality) => (
                <SelectedQuality quality={quality} />
              ))}
            </div>
            <p className="select_qualities">
              Select Qualities that describe yourself
            </p>
            <div className="total_qualites">
              {qualities.map((quality) => (
                  <Quality quality = {quality?.data?.name} />
              ))}
            </div>
            <div className="done_button">
                <button onClick = {done}>Done</button>
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

  .qualitiesPopup {
    background-color: #fff;
    width: 450px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .qualitiesPopup_header {
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    margin-right: 5px;
    font-size: 27px;
    &:hover {
      color: #6d6969;
      cursor: pointer;
    }
  }

  .qualities_selected {
    display: flex;
    flex-wrap: wrap;
  }

  .select_qualities {
    margin-bottom: 7px;
  }

  .total_qualites {
    display: flex;
    flex-wrap: wrap;
  }

  .your_qualities {
    margin-bottom: 7px;
  }

  .done_button{
      display: flex;
      justify-content: flex-end;
      margin-right : 10px;
      margin-bottom : 5px;

      button{
          border-radius : 20px;
          border : 0;
          width : 60px;
          padding : 10px;
          background-color: #00c3ff;

          &:hover {
              cursor: pointer;
              background-color : #55d5fc;
          }
      }
  }
`;
export default QualitiesPopup;
