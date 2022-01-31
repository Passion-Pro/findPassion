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
    if (likes?.length > 0) {
      for (let i = 0; i < likes.length; i++) {
        if (likes[i]?.email === userInfo?.email) {
          setLiked(true);
        }
      }
    }
    if (fires?.length > 0) {
      console.log(fires);
      for (let i = 0; i < fires.length; i++) {
        if (fires[i]?.email === userInfo?.email) {
          setFired(true);
        }
      }
    }
  }, [likes?.length, fires?.length, userInfo?.name, user]);

  useEffect(() => {
    console.log("Views are", views);
    if (views?.length > 0 && user?.email) {
      for (let i = 0; i < views?.length; i++) {
        if (views[i]?.email === user?.email) {
          setX(1);
        }
        if (i === views.length - 1 && x === 0) {
          setX(2);

          console.log("Set x to 2");

          // console.log("I is " , i);
          // views.push({
          //   email: userInfo?.email,
          // });

          // console.log("Views are ", views);

          // db.collection("journeys").doc(user?.uid).update({
          //   views: views,
          // });
        }
      }
    }
  }, [views?.length, user?.email]);

  useEffect(() => {
    console.log("X is ", x, user?.email, openStoryPopup);
    if (x === 2 && user?.email && openStoryPopup === true) {
      views.push({
        email: user?.email,
      });

      console.log("Pushed");

      db.collection("journeys").doc(journeyId).update({
        views: views,
      });
    }
  }, [x, user?.email, openStoryPopup]);

  useEffect(() => {
    if (newImages?.length > 0) {
      newImages.reverse();
      setImages(newImages);
    }
  }, [newImages?.length]);

  useEffect(() => {
    if (images.length > 0 && startJourney) {
      setNextCaption(images[images?.length - 1]?.imageCaption);
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

    likes.push({
      email: userInfo?.email,
    });

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

  const fireUp_journey = (e) => {
    e.preventDefault();

    console.log("fired");
    console.log(fires);

    fires.push({
      email: userInfo?.email,
    });

    console.log(fires);

    db.collection("journeys")
      .doc(journeyId)
      .update({
        fires: fires,
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
            <p>{journeyData?.uploaderInfo?.name}</p>
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
                  <div className="journey_partners">
                    <div className="first_two">
                      <div className="partner">
                        <Avatar
                          src={userInfo?.profilePhotoUrl}
                          style={{
                            width: "21px",
                            height: "21px",
                          }}
                        />
                        <p>Ronak</p>
                      </div>
                      <div className="partner">
                        <Avatar
                          src={userInfo?.profilePhotoUrl}
                          style={{
                            width: "21px",
                            height: "21px",
                          }}
                        />
                        <p>Ronak</p>
                      </div>
                    </div>
                    <div
                      className="others"
                      onClick={() => {
                        setShowPartners(true);
                        console.log(showPartners);
                      }}
                    >
                      <p>+8 others</p>
                    </div>
                  </div>
                  <div className="tinderCards_cardContainer">
                    {images?.length > 0 && startJourney && (
                      <>
                        {images.map((image, index) => (
                          <>
                            {console.log("ImageUrl is ", image?.imageUrl)}
                            <TinderCard
                              className="swipe"
                              // key={part.caption}
                              preventSwipe={["up", "down"]}
                              onCardLeftScreen={() => {
                                setNextCaption();
                                setNextCaption(images[index - 1]?.imageCaption);
                              }}
                              onSwipe={() => {
                                if (index === 0) {
                                  dispatch({
                                    type: actionTypes.START_JOURNEY,
                                    startJourney: false,
                                  });
                                }
                              }}
                            >
                              {console.log("images ", images)}

                              <div
                                className="card"
                                style={{
                                  backgroundImage: `url(${image.imageUrl})`,
                                }}
                              >
                                {nextCaption && (
                                  <div className="image_caption">
                                    {/* <p>{image?.imageCaption?.length > 180
                                    ? image?.imageCaption?.slice(0, 180) + "..."
                                    : image?.imageCaption}</p> */}
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
                          // <Card image={image} imageCaption = {image?.imageCaption} images = {images} index= {index} setImages = {setImages}/>
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
                    <p>8 friends</p>
                    <button
                      onClick={() => {
                        setShowPartners(false);
                      }}
                    >
                      Journey
                    </button>
                  </div>
                  <div className="partner_partners">
                    <PartnerCard />
                    <PartnerCard />
                    <PartnerCard />
                    <PartnerCard />
                    <PartnerCard />
                    <PartnerCard />
                    <PartnerCard />
                    <PartnerCard />
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
`;

export default StoryPage;
