// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useStateValue } from "../../StateProvider";
// import { actionTypes } from "../../reducer";
// import Learning from "./Learnings/Learning";
// import { useHistory } from "react-router-dom";
// import NewLearningPopup from "./Learnings/NewLearningPopup";
// import db from "../../firebase";

// function WorldPage() {
//   const history = useHistory();
//   const [{ user, userInfo, openNewLearningPopup }, dispatch] = useStateValue();
//   const [myLearnings, setMyLearnings] = useState([]);
//   const [allLearnings, setAllLearnings] = useState([]);
//   const [learnings, setLearnings] = useState([]);
//   const [joinedLearnings, setJoinedLearnings] = useState([]);
//   const [learnings1, setLearnings1] = useState([]);
//   const [learnings2, setLearnings2] = useState([]);
//   const [learnings3, setLearnings3] = useState([]);
//   const [learnings4, setLearnings4] = useState([]);
//   const [learnings5, setLearnings5] = useState([]);
//   const [learnings6, setLearnings6] = useState([]);
//   const [learnings7, setLearnings7] = useState([]);
//   const [learnings8, setLearnings8] = useState([]);
//   const [learnings9, setLearnings9] = useState([]);
//   const [learnings10, setLearnings10] = useState([]);
//   const [learnings11, setLearnings11] = useState([]);
//   const [learnings12, setLearnings12] = useState([]);
//   const [learnings13, setLearnings13] = useState([]);
//   const [newLearnings, setNewLearnings] = useState([]);
//   const [x, setX] = useState(0);
//   const [jlLength, setJlLength] = useState();
//   const [tags, setTags] = useState([]);
//   const [passions, setPassions] = useState([]);
//   const [z, setZ] = useState(0);

//   useEffect(() => {
//     setLearnings([]);
//     setAllLearnings([]);
//     setNewLearnings([]);
//     setJoinedLearnings([]);
//   }, []);

//   useEffect(() => {
//     dispatch({
//       type: actionTypes.SET_PATHNAMEF,
//       pathnamef: "/world",
//     });
//   }, []);

//   useEffect(() => {
// db.collection("learnings").onSnapshot((snapshot) => {
//   setAllLearnings(
//     snapshot.docs.map((doc) => ({
//       data: doc.data(),
//       id: doc.id,
//     }))
//   );
//       setNewLearnings(
//         snapshot.docs.map((doc) => ({
//           data: doc.data(),
//           id: doc.id,
//         }))
//       );
//     });

//     // db.collection("learnings").onSnapshot((snapshot) =>
//     //   setNewLearnings(
//     //     snapshot.docs.map((doc) => ({
//     //       data: doc.data(),
//     //       id: doc.id,
//     //     }))
//     //   )
//     // );
//   }, [openNewLearningPopup]);

//   useEffect(() => {
//     if (user?.uid) {
//       db.collection("users")
//         .doc(user?.uid)
//         .onSnapshot((snapshot) => {
//           dispatch({
//             type: actionTypes.SET_USER_INFO,
//             userInfo: snapshot.data(),
//           });
//         });

//       db.collection("passions").onSnapshot((snapshot) => {
//         setPassions(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           }))
//         );
//       });

// db.collection("users")
//   .doc(user?.uid)
//   .collection("myJoinedLearnings")
//   .onSnapshot((snapshot) => {
//     // console.log("Joined Learnings are", snapshot.docs?.length);
//     setJlLength(snapshot.docs?.length);
//     setJoinedLearnings(
//       snapshot.docs.map((doc) => ({
//         data: doc.data(),
//         id: doc.id,
//       }))
//     );
//   });
//     }

//     // console.log("My Learnings is ", myLearnings);
//   }, [user?.uid]);

//   useEffect(() => {
//     if (passions?.length > 0) {
//       for (let i = 0; i < passions?.length; i++) {
//         db.collection("passions")
//           .doc(passions[i].id)
//           .collection("learningTags")
//           .onSnapshot((snapshot) =>
//             snapshot.docs.map((doc) => {
//               tags.push(doc.data());
//             })
//           );
//       }
//     }
//   }, [passions, user]);

