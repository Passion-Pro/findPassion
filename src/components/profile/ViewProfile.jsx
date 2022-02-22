import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import ProfilePage from "../ProfilePage/ProfilePage";
import "./ViewProfile.css";

function ViewProfile() {
  const { id } = useParams();
  const [{},dispatch] = useStateValue();

  useEffect(() =>{
      dispatch({
        type: actionTypes.SET_PATHNAMEF,
        pathnamef: "/viewprofile",
      });
  },[])
  return (
    <div className="viewprofile">
      <ProfilePage id={id} />
    </div>
  );
}

export default ViewProfile;
