import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import db from "../../firebase";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Request from "./Request";

function RequestsPage() {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .collection("learnRequests")
        .onSnapshot((snapshot) =>
          setRequests(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        );
    }
  }, [user?.uid]);

  return (
    <div>
      <Container>
        <div className="requestsPage_header">
          <ArrowBackIcon
            className="back_icon"
            onClick={(e) => history.goBack()}
          />
          <div className="requestsPage_header_title">
            <p>Requests</p>
          </div>
        </div>
        {requests?.length > 0 ?(<div className="requests">
            {requests.map((request) => (
                <Request request = {request}/>
            ))}
        </div>):(
            <p className = "no_requests">No Requests</p>
        )}
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  .requestsPage_header {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid lightgray;

    .back_icon {
      &:hover {
        cursor: pointer;
        color: #494949;
      }
    }
  }

  .requestsPage_header_title {
    display: flex;
    justify-content: center;
    flex: 1;

    p {
      margin-top: 0;
      margin-bottom: 0px;
    }
  }

  .requests {
    flex: 1;
    background-image: url("https://itxitpro.com/front/img/web-development-services.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
  }

  .requests::-webkit-scrollbar {
    display: none;
  }

  .no_requests{
      text-align: center;
      width: 100%;
      margin-top : 5px;
      font-size : 17px;
  }
`;

export default RequestsPage;