//   // useEffect(() => {
//   //   if (allLearnings?.length > 0 && joinedLearnings?.length > 0) {
//   //     for (let i = 0; i < allLearnings?.length; i++) {
//   //       for (let j = 0; j < joinedLearnings?.length; j++) {
//   //         if (
//   //           newLearnings[i]?.data?.learning ===
//   //           joinedLearnings[j]?.data?.learning?.data?.learning
//   //         ) {
//   //           newLearnings.splice(i, 1);
//   //           console.log("Spliced", newLearnings);
//   //         }
//   //       }
//   //     }
//   //   }
//   // }, [user, joinedLearnings?.length]);

//   // useEffect(() => {
//   //   if (jlLength === 0 && user?.uid && allLearnings?.length) {
//   //     setLearnings(allLearnings);
//   //     setZ("2");
//   //   }
//   // }, [jlLength, user?.uid]);

//   // useEffect(() => {
//   //   if (
//   //     jlLength > 0 &&
//   //     newLearnings?.length > 0 &&
//   //     allLearnings?.length > 0 &&
//   //     joinedLearnings?.length > 0
//   //   ) {
//   //     console.log("STEP 2 Achieved");
//   //     console.log("NL is ", newLearnings?.length);
//   //     console.log("AL is ", allLearnings?.length);
//   //     console.log("JL is ", joinedLearnings?.length);
//   //     if (
//   //       newLearnings?.length ===
//   //       allLearnings?.length - joinedLearnings?.length
//   //     ) {
//   //       setLearnings(newLearnings);
//   //       setZ("2");
//   //     }
//   //   }
//   // }, [joinedLearnings?.length, jlLength, openNewLearningPopup]);

//   // useEffect(() => {
//   //   // console.log("All Learnings Length is ", allLearnings?.length);
//   //   // console.log("Joined Learnings Length is ", joinedLearnings?.length);
//   //   // console.log("Learnings Length is", learnings?.length);
//   //   if (
//   //     (learnings?.length > 0 &&
//   //       userInfo?.passion &&
//   //       userInfo?.experience &&
//   //       newLearnings?.length > 0 &&
//   //       jlLength > 0 &&
//   //       learnings1?.length === 0 &&
//   //       learnings2?.length === 0 &&
//   //       learnings3?.length === 0 &&
//   //       learnings4?.length === 0 &&
//   //       learnings5?.length === 0 &&
//   //       learnings6?.length === 0 &&
//   //       learnings7?.length === 0 &&
//   //       learnings8?.length === 0 &&
//   //       learnings9?.length === 0 &&
//   //       learnings10?.length === 0 &&
//   //       learnings11?.length === 0 &&
//   //       learnings12?.length === 0 &&
//   //       learnings13?.length === 0) ||
//   //     (learnings?.length > 0 &&
//   //       userInfo?.passion &&
//   //       userInfo?.experience &&
//   //       jlLength === 0)
//   //   ) {
//   //     console.log("OK");
//   //     for (let i = 0; i < learnings?.length; i++) {
//   //       // console.log("Ran");
//   //       // console.log(learnings[i]?.data?.started_by?.email);
//   //       // console.log(user?.email);
//   //       if (learnings[i]?.data?.started_by?.email !== user?.email) {
//   //         setX(1);
//   //         if (
//   //           learnings[i]?.data?.started_by?.passion === userInfo?.passion &&
//   //           learnings[i]?.data?.started_by?.experience === userInfo?.experience
//   //         ) {
//   //           console.log("First Cases");
//   //           learnings1.push(learnings[i]);
//   //           console.log("Learnings 1 are", learnings1);
//   //         } else if (
//   //           learnings[i]?.data?.started_by?.passion === userInfo?.passion &&
//   //           learnings[i]?.data?.started_by?.experience !== userInfo?.experience
//   //         ) {
//   //           const z = Math.abs(
//   //             learnings[i]?.data?.started_by?.experience - userInfo?.experience
//   //           );
//   //           if (z === 0) {
//   //             learnings2.push(learnings[i]);
//   //           } else if (z === 1) {
//   //             learnings3.push(learnings[i]);
//   //           } else if (z === 2) {
//   //             learnings4.push(learnings[i]);
//   //           } else if (z === 3) {
//   //             learnings5.push(learnings[i]);
//   //           } else if (z === 4) {
//   //             learnings6.push(learnings[i]);
//   //           } else if (z === 5) {
//   //             learnings7.push(learnings[i]);
//   //           }
//   //         } else if (
//   //           learnings[i]?.data?.started_by?.passion !== userInfo?.passion
//   //         ) {
//   //           if (learnings[i]?.data?.started_by?.experience === 0) {
//   //             learnings8.push(learnings[i]);
//   //           } else if (learnings[i]?.data?.started_by?.experience === 1) {
//   //             learnings9.push(learnings[i]);
//   //           } else if (learnings[i]?.data?.started_by?.experience === 2) {
//   //             learnings10.push(learnings[i]);
//   //           } else if (learnings[i]?.data?.started_by?.experience === 3) {
//   //             learnings11.push(learnings[i]);
//   //           } else if (learnings[i]?.data?.started_by?.experience === 4) {
//   //             learnings12.push(learnings[i]);
//   //           } else if (learnings[i]?.data?.started_by?.experience === 5) {
//   //             learnings13.push(learnings[i]);
//   //           }
//   //         }
//   //       }
//   //     }
//   //   }
//   // }, [learnings?.length, userInfo?.passion, userInfo?.experience, user]);

