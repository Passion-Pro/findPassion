import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import SidebarGroup from "./SidebarGroup";
import RightSidebarGroup from "./RightSidebarGroup";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useStateValue } from "../../StateProvider";
import RightSidebarGroupTask from "./RightSidebarGroupTask";
import GroupExpandMore from "./GroupExpandMore";
import GroupTopBody from "./GroupTopBody";
import { actionTypes } from "../../reducer";

function GroupTask() {
  const [{ userInfo, user, showTop, showLeftSidebarGroup }, dispatch] =
    useStateValue();
  const [showLeftdiv, setShowLeftdiv] = useState(true);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/grouptaskother",
    });
  }, []);

  return (
    <div className="group">
      {showTop && <GroupTopBody />}
      <div className={showTop ? "group__body" : "group__bodyTwo"}>
        <div className="group__lower">
          {
            <div className="group__lower__leftSidebar">
              <SidebarGroup />
            </div>
          }
          {
            <div className="group__lower__rightSidebar">
              <RightSidebarGroupTask />
            </div>
          }
        </div>
        <div className="group__lowerForMobile">
          {showLeftSidebarGroup ? (
            <div className="group__lower__leftSidebarForMobile">
              <SidebarGroup />
            </div>
          ) : (
            <div className="group__lower__rightSidebarForMobile">
              <RightSidebarGroupTask />
            </div>
          )}
        </div>
      </div>
      <GroupExpandMore />
    </div>
  );
}

export default GroupTask;
