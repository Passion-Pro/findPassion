import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import RightSidebarGroupTaskListEach from "./RightSidebarGroupTaskListEach";

function RightSidebarGroupTaskList() {
  const history = useHistory();
  const [{ groupMember, showTop }] = useStateValue();
  return (
    <>
      <div className="RightSidebarGroup">
        <div
          className={
            showTop
              ? "rightSidebarGroup__headerShow"
              : "rightSidebarGroup__header"
          }
        >
          <div className="rightSidebarGroup__headMoreTask">
            <ArrowBackRoundedIcon
              onClick={() => {
                history.push("/group"); 
              }}
            />
          </div>
          <div className="rightSidebarGroup__headName">Goallist</div>
          <div></div>
        </div>
        <div
          className={
            showTop
              ? "rightSidebarGroup__bodyTaskShow"
              : "rightSidebarGroup__bodyTask"
          }
        >
          <div className="rightsidebarGroupTaskList">
            {groupMember?.length > 0 ? (
              groupMember.map((data) => (
                <RightSidebarGroupTaskListEach data={data} />
              ))
            ) : (
              <div style={{display:'flex',justifyContent: 'center',height:"50vh",alignItems: 'center'}}>Give somone goal to see the list of given goal</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSidebarGroupTaskList;