// const add_learning = () => {
//   dispatch({
//     type: actionTypes.OPEN_NEW_LEARNING_POPUP,
//     openNewLearningPopup: true,
//   });
// };

//   return (
// <Container>
//   <div className="passion_logo">
//     {/* <div className="passion_title">
//       <p>WEB DEVLOPMENT</p>
//       </div> */}
//     {/* <div className="add_learning">
//         <button onClick={add_learning}>Start learning together 🚀</button>
//       </div> */}
//   </div>
//   <p
//     style={{
//       display: "none",
//     }}
//   >
//     {z}
//   </p>
//   <div className="options_header">
//     <div className="options_buttons">
//       <button className="learnings_button">Learnings</button>
//       <button
//         className="stories_button"
//         onClick={(e) => history.push("/stories")}
//       >
//         Journeys
//       </button>
//       <button
//         className="stories_button"
//         style={{
//           marginLeft: "20px",
//         }}
//         onClick={(e) => history.push("/posts")}
//       >
//         Posts
//       </button>
//     </div>

//     <div className="add_learning_button">
//       <button onClick={add_learning}>Start learning together 🚀</button>
//     </div>
//   </div>
//   <h1>Mere learning</h1>
//   {learnings.map((learning) => (
//     <>
//       {learning.data.started_by.email === userInfo.email && (
//         <Learning learning={learning} type="my" />
//       )}
//     </>
//   ))}
//   <h1>Joined learning</h1>
//   {joinedLearnings.map((learning) => (
//     <>
//       {/* {learning.data.started_by.email === userInfo.email && ( */}
//         <Learning learning={learning} type="joined" />
//       {/* )} */}
//     </>
//   ))}
//   {/* {x === 1 && learnings?.length > 0 && (
//     <div className="my_learnings">
//       <p className="my_learnings_title">My Learnings</p>
//       <div className="my_learnings_learnings">
//         {learnings.map((learning) => (
//           <>
//             {learning.data.started_by.email === userInfo.email && (
//               <Learning learning={learning} type="my" />
//             )}
//           </>
//         ))}
//         {joinedLearnings.map((learning) => (
//           <Learning
//             learning={learning?.data?.learning}
//             type="joined"
//             learnings={allLearnings}
//           />
//         ))}
//       </div>
//     </div>
//   )} */}
//   {/* {x === 1 && learnings?.length > 0 && userInfo?.passion !== "Don't  know" && (
//     <div className="all_learnings">
//       {learnings1.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}

//       {learnings2.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings3.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings4.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings5.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings6.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings7.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings8.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings9.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings10.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings11.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//       {learnings12.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}

//       {learnings13.map((learning) => (
//         <Learning learning={learning} type="all" />
//       ))}
//     </div>
//   )} */}
//   {/* {userInfo?.passion === "Don't know" && (
//     <div className="all_learnings">
//       {allLearnings.map(({ learning }) => (
//         <Learning learning={learning} type="all" />
//       ))}
//     </div>
//   )} */}
//   <NewLearningPopup tags={tags} />
// </Container>
//   );
// }

