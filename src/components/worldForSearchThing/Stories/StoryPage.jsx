import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import TinderCard from "react-tinder-card";
import ReactPlayer from "react-player";
import VideoPlayer from "./VideoPlayer";
import { ArrowBack } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import db from "../../../firebase";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useSpeechSynthesis } from "react-speech-kit";
import Card from "./Card";
import Typical from "react-typical";
import PartnerCard from "./PartnerCard";
import firebase from "firebase";

function StoryPage() {
  const [{ openStoryPopup, startJourney, user, userInfo }, dispatch] =
    useStateValue();
  const history = useHistory();
  const { journeyId } = useParams();
  const [journeyData, setJourneyData] = useState([]);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();
  const [fires, setFires] = useState([]);
  const [likes, setLikes] = useState([]);
  const [views, setViews] = useState([]);
  const [x, setX] = useState(0);
  const [p, setP] = useState(0);
  const [liked, setLiked] = useState(false);
  const [fired, setFired] = useState(false);
  const [storyParts, setStoryParts] = useState([]);
  const [newStoryParts, setNewStoryParts] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const { speak } = useSpeechSynthesis();
  const [str, setStr] = useState([]);
  const [nextCaption, setNextCaption] = useState();
  const [nextPart, setNextPart] = useState();
  const [showPartners, setShowPartners] = useState(false);
  const[partners, setPartners] = useState([])

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/journey",
    });
  }, []);
  const childRefs = useMemo(
    () =>
      Array(journeyData?.imagesInfo?.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (journeyId) {
      db.collection("journeys")
        .doc(journeyId)
        .onSnapshot((snapshot) => {
          console.log(snapshot.data());
          setJourneyData(snapshot.data());
          setLikes(snapshot.data().likes);
          setFires(snapshot.data().fires);
          setViews(snapshot.data().views);
        });

      console.log(journeyData);
    }
  }, [journeyId]);

  useEffect(() => {
    if (journeyData?.uploaderInfo?.email) {
      setNewImages(journeyData?.imagesInfo);

      setProfilePhotoUrl();

      setNewStoryParts(journeyData?.storyParts);

      db.collection("users")
        .where("email", "==", journeyData?.uploaderInfo?.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setProfilePhotoUrl(doc.data().profilePhotoUrl);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      if (journeyData?.journeyThrough === "photos") {
        setCurrentIndex(journeyData?.imagesInfo?.length - 1);
      }
    }
  }, [journeyData?.uploaderInfo?.email]);




 

  useEffect(() => {
    if (newImages?.length > 0) {
      newImages.reverse();
      setImages(newImages);
    }
  }, [newImages?.length]);

  useEffect(() => {
    if (images.length > 0 && startJourney) {
      setNextCaption(images[images?.length - 1]?.caption);
      setPartners(images[images?.length - 1]?.partners);
    }
  }, [images?.length, startJourney]);

  useEffect(() => {
    if (newStoryParts?.length > 0) {
      console.log("NewStoryParts are", newStoryParts);
      newStoryParts.reverse();
      setStoryParts(newStoryParts);
    }
  }, [newStoryParts?.length]);

  useEffect(() => {
    if (storyParts.length > 0 && startJourney) {
      setNextPart(storyParts[storyParts?.length - 1]);
    }
  }, [storyParts?.length, startJourney]);

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < journeyData?.imagesInfo?.length) {
      console.log("DONE", childRefs);
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const close_popup = () => {
    dispatch({
      type: actionTypes.OPEN_STORY_POPUP,
      openStoryPopup: false,
    });
  };

  const start_journey = () => {
    setShowGif(true);
    setTimeout(() => {
      dispatch({
        type: actionTypes.START_JOURNEY,
        startJourney: true,
      });
    }, 2000);
  };

  const stop_journey = () => {
    setShowGif(false);
    dispatch({
      type: actionTypes.START_JOURNEY,
      startJourney: false,
    });
  };

  const swiped = (index) => {
    console.log("Index is ", index);
    if (index === 0) {
      dispatch({
        type: actionTypes.START_JOURNEY,
        startJourney: false,
      });
    }
  };

  const canSwipe = currentIndex >= 0;

  const goBack = () => {
    history.goBack();
  };

  const likeJourney = (e) => {
    e.preventDefault();
    setLiked(true);

    

    db.collection("journeys")
      .doc(journeyId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion({
          email : userInfo?.email
        }),
      })
      .then(() => {
        db.collection("journeys").doc(journeyId).update({
          likesLength: likes?.length,
        });
      });
  };

  const fireUp_journey = (e) => {
    e.preventDefault();

    console.log("fired");
    console.log(fires);

    

    console.log(fires);

    db.collection("journeys")
      .doc(journeyId)
      .update({
        fires: firebase.firestore.FieldValue.arrayUnion({
          email : userInfo?.email
        }),
      })
      .then(() => {
        console.log("Updated");
        db.collection("journeys").doc(journeyId).update({
          firesLength: fires?.length,
        });
      });

    setFired(true);
  };

  

  const removeFromLikes = (e) => {
    e.preventDefault();
    setLiked(false);
    console.log(liked);

    for (let i = 0; i < likes?.length; i++) {
      if (likes[i]?.email === userInfo?.email) {
        likes.splice(i);
      }
    }

    db.collection("journeys")
      .doc(journeyId)
      .update({
        likes: likes,
      })
      .then(() => {
        db.collection("journeys").doc(journeyId).update({
          likesLength: likes?.length,
        });
      });
  };

  const removeFromFires = (e) => {
    e.preventDefault();
    setFired(false);

    for (let i = 0; i < fires?.length; i++) {
      if (fires[i]?.email === userInfo?.email) {
        fires.splice(i);
      }
    }

    db.collection("journeys")
      .doc(journeyId)
      .update({
        fires: fires,
      })
      .then(() => {
        db.collection("journeys").doc(journeyId).update({
          firesLength: fires?.length,
        });
      });
  };

  return (
    <div>
      <Container>
        <div className="storyPopup_header">
          <div className="user_info">
            <ArrowBack className="back_icon" onClick={goBack} />
            <Avatar className="user_info_avatar" src={profilePhotoUrl} />
            <p
             onClick={(e) => {history.push(`/viewProfile/${journeyId}`)}}
            >{journeyData?.uploaderInfo?.name}</p>
          </div>
        </div>
        <div className="journeyInfo">
          {startJourney === false ? (
            <>
              {showGif === false ? (
                <div
                  className="journey"
                  style={{
                    backgroundImage: `url(${journeyData?.memorablePhotoUrl})`,
                  }}
                ></div>
              ) : (
                <div
                  className="journey"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "20px",
                      fontFamily: "Helvetica Neue",
                    }}
                  >
                    <Typical
                      steps={[
                        `${journeyData?.uploaderInfo?.name}'s journey begins`,
                        1,
                      ]}
                      wrapper="b"
                    />
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {journeyData?.journeyThrough === "photos" && !showPartners && (
                <div className="journey_cards">
                  <div className="tinderCards_cardContainer">
                    {images?.length > 0 && startJourney && (
                      <>
                        {images.map((image, index) => (
                          <>
                            {partners?.length > 0 && (
                                <div
                                  className="journey_partners"
                                  style={{
                                    position: "absolute",
                                  }}
                                >
                                  {console.log("Partners are", image?.partners)}
                                  <div className="first_two">
                                    <div
                                      className="partner"
                                      onClick={() => {
                                        if (partners[0]?.data?.email) {
                                          db.collection("users")
                                            .where(
                                              "email",
                                              "==",
                                              partners[0]?.data?.email
                                            )
                                            .get()
                                            .then((querySnapshot) => {
                                              querySnapshot.forEach((doc) => {
                                                // doc.data() is never undefined for query doc snapshots
                                                console.log(
                                                  doc.id,
                                                  " => ",
                                                  doc.data()
                                                );

                                                history.push(
                                                  `/viewProfile/${doc.id}`
                                                );
                                              });
                                            })
                                            .catch((error) => {
                                              console.log(
                                                "Error getting documents: ",
                                                error
                                              );
                                            });
                                        }
                                      }}
                                    >
                                      {/* <Avatar
                                      src={userInfo?.profilePhotoUrl}
                                      style={{
                                        width: "21px",
                                        height: "21px",
                                      }}
                                    /> */}
                                      <p>{partners[0]?.data?.name}</p>
                                    </div>
                                    <div
                                      className="partner"
                                      onClick={() => {
                                        if (partners[0]?.data?.email) {
                                          db.collection("users")
                                            .where(
                                              "email",
                                              "==",
                                              partners[0]?.data?.email
                                            )
                                            .get()
                                            .then((querySnapshot) => {
                                              querySnapshot.forEach((doc) => {
                                              // doc.data() is never undefined for query doc snapshots
                                                console.log(
                                                  doc.id,
                                                  " => ",
                                                  doc.data()
                                                );

                                                history.push(
                                                  `/viewProfile/${doc.id}`
                                                );
                                              });
                                            })
                                            .catch((error) => {
                                              console.log(
                                                "Error getting documents: ",
                                                error
                                              );
                                            });
                                        }
                                      }}
                                    >
                                      {/* <Avatar
                                      src={userInfo?.profilePhotoUrl}
                                      style={{
                                        width: "21px",
                                        height: "21px",
                                      }}
                                    /> */}
                                      <p>{partners[1]?.data?.name}</p>
                                    </div>
                                  </div>

                                  {partners.length > 2 && (
                                    <div
                                      className="others"
                                      onClick={() => {
                                        setShowPartners(true);
                                        console.log(showPartners);
                                      }}
                                    >
                                      <p>+{partners?.length - 2} others</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            {console.log("ImageUrl is ", image?.imageUrl)}
                            <TinderCard
                              className="swipe"
                              // key={part.caption}
                              preventSwipe={["up", "down"]}
                              onCardLeftScreen={() => {
                                setNextCaption();
                                setNextCaption(images[index - 1]?.caption);
                              }}
                              onSwipe={() => {
                                if (index === 0) {
                                  dispatch({
                                    type: actionTypes.START_JOURNEY,
                                    startJourney: false,
                                  });
                                }
                                setPartners([]);
                                setPartners(images[index - 1]?.partners)
                              }}
                            >
                              {console.log("images ", images)}

                              <div
                                className="card"
                                style={{
                                  backgroundImage: `url(${image.imageUrl})`,
                                }}
                              >
                                {image?.year && (
                                    <div className="year_info">
                                      <p
                                        style={{
                                          marginTop: 0,
                                          marginBottom: 0,
                                          color: "white",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {image?.year === 1 && `1st year`}
                                        {image?.year === 2 && `2nd year`}
                                        {image?.year === 3 && `3rd year`}
                                        {image?.year > 3 &&
                                          `${image?.year}th year`}
                                      </p>
                                    </div>
                                  )}
                                {nextCaption && (
                                  <div className="image_caption">
                                    {/* <p>{image?.caption?.length > 180
                                    ? image?.caption?.slice(0, 180) + "..."
                                    : image?.caption}</p> */}
                                    <p>
                                      <Typical
                                        steps={[`${nextCaption}`, 1]}
                                        wrapper="b"
                                      />
                                    </p>
                                  </div>
                                )}
                              </div>
                            </TinderCard>
                          </>
                          // <Card image={image} caption = {image?.caption} images = {images} index= {index} setImages = {setImages}/>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              {journeyData?.journeyThrough === "video" && (
                <div className="video_player">
                  {console.log("Video Url is ", journeyData?.videoUrl)}
                  <VideoPlayer videoUrl={journeyData?.videoUrl} />
                </div>
              )}

              {journeyData?.journeyThrough === "text" && (
                <>
                  <div className="journey_cards">
                    <div className="tinderCards_cardContainer">
                      {storyParts?.length > 0 && (
                        <>
                          {storyParts.map((part, index) => (
                            <>
                              {console.log("TEXT")}
                              <TinderCard
                                className="swipe"
                                // key={part.caption}
                                onCardLeftScreen={() => {
                                  setNextPart();
                                  setNextPart(storyParts[index - 1]);
                                }}
                                onSwipe={() => {
                                  setP(0);
                                  console.log("Index is ", index);
                                  if (index === 0) {
                                    dispatch({
                                      type: actionTypes.START_JOURNEY,
                                      startJourney: false,
                                    });
                                    setShowGif(false);
                                  }
                                }}
                              >
                                {nextPart && (
                                  <div className="card text_card">
                                    <p>
                                      <Typical
                                        steps={[`${nextPart}`, 1]}
                                        wrapper="b"
                                      />
                                    </p>
                                  </div>
                                )}
                              </TinderCard>
                            </>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}

              {showPartners && (
                <div className="partners_component">
                  <div className="partners_header">
                      <p>{partners?.length} partners</p>
                      <button
                        onClick={() => {
                          setShowPartners(false);
                        }}
                      >
                        Journey
                      </button>
                    </div>
                    <div className="partner_partners">
                      {partners.map((partner) => (
                        <PartnerCard partner={partner} />
                      ))}
                    </div>
                </div>
              )}
            </>
          )}
          <div className="start_button">
            {startJourney === false ? (
              <>
                {!showPartners && (<button onClick={start_journey} className="start">
                  Start Journey
                </button>)}
                <div className="icons">
                  {/* {liked === false ? (
                    <ThumbUpAltOutlinedIcon
                      className="react_like_icon"
                      onClick={likeJourney}
                    />
                  ) : (
                    <ThumbUpIcon
                      className="react_like_icon"
                      onClick={removeFromLikes}
                    />
                  )} */}
                  {fired === false ? (
                    <LocalFireDepartmentIcon
                      className="fire_icon"
                      onClick={fireUp_journey}
                    />
                  ) : (
                    <LocalFireDepartmentIcon
                      className="firedUp_icon"
                      onClick={removeFromFires}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                {!showPartners && (<button
                  className={
                    journeyData?.journeyThrough === "video" ? `start` : `stop`
                  }
                  onClick={stop_journey}
                >
                  Stop
                </button>)}
                <div
                  className="icons"
                  style={{
                    marginTop: `${
                      journeyData?.journeyThrough === "video" || showPartners ? "0" : "440px"
                    }`,
                    marginLeft : `${
                       showPartners ? "80vw" : "0"
                    }`
                  }}
                >
                  {/* {liked === false ? (
                    <ThumbUpAltOutlinedIcon
                      className="react_like_icon"
                      onClick={likeJourney}
                    />
                  ) : (
                    <ThumbUpIcon
                      className="react_like_icon"
                      onClick={removeFromLikes}
                    />
                  )} */}
                  {fired === false ? (
                    <LocalFireDepartmentIcon
                      className="fire_icon"
                      onClick={fireUp_journey}
                    />
                  ) : (
                    <LocalFireDepartmentIcon
                      className="firedUp_icon"
                      onClick={removeFromFires}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display : flex;
  flex-direction : column;

  .storyPopup_header {
    display: flex;
    justify-content: space-between;

    .close_icon {
      margin-right: 5px;
      font-size: 27px;
    }
  }

  .user_info {
    padding-left: 10px;
    padding-top: 15px;

    display: flex;

    .back_icon {
      color: white;
      margin-right: 5px;
      font-size: 30px;
      margin-top: 2px;
    }

    .user_info_avatar {
      width: 35px;
      height: 35px;
    }

    p {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 7px;
      font-size: 19px;
      color: white;
    }
  }

  .journey {
    padding: 0px;
    margin-top: 40px;
    height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid gray;
    background-position: center;
  }

  .playerWrapper {
    width: 100%;
    position: relative;
  }

  .controlsWrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
  }

  .start_button {
    margin-left: 10px;
    display: flex;
    justify-content: space-between;

    .start {
      width: 120px;
      padding: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0099ff;
      color: white;
    }

    .stop {
      width: 120px;
      padding: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0099ff;
      color: white;
      margin-top: 440px;
    }
  }

  .achievements {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }

  .achievement {
    display: flex;
    margin-top: 10px;
    margin-left: 5px;
    img {
      width: 30px;
      object-fit: contain;
      margin-right: 0px;
      margin-top: 5px;
    }
    p {
      margin-bottom: 0;
      margin-top: 5px;
    }
  }

  .card {
    position: relative;
    background-color: #fff;
    width: 70vw;
    padding: 20px;
    padding-bottom: 0px;
    max-width: 85vw;
    height: 400px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
  }

  .tinderCards_cardContainer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .swipe {
    position: absolute;
  }

  .card > h3 {
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
  }

  .react_like_icon {
    font-size: 27px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 20px;
    margin-right: 20px;
    color: white;
  }

  .fire_icon {
    margin-top: auto;
    margin-bottom: auto;
    font-size: 27px;
    color: white;
  }

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .firedUp_icon {
    margin-top: 2px;
    font-size: 27px;
    color: #ff8801;
  }

  .journeyInfo {
    display: flex;
    flex-direction: column;
    height: 75%;
    justify-content: center;
  }

  .card_image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .image_caption {
    color: white;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    p {
      color: white;
      font-size: 14px;
      background-color: #00000076;
      padding: 10px;
      border-radius: 10px;
      margin-bottom : 40px;
    }
  }

  .text_card {
    padding: 10px;
    background-color: #fffefe;
    border: 1px solid lightgray;

    p {
      margin-top: 0;
      margin-bottom: 0;
      background-color: #00000034;
      color: #333b3d;
      padding: 5px;
      border-radius: 10px;
    }
  }

  .journey_partners {
    display: flex;
    width: 330px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    justify-content: space-between;
    position : absolute;
    margin-top: 150px;
    top : 0;

    .partner {
      display: flex;
      background-color: #2b2a2a;
      border: 1px solid gray;
      padding: 5px;
      border-radius: 20px;
      padding-left: 10px;
      margin-right: 10px;

      /* &:hover {
        background-color : #474747;
        cursor : pointer;
      } */

      p {
        color: white;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 5px;
        font-size: 13px;
        margin-right: 5px;
        padding-right: 5px;
      }
    }

    .first_two {
      display: flex;
    }

    .others {
      display: flex;
      background-color: #2b2a2a;
      border: 1px solid gray;
      padding: 5px;
      border-radius: 20px;
      padding-left: 15px;
      margin-right: 15px;

      /* &:hover {
        background-color : #6d6b6b;
        cursor : pointer;
      } */

      p {
        color: white;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 5px;
        font-size: 13px;
        margin-right: 5px;
        padding-right: 5px;
      }
    }
  }

  .partners_component {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
    margin-top : 100px;
    max-height : 580px;

    .partners_header {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 20px;
      padding-left : 20px;
      padding-right : 20px;


      p {
        color: white;
        margin-top: 0;
        margin-bottom: 0;
      }

      button {
        width: 100px;
        padding: 10px;
        border: 0;
        border-radius: 20px;
        background-color: #0099ff;
        color: white;

        &:hover {
          cursor: pointer;
          background-color: #60bffd;
        }
      }
    }
  }

  .partner_partners {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: scroll;
  }

  .partner_partners::-webkit-scrollbar {
    display: none;
  }

  .year_info {
    background-color: #00000073;
    border-radius: 20px;
    padding: 5px;
    border: 1px solid gray;
    padding-left: 10px;
    padding-right: 10px;
    width: fit-content;
  }
`;

export default StoryPage;