// const Container = styled.div`
//   width: 100vw;
//   flex: 1;
//   min-height: 90vh;
//   height: fit-content;
//   display: flex;
//   flex-direction: column;
//   /* background-image: url("https://itxitpro.com/front/img/web-development-services.jpg"); */
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   background-color: #003663;

//   @media (max-width: 700px) {
//     margin-bottom: 50px;
//   }

//   .passion_logo {
//     /* height: 35vh; */
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
//     background-position: center;

//     .passion_title {
//       flex: 1;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       p {
//         color: white;
//         font-size: 30px;
//         font-weight: 500;
//         letter-spacing: 2px;
//       }
//     }
//   }

//   .options_header {
//     display: flex;
//     padding: 20px;
//     padding-bottom: 0;
//     justify-content: space-between;
//     /* width : 100%; */

//     @media (max-width: 500px) {
//       flex-direction: column;
//     }

//     .options_buttons {
//       display: flex;

//       @media (max-width: 500px) {
//         margin-bottom: 30px;
//       }
//     }

//     .learnings_button {
//       margin-right: 20px;
//       width: 100px;
//       padding-top: 10px;
//       padding-bottom: 10px;
//       border-radius: 20px;
//       border: 0;
//       background-color: #252525;
//       color: white;
//       height: 40px;
//     }

//     .stories_button {
//       width: 100px;
//       padding-top: 10px;
//       padding-bottom: 10px;
//       border-radius: 20px;
//       border: 0;
//       height: 40px;

//       &:hover {
//         cursor: pointer;
//         background-color: #dfdede;
//       }
//     }
//   }

//   .add_learning_button {
//     display: flex;
//     margin-right: 10px;

//     button {
//       width: 180px;
//       padding-top: 10px;
//       padding-bottom: 10px;
//       border-radius: 20px;
//       border: 0;
//       background-color: #6868fa;
//       color: white;
//       box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
//       margin-bottom: 20px;

//       @media (max-width: 500px) {
//         width: 85vw;
//         margin-bottom: 0px;
//       }

//       &:hover {
//         cursor: pointer;
//         background-color: #9595ff;
//       }
//     }
//   }

//   .learnings {
//     display: flex;
//     flex-direction: column;
//     overflow-y: scroll;
//   }

//   .learnings::-webkit-scrollbar {
//     display: none;
//   }

//   .my_learnings {
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
//     padding-left: 30px;
//     padding-right: 40px;

//     @media (max-width: 500px) {
//       padding-left: 10px;
//       padding-right: 0px;
//       justify-content: flex-start;
//       padding-top: 0px;
//     }
//   }

//   .my_learnings_learnings {
//     display: flex;
//     /* overflow-x : scroll;
//     width : 100vw; */
//     flex-wrap: wrap;
//   }

//   .all_learnings {
//     display: flex;
//     flex-wrap: wrap;
//     padding: 20px;
//     padding-left: 30px;
//     padding-right: 40px;

//     @media (max-width: 500px) {
//       padding-left: 10px;
//       padding-right: 0px;
//       justify-content: flex-start;
//     }
//   }

//   .my_learnings_title {
//     color: white;
//     padding-left: 10px;
//   }
// `;

// export default WorldPage;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import Learning from "./Learnings/Learning";
import { useHistory } from "react-router-dom";
import NewLearningPopup from "./Learnings/NewLearningPopup";
import db from "../../firebase";

function WorldPage() {
  const [learning, setLearning] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [joinedLearnings, setJoinedLearnings] = useState([]);

  const add_learning = () => {
    dispatch({
      type: actionTypes.OPEN_NEW_LEARNING_POPUP,
      openNewLearningPopup: true,
    });
  };
  useEffect(() => {
    if (user?.uid) {
      db.collection("learnings").onSnapshot((snapshot) => {
        setLearning(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
      });
      db.collection("users")
        .doc(user?.uid)
        .collection("myJoinedLearnings")
        .onSnapshot((snapshot) => {
          setJoinedLearnings(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          );
        });
    }
  }, [user]);

  const history = useHistory();

  return (
    <Container>
      {/* <div className="passion_logo">
        <div className="passion_title">
          <p>WEB DEVLOPMENT</p>
        </div>
        <div className="add_learning">
          <button onClick={add_learning}>Start learning together 🚀</button>
        </div>
      </div> */}
      {/* <p
  style={{
    display: "none",
  }}
>
  {z}
</p> */}
      <div className="options_header">
        <div className="options_buttons">
          <button className="learnings_button">Learnings</button>
          <button
            className="stories_button"
            onClick={(e) => history.push("/stories")}
          >
            Journeys
          </button>
          <button
            className="stories_button"
            style={{
              marginLeft: "20px",
            }}
            onClick={(e) => history.push("/posts")}
          >
            Posts
          </button>
        </div>

        <div className="add_learning_button">
          <button onClick={add_learning}>Start learning together 🚀</button>
        </div>
      </div>
      <div className="my_learnings">
      <p className = "my_learnings_title">My learnings</p>
       <div className="my_learnings_learnings">
       {learning &&
        learning
          .filter((item) => {
            console.log(item);
            // return
            return item?.data?.started_by.email.includes(user?.email);
          })
          .map((learning) => <Learning learning={learning} type="my" />)}
          {joinedLearnings.map((learning) => (
        <>
          {/* {learning.data.started_by.email === userInfo.email && ( */}
          <Learning learning={learning} type="joined" />
          {/* )} */}
        </>
      ))}
       </div>
      </div>
      <div className="all_learnings"
       style = {{
         display : 'flex',
         flexDirection : 'column',
       }}
      >
       <p
        style = {{
          color : 'white',
          marginTop : '0',
          marginBottom : '20px'
        }}
       >See What your friends are learning</p>
      <div style = {{
        display : 'flex',
        flexWrap : 'wrap',
      }}>
      {learning &&
        learning?.data?.started_by.email != user?.email &&
        learning.map((learning) =>  <Learning learning={learning} type="all" />
        )}
      </div>
      </div>
      {/* <h2>My learning</h2>
      {learning &&
        learning
          .filter((item) => {
            console.log(item)
            // return
            return item?.data?.started_by.email.includes(user?.email);
          })
          .map((learning) => <h4>{learning?.data?.learning}</h4>)}

<h2>My joined learning</h2>
      {joinedLearnings.map((learning) =>
      <>
      {console.log("nih",learning?.data?.learning)}
       <h4>{learning?.data?.learning?.data?.learning}</h4>
      </>
       )}
<h2>Other learning</h2>
{learning &&
        learning?.data?.started_by.email!=user?.email &&
        learning.map((learning) => <h4>{learning?.data?.learning}</h4>)} */}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  flex: 1;
  min-height: 90vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  /* background-image: url("https://itxitpro.com/front/img/web-development-services.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #003663;

  @media (max-width: 700px) {
    margin-bottom: 50px;
  }

  .passion_logo {
    /* height: 35vh; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-position: center;

    .passion_title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        color: white;
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }

  .options_header {
    display: flex;
    padding: 20px;
    padding-bottom: 0;
    justify-content: space-between;
    /* width : 100%; */

    @media (max-width: 500px) {
      flex-direction: column;
    }

    .options_buttons {
      display: flex;

      @media (max-width: 500px) {
        margin-bottom: 30px;
      }
    }

    .learnings_button {
      margin-right: 20px;
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #252525;
      color: white;
      height: 40px;
    }

    .stories_button {
      width: 100px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      height: 40px;

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
      width: 180px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 20px;
      border: 0;
      background-color: #6868fa;
      color: white;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;

      @media (max-width: 500px) {
        width: 85vw;
        margin-bottom: 0px;
      }

      &:hover {
        cursor: pointer;
        background-color: #9595ff;
      }
    }
  }

  .learnings {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .learnings::-webkit-scrollbar {
    display: none;
  }

  .my_learnings {
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 30px;
    padding-right: 40px;

    @media (max-width: 500px) {
      padding-left: 10px;
      padding-right: 0px;
      justify-content: flex-start;
      padding-top: 0px;
    }
  }

  .my_learnings_learnings {
    display: flex;
    /* overflow-x : scroll;
    width : 100vw; */
    flex-wrap: wrap;
  }

  .all_learnings {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    padding-left: 30px;
    padding-right: 40px;

    @media (max-width: 500px) {
      padding-left: 10px;
      padding-right: 0px;
      justify-content: flex-start;
    }
  }

  .my_learnings_title {
    color: white;
    padding-left: 10px;
  }
`;

export default WorldPage;
