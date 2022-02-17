import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import VideoPlayer from "./VideoPlayer";
import TinderCard from "react-tinder-card";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import db, { storage } from "../../../firebase";
import Loading from "../../../Loading";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PartnerCard from "./PartnerCard";
import PartnerName from "./PartnerName";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import Picker from "emoji-picker-react";
import RemoveAllCardsPopup from "./RemoveAllCardsPopup";
import UploadJourneyPopup from "./UploadJourneyPopup";
import CloseIcon from "@mui/icons-material/Close";

function AddStoryPage() {
  const { journeyMode } = useParams();
  const [activeTab, setActiveTab] = useState("questions");
  const [{ userInfo, user, addPartnerInfo }, dispatch] = useStateValue();
  const [image, setImage] = useState();
  const [openEmojis, setOpenEmojis] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [input, setInput] = useState("");
  const [addCard, setAddCard] = useState(false);
  const [imagesInfo, setImagesInfo] = useState([]);
  const [cardsInfo, setCardsInfo] = useState([]);
  const [showYear, setShowYear] = useState(false);
  const [yearOfStart, setYearOfStart] = useState();
  const [startYearJourney, setStartYearJourney] = useState(false);
  const [currentYear, setCurrentYear] = useState();
  const [partners, setPartners] = useState([]);
  const [addPartner, setAddPartner] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [showPartners, setShowPartners] = useState([]);
  const [openRemovePopup, setOpenRemovePopup] = useState(false);
  const [video, setVideo] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [uploadJourney, setUploadJourney] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      db.collection("journeys")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          setCardsInfo(snapshot.data()?.imagesInfo);
          if (
            snapshot.data()?.yearOfStart &&
            snapshot.data()?.yearOfStart !== 0
          ) {
            setCurrentYear(snapshot.data()?.currentYear);
            setStartYearJourney(true);
            setYearOfStart(snapshot.data()?.yearOfStart);
            console.log("YES");
          } else {
            if (snapshot.data().imagesInfo.length === 1) {
              setShowYear(true);
              console.log("SHOWYEAR IS TRUE");
            }
          }
        });

      db.collection("users").onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        )
      );
    }
  }, [user?.uid, openRemovePopup]);

  // const uploadJourney = (e) => {
  //   e.preventDefault();
  //   db.collection("journeys").doc(user?.uid).update({
  //     upload: "yes",
  //   }).then(() => {
  //     history.push("/stories")
  //   })
  // };

  const uploadVideo = (e) => {
    e.preventDefault();
    if (video) {
      const id = uuid();
      const upload = storage.ref(`JourneyVideos/${id}`).put(video);

      upload.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          console.log("URL is ", url);
          if (url) {
            db.collection("journeys").doc(user?.uid).set({
              videoUrl: url,
              journeyThrough: "video",
              likes: [],
              fires: [],
              likesLength: 0,
              firesLength: 0,
              uploaderInfo: userInfo,
              views: [],
              partners: addPartnerInfo,
              upload: "yes",
            });

            db.collection("users")
              .doc(user?.uid)
              .update({
                journeyUrl: url,
                journeyThrough: "video",
              })
              .then(() => {
                setLoading(false);
                history.push("/stories");
              });
          }
        }
      );
    }
  };

  const selectVideo = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const selectImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject?.emoji);
  };

  const nextQuestion = (e) => {
    e.preventDefault();
    setAddCard(true);
    if (image) {
      const id = uuid();

      const upload = storage.ref(`JourneyImages/${id}`).put(image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const imageUrl = await upload.snapshot.ref.getDownloadURL();
          if (imageUrl) {
            imagesInfo.push({
              imageUrl: imageUrl,
              caption: input,
              imageId: id,
            });

            db.collection("journeys")
              .doc(user?.uid)
              .set({
                imagesInfo: imagesInfo,
                journeyThrough: "photos",
                likes: [],
                fires: [],
                likesLength: 0,
                firesLength: 0,
                uploaderInfo: userInfo,
                views: [
                  {
                    email: userInfo?.email,
                  },
                ],
                currentYear: currentYear,
                upload: "no",
              });
          }
        }
      );
    } else if (input !== "") {
      setAddCard(true);
      imagesInfo.push({
        imageUrl: "",
        caption: input,
      });

      db.collection("journeys")
        .doc(user?.uid)
        .set({
          imagesInfo: imagesInfo,
          journeyThrough: "photos",
          likes: [],
          fires: [],
          likesLength: 0,
          firesLength: 0,
          uploaderInfo: userInfo,
          views: [
            {
              email: userInfo?.email,
            },
          ],
        });
    }

    setTimeout(() => {
      setShowYear(true);
      setInput("");
    }, 1000);
  };

  const add_card = (e) => {
    if (image) {
      setAddCard(true);
      const id = uuid();

      const upload = storage.ref(`JourneyImages/${id}`).put(image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const imageUrl = await upload.snapshot.ref.getDownloadURL();
          if (imageUrl) {
            cardsInfo.push({
              imageUrl: imageUrl,
              caption: input,
              year: currentYear,
              partners: addPartnerInfo,
              imageId: id,
            });

            console.log(cardsInfo);

            db.collection("journeys")
              .doc(user?.uid)
              .update({
                imagesInfo: cardsInfo,
              })
              .then(() => {
                console.log("YES DONE");
              });

            dispatch({
              type: actionTypes.SET_ADD_PARTNER_INFO,
              addPartnerInfo: [],
            });
          }
        }
      );
      setImage(null);
      setInput("");
    } else if (input !== "") {
      setAddCard(true);
      cardsInfo.push({
        imageUrl: "",
        caption: input,
        year: currentYear,
        partners: addPartnerInfo,
      });

      db.collection("journeys")
        .doc(user?.uid)
        .update({
          imagesInfo: cardsInfo,
        })
        .then(() => {
          console.log("YES DONE");
        });

      dispatch({
        type: actionTypes.SET_ADD_PARTNER_INFO,
        addPartnerInfo: [],
      });

      setInput("");
    }
  };

  const nextYear = (e) => {
    if (image) {
      setAddCard(true);
      const id = uuid();

      const upload = storage.ref(`JourneyImages/${id}`).put(image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const imageUrl = await upload.snapshot.ref.getDownloadURL();
          if (imageUrl) {
            cardsInfo.push({
              imageUrl: imageUrl,
              caption: input,
              year: currentYear,
              partners: addPartnerInfo,
              imageId: id,
            });

            console.log(cardsInfo);

            db.collection("journeys")
              .doc(user?.uid)
              .update({
                imagesInfo: cardsInfo,
              })
              .then(() => {
                console.log("YES DONE");
              });

            dispatch({
              type: actionTypes.SET_ADD_PARTNER_INFO,
              addPartnerInfo: [],
            });

            setCurrentYear(currentYear + 1);
          }
        }
      );
      setImage(null);
      setInput("");
    } else if (input !== "") {
      setAddCard(true);
      cardsInfo.push({
        imageUrl: "",
        caption: input,
        year: currentYear,
        partners: addPartnerInfo,
      });

      db.collection("journeys")
        .doc(user?.uid)
        .update({
          imagesInfo: cardsInfo,
          currentYear: currentYear + 1,
        })
        .then(() => {
          console.log("YES DONE");
        });

      dispatch({
        type: actionTypes.SET_ADD_PARTNER_INFO,
        addPartnerInfo: [],
      });

      setCurrentYear(currentYear + 1);

      setInput("");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {journeyMode === "photos" && (
            <div className="journey_photos">
              <div className="photos_options">
                <button
                  onClick={() => {
                    setActiveTab("questions");
                  }}
                  style={{
                    backgroundColor:
                      activeTab === "questions" ? `#6868fa` : `#fff`,
                    color: activeTab === "questions" ? `white` : `black`,
                  }}
                >
                  Questions
                </button>
                <button
                  onClick={() => {
                    setActiveTab("cards");
                  }}
                  style={{
                    backgroundColor: activeTab === "cards" ? `#6868fa` : `#fff`,
                    color: activeTab === "cards" ? `white` : `black`,
                  }}
                >
                  Cards
                </button>
                <button
                  onClick={() => {
                    setActiveTab("journey");
                  }}
                  style={{
                    backgroundColor:
                      activeTab === "journey" ? `#6868fa` : `#fff`,
                    color: activeTab === "journey" ? `white` : `black`,
                  }}
                >
                  Journey
                </button>
              </div>
              {userInfo?.passion && activeTab === "questions" && (
                <div className="question_zone">
                  <div
                    className={addCard ? `question_add` : `question`}
                    style={{
                      display: (showYear || startYearJourney) && "none",
                    }}
                  >
                    <p className="question_question">
                      Why did you choose {userInfo?.passion}?
                    </p>
                    {image && !openEmojis && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        style={{
                          width: "300px",
                          height: "200px",
                          marginLeft: "8px",
                          marginRight: "auto",
                          marginTop: "10px",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Type here"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      maxLength={300}
                    ></textarea>
                    {openEmojis === true && (
                      <Picker onEmojiClick={onEmojiClick} />
                    )}
                    <div className="question_footer">
                      <div className="footer_icons">
                        <InsertEmoticonIcon
                          className="icon"
                          onClick={(e) => setOpenEmojis(!openEmojis)}
                        />
                        <label htmlFor="image">
                          <ImageIcon className="icon" />
                        </label>
                        <input
                          type="file"
                          id={"image"}
                          style={{ display: "none" }}
                          onChange={selectImage}
                          accept="image/git , image/jpeg , image/png"
                        />
                      </div>
                      <button onClick={nextQuestion}>Next</button>
                    </div>
                  </div>
                  <div
                    className={showYear && `question_year`}
                    style={{
                      display: (!showYear || startYearJourney) && "none",
                    }}
                  >
                    <p className="question_question">
                      In which year you started learning about{" "}
                      {userInfo?.passion}?
                    </p>
                    <div className="year_options">
                      <button
                        onClick={() => {
                          db.collection("journeys").doc(user?.uid).update({
                            yearOfStart: "1st year",
                            currentYear: 1,
                          });
                        }}
                      >
                        1st year
                      </button>
                      <button
                        onClick={() => {
                          db.collection("journeys").doc(user?.uid).update({
                            yearOfStart: "2nd year",
                            currentYear: 2,
                          });
                        }}
                      >
                        2nd year
                      </button>
                      <button
                        onClick={() => {
                          db.collection("journeys").doc(user?.uid).update({
                            yearOfStart: "3rd year",
                            currentYear: 3,
                          });
                        }}
                      >
                        3rd year
                      </button>
                      <button
                        onClick={() => {
                          db.collection("journeys").doc(user?.uid).update({
                            yearOfStart: "4th year",
                            currentYear: 4,
                          });
                        }}
                      >
                        4th year
                      </button>
                    </div>
                  </div>
                  {startYearJourney && (
                    <div
                      className={
                        addCard ? `startYearJourney_add` : `startYearJourney`
                      }
                    >
                      <p
                        style={{
                          color: "white",
                          fontFamily: "Helvetica",
                          marginBottom: "20px",
                          textAlign: "center",
                        }}
                      >
                        Upload your yearwise journey in {userInfo?.passion}
                      </p>
                      {addPartner ? (
                        <div className="add_partner_div">
                          <div className="search_bar">
                            <SearchOutlinedIcon className="searchIcon" />
                            <input
                              type="text"
                              placeholder="Search by name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="names">
                            {name &&
                              users &&
                              users
                                .filter((item) => {
                                  return item?.data?.name
                                    .toLowerCase()
                                    .includes(name.toLowerCase());
                                })
                                .map((data) => (
                                  <PartnerName
                                    data={data}
                                    setAddPartner={setAddPartner}
                                  />
                                ))}
                            {name && (
                              <PartnerName
                                name={name}
                                setAddPartner={setAddPartner}
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="upload_Journey">
                          <div className="upload_journey_header">
                            <p
                              style={{
                                marginTop: 0,
                                marginBottom: 0,
                                width: "60%",
                                textAlign: "center",
                                fontSize: "18px",
                                fontFamily: "Helvetica Neue",
                              }}
                              className="year"
                            >
                              {currentYear === 1 && `1st year`}
                              {currentYear === 2 && `2nd year`}
                              {currentYear === 3 && `3rd year`}
                              {currentYear > 3 && `${currentYear}th year`}
                            </p>
                            <button
                              className="year_button next_card_button"
                              onClick={add_card}
                            >
                              Add Card in {currentYear === 1 && `1st year`}
                              {currentYear === 2 && `2nd year`}
                              {currentYear === 3 && `3rd year`}
                              {currentYear > 3 && `${currentYear}th year`}
                            </button>
                          </div>
                          {image && !openEmojis && (
                            <img
                              src={URL.createObjectURL(image)}
                              alt=""
                              style={{
                                width: "300px",
                                height: "200px",
                                marginLeft: "8px",
                                marginRight: "auto",
                                marginTop: "10px",
                                borderRadius: "10px",
                              }}
                            />
                          )}
                          <button
                            className="add_partners_button"
                            onClick={() => {
                              setAddPartner(true);
                              console.log("SET");
                            }}
                          >
                            Add Partner
                          </button>

                          {addPartnerInfo?.length > 0 && (
                            <div className="added_partners">
                              {addPartnerInfo.map((partnerInfo) => (
                                <div className="added_partner_info">
                                  {partnerInfo?.data?.profilePhotoUrl && (
                                    <Avatar
                                      src={partnerInfo?.data?.profilePhotoUrl}
                                      style={{
                                        width: "21px",
                                        height: "21px",
                                      }}
                                    />
                                  )}
                                  <p>{partnerInfo?.data?.name}</p>
                                  <CancelIcon
                                    className="cancel_icon"
                                    onClick={() => {
                                      dispatch({
                                        type: actionTypes.REMOVE_PARTNER_INFO,
                                        data: partnerInfo?.data,
                                      });
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            placeholder={`Post your learning , experience or achievement in ${userInfo?.passion}`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            maxLength={300}
                          ></textarea>
                          {openEmojis === true && (
                            <Picker onEmojiClick={onEmojiClick} />
                          )}
                          <div className="question_footer">
                            <div className="footer_icons">
                              <InsertEmoticonIcon
                                className="icon"
                                onClick={(e) => setOpenEmojis(!openEmojis)}
                              />
                              <label htmlFor="image">
                                <ImageIcon className="icon" />
                              </label>
                              <input
                                type="file"
                                id={"image"}
                                style={{ display: "none" }}
                                onChange={selectImage}
                                accept="image/git , image/jpeg , image/png"
                              />
                            </div>
                            <button onClick={nextYear}>Next Year</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {activeTab === "cards" && (
                <div className="all_cards">
                  {cardsInfo.map((cardInfo) => (
                    <>
                      {showPartners === cardInfo ? (
                        <div className="showPartners">
                          <div
                            className="showPartners_header"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <CancelIcon
                              className="cancel_icon"
                              style={{
                                color: "white",
                              }}
                              onClick={() => {
                                setShowPartners([]);
                              }}
                            />
                          </div>
                          <div className="showPartners_partners">
                            {cardInfo?.partners.map((partnerInfo) => (
                              <div className="added_partner_info">
                                {
                                  <Avatar
                                    src={partnerInfo?.data?.profilePhotoUrl}
                                    style={{
                                      width: "17px",
                                      height: "17px",
                                    }}
                                  />
                                }
                                <p>{partnerInfo?.data?.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          {cardInfo?.imageUrl ? (
                            <div
                              className="cards_card"
                              style={{
                                backgroundImage: `url(${cardInfo?.imageUrl})`,
                              }}
                            >
                              <div className="partners_button">
                                {cardInfo?.year && (
                                  <div className="year_info">
                                    <p
                                      style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                        color: "white",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {cardInfo?.year === 1 && `1st year`}
                                      {cardInfo?.year === 2 && `2nd year`}
                                      {cardInfo?.year === 3 && `3rd year`}
                                      {cardInfo?.year > 3 &&
                                        `${cardInfo?.year}th year`}
                                    </p>
                                  </div>
                                )}
                                {cardInfo?.partners?.length > 0 && (
                                  <button
                                    onClick={() => {
                                      setShowPartners(cardInfo);
                                    }}
                                  >
                                    Partners
                                  </button>
                                )}
                              </div>
                              <div className="cards_caption">
                                <p>{cardInfo?.caption}</p>
                              </div>
                              <div className="remove_button">
                                <button
                                  onClick={() => {
                                    let y;
                                    for (
                                      let i = 0;
                                      i < cardsInfo?.length;
                                      i++
                                    ) {
                                      if (
                                        cardsInfo[i].imageUrl ===
                                        cardInfo.imageUrl
                                      ) {
                                        y = i;
                                        console.log("Spliced");
                                        cardsInfo.splice(y, 1);

                                        db.collection("journeys")
                                          .doc(user?.uid)
                                          .update({
                                            imagesInfo: cardsInfo,
                                          });

                                        if (cardInfo?.imageId) {
                                          storage
                                            .ref(
                                              `JourneyImages/${cardInfo?.imageId}`
                                            )
                                            .delete();
                                        }
                                      }
                                    }
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="cards_card"
                              style={{
                                backgroundColor: "#0000004c",
                              }}
                            >
                              <div className="partners_button">
                                {cardInfo?.year && (
                                  <div className="year_info">
                                    <p
                                      style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                        color: "white",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {cardInfo?.year === 1 && `1st year`}
                                      {cardInfo?.year === 2 && `2nd year`}
                                      {cardInfo?.year === 3 && `3rd year`}
                                      {cardInfo?.year > 3 &&
                                        `${cardInfo?.year}th year`}
                                    </p>
                                  </div>
                                )}
                                {cardInfo?.partners?.length > 0 && (
                                  <button
                                    onClick={() => {
                                      setShowPartners(cardInfo);
                                    }}
                                  >
                                    Partners
                                  </button>
                                )}
                              </div>
                              <div className="cards_caption">
                                <p>{cardInfo?.caption}</p>
                              </div>
                              <div className="remove_button">
                                <button
                                  onClick={() => {
                                    let y;
                                    for (
                                      let i = 0;
                                      i < cardsInfo?.length;
                                      i++
                                    ) {
                                      if (
                                        cardsInfo[i].caption ===
                                        cardInfo.caption
                                      ) {
                                        y = i;
                                        cardsInfo.splice(y, 1);

                                        db.collection("journeys")
                                          .doc(user?.uid)
                                          .update({
                                            imagesInfo: cardsInfo,
                                          });
                                      }
                                    }
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ))}
                  <div className="remove_all">
                    {cardsInfo?.length > 0 && (
                      <button
                        onClick={() => {
                          setOpenRemovePopup(true);
                          console.log("TURNED TRUE");
                        }}
                      >
                        Remove All Cards
                      </button>
                    )}
                  </div>
                  <div className="upload_journey">
                    {cardsInfo?.length > 0 && (
                      <button
                        onClick={() => {
                          setUploadJourney(true);
                        }}
                      >
                        <p>Upload Journey</p>
                        <span>🎬</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "journey" && (
                <div className="journey_cards">
                  <div className="cardsContainer">
                    {console.log("JOURNEY")}
                    {cardsInfo.map((cardInfo, index) => (
                      <>
                        <TinderCard
                          className="swipe"
                          // key={part.caption}
                          preventSwipe={["up", "down"]}
                          //  onCardLeftScreen = {() => outOfFrame(person.name)}
                          onSwipe={() => {
                            if (index === 0) {
                              const newCardsInfo = cardsInfo;
                              setCardsInfo([]);
                              setCardsInfo(newCardsInfo);
                            }
                          }}
                        >
                          <div
                            className="card"
                            style={{
                              backgroundImage: `url(${cardInfo?.imageUrl})`,
                            }}
                          >
                            {cardInfo?.caption && (
                              <div
                                className="image_caption"
                                style={{
                                  justifyContent: cardInfo?.imageUrl
                                    ? "flex-end"
                                    : "flex-start",
                                }}
                              >
                                <p>{cardInfo?.caption}</p>
                              </div>
                            )}
                          </div>
                        </TinderCard>
                      </>
                    ))}
                  </div>
                </div>
              )}
              {openRemovePopup && (
                <RemoveAllCardsPopup setOpenRemovePopup={setOpenRemovePopup} />
              )}
            </div>
          )}
          {journeyMode === "video" && (
            <div className="video_upload">
              {addPartner ? (
                <div
                  className="add_partner_div"
                  style={{
                    width: "450px",
                  }}
                >
                  <div className="search_bar">
                    <SearchOutlinedIcon className="searchIcon" />
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="names">
                    {name &&
                      users &&
                      users
                        .filter((item) => {
                          return item?.data?.name
                            .toLowerCase()
                            .includes(name.toLowerCase());
                        })
                        .map((data) => (
                          <PartnerName
                            data={data}
                            setAddPartner={setAddPartner}
                          />
                        ))}
                    {name && (
                      <PartnerName name={name} setAddPartner={setAddPartner} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="video_upload_header">
                  <input
                    type="file"
                    id={"video"}
                    style={{ display: "none" }}
                    onChange={selectVideo}
                    accept="video/mp4"
                  />
                  <label htmlFor="video">
                    <p>Select video</p>
                  </label>

                  {video && (
                    <button
                      className="add_partners_button"
                      onClick={() => {
                        setAddPartner(true);
                        console.log("SET");
                      }}
                      style={{
                        marginLeft: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      Add Partner
                    </button>
                  )}

                  {addPartnerInfo?.length > 0 && (
                    <div
                      className="added_partners"
                      style={{
                        marginLeft: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      {addPartnerInfo.map((partnerInfo) => (
                        <div className="added_partner_info">
                          {partnerInfo?.data?.profilePhotoUrl && (
                            <Avatar
                              src={partnerInfo?.data?.profilePhotoUrl}
                              style={{
                                width: "21px",
                                height: "21px",
                              }}
                            />
                          )}
                          <p>{partnerInfo?.data?.name}</p>
                          <CancelIcon
                            className="cancel_icon"
                            onClick={() => {
                              dispatch({
                                type: actionTypes.REMOVE_PARTNER_INFO,
                                data: partnerInfo?.data,
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {video && !openEmojis && (
                    <div
                      className="video_player"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <VideoPlayer videoUrl={URL.createObjectURL(video)} />
                    </div>
                  )}

                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="video_textarea"
                    placeholder="Write about your experiences in your journey"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                  {openEmojis === true && (
                    <Picker onEmojiClick={onEmojiClick} />
                  )}
                  <div
                    className="question_footer"
                    style={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div className="footer_icons">
                      <InsertEmoticonIcon
                        className="icon"
                        onClick={(e) => setOpenEmojis(!openEmojis)}
                      />
                    </div>
                    <button
                      onClick={uploadVideo}
                      className="upload_video_journey"
                      style={{
                        display: "flex",
                        width: "fit-content",
                      }}
                    >
                      Upload Journey
                      <span>🎬</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      )}
      {uploadJourney && (
        <UploadJourneyPopup setUploadJourney={setUploadJourney} journeyCards = {imagesInfo} />
      )}
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("https://i.pinimg.com/736x/de/83/f1/de83f1ab512f3188b36468f5aa79512b.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;

  .question_zone {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
  }

  .question,
  .upload_Journey {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    width: 400px;
    animation: fadeIn 1s;
    display: flex;
    flex-direction: column;
    height: fit-content;
    min-height: 300px;
    box-shadow: 0 19px 39px rgba(0, 0, 0, 0.12);

    @media (max-width: 500px) {
      width: 85vw;
    }
  }

  textarea {
    resize: none;
    border-radius: 5px;
    padding: 10px;
    padding-left: 10px;
    border: 0;
    outline: 0;
    font-size: 14px;
    flex: 1;
  }

  .question_add,
  .upload_Journey_add {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    height: 300px;
    box-shadow: 0 19px 39px rgba(0, 0, 0, 0.12);
    position: absolute;
    animation: fly 1s 0.005s ease-in-out;
  }

  @keyframes fly {
    0% {
      left: 30%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .question_question {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    color: #494949;
    padding-left: 4px;
  }

  .journey_photos {
    height: 90vh;
    padding: 20px;
  }

  .photos_options {
    display: flex;
    justify-content: center;

    button {
      padding: 10px;
      margin-right: 20px;
      border-radius: 20px;
      width: 100px;
      border: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .question_footer {
    display: flex;
    justify-content: space-between;

    button {
      width: 100px;
      padding: 10px;
      border: 0;
      border-radius: 20px;
      background-color: #0044ff;
      color: white;

      &:hover {
        cursor: pointer;
        background-color: #2e66ff;
      }
    }
  }

  .icon {
    font-size: 20px;
    color: #575757;
    margin-right: 5px;
    margin-top: 10px;

    &:hover {
      color: #808080;
      cursor: pointer;
    }
  }

  .footer_icons {
    justify-content: flex-end;
  }

  .emoji-picker-react {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
  }

  .all_cards {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    animation: fadeIn 0.5s;
    overflow-y: scroll;
    flex: 1;
    height: 87vh;

    ::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      height: fit-content;
    }
  }

  .remove_all {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 20px;
    padding-left: 20px;

    button {
      padding: 10px;
      border-radius: 20px;
      background-color: #6868fa;
      color: white;
      border: 0;

      &:hover {
        cursor: pointer;
        background-color: #9090fc;
      }
    }
  }

  .upload_journey {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-bottom: 20px;
    padding-right: 20px;

    button {
      padding: 10px;
      border-radius: 20px;
      background-color: #6868fa;
      color: white;
      border: 0;
      display: flex;

      img {
        height: 20px;
        width: 20px;
      }

      p {
        margin-top: 0;
        margin-bottom: 0;
      }

      span {
        margin-left: 5px;
      }

      &:hover {
        cursor: pointer;
        background-color: #9090fc;
      }
    }
  }

  .cards_card {
    width: 250px;
    height: 250px;
    border: 1px solid gray;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12);
    padding: 5px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 20px;

    @media (max-width: 500px) {
      width: 90%;
    }
  }

  .showPartners {
    width: 250px;
    height: 250px;
    border: 1px solid gray;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12);
    padding: 5px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .year_info {
    background-color: #00000073;
    border-radius: 20px;
    padding: 5px;
    border: 1px solid gray;
    padding-left: 10px;
    padding-right: 10px;
  }

  .partners_button {
    display: flex;
    justify-content: space-between;
    padding-top: 7px;
    padding-right: 10px;

    button {
      border-radius: 20px;
      font-size: 12px;
      padding-top: 5px;
      padding-bottom: 5px;
      border: 0;
      border: 1px solid gray;

      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }

  .cards_caption {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 10px;

    p {
      color: white;
      font-size: 14px;
      background-color: #00000076;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 0;
    }
  }

  .remove_button {
    display: flex;
    justify-content: center;

    button {
      border-radius: 20px;
      font-size: 12px;
      padding-top: 5px;
      padding-bottom: 5px;
      border: 0;
      margin-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid gray;

      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }

  .journey_cards {
    display: flex;
    height: 90%;
  }

  .card {
    position: absolute;
    width: 250px;
    max-width: 85vw;
    height: 300px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    border: 1px solid lightgray;
    background-color: white;

    .image_caption {
      color: white;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-left: 5px;
      margin-right: 5px;

      p {
        color: white;
        font-size: 12px;
        background-color: #0000006e;
        padding: 5px;
        border-radius: 10px;
      }
    }
  }

  .cardsContainer {
    display: flex;
    margin-top: 150px;
    justify-content: center;
    width: 90%;

    @media (max-width: 500px) {
      justify-content: flex-start;
      margin-left: 50px;
    }
  }

  .question_year {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    width: 400px;
    animation: fadeIn 1s;
    display: flex;
    flex-direction: column;
    height: fit-content;
    box-shadow: 0 19px 39px rgba(0, 0, 0, 0.12);

    .year_options {
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      button {
        margin-bottom: 10px;
        background-color: #fff;
        border-radius: 8px;
        padding-top: 10px;
        padding-bottom: 10px;
        border: 1px solid gray;

        &:hover {
          cursor: pointer;
          background-color: #000000;
          color: white;
        }
      }
    }
  }

  .upload_journey_header {
    display: flex;
    justify-content: space-between;
  }

  .year_button {
    border: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px;
    color: white;
    background-color: #6868fa;
  }

  .next_card_button {
    background-color: #006eff;
    &:hover {
      cursor: pointer;
      background-color: #31cdfd;
    }
  }

  .startYearJourney {
    display: flex;
    flex-direction: column;
    background-color: #00000090;
    padding: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding-bottom: 40px;
  }

  .startYearJourney_add {
    display: flex;
    flex-direction: column;
    background-color: #00000090;
    padding: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding-bottom: 40px;
    position: absolute;
    animation: fly 1s 0.005s ease-in-out;
  }

  .year {
    text-shadow: 0 1px 3px #d3d0d0;
    animation: fadeIn 3s;
  }

  .add_partners_button {
    width: fit-content;
    margin-top: 10px;
    border: 0;
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px;

    &:hover {
      cursor: pointer;
      background-color: #bebebe;
    }
  }

  .add_partner_div {
    display: flex;
    flex-direction: column;
    height: 300px;
    overflow-y: scroll;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    width: 400px;
  }

  .add_partner_div::-webkit-scrollbar {
    display: none;
  }

  .search_bar {
    background-color: #fff;
    width: 70%;
    margin-left: 30px;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    border: 1px solid lightgray;
    margin-top: 20px;
    margin-bottom: 15px;

    input {
      border: 0px;
      outline-width: 0px;
      width: 94%;
    }

    .searchIcon {
      color: gray !important;
    }
  }

  .added_partners {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    max-height: 40px;
    overflow-y: scroll;
  }

  .added_partner_info {
    display: flex;
    background-color: white;
    border: 1px solid lightgray;
    padding: 5px;
    border-radius: 20px;
    padding-left: 7px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: fit-content;
    height: fit-content;

    p {
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 5px;
      font-size: 13px;
      margin-right: 5px;
      padding-right: 5px;
    }
  }

  .cancel_icon {
    font-size: 19px !important;
    margin-top: auto;
    margin-bottom: auto;
    &:hover {
      cursor: pointer;
    }
  }

  .showPartners_partners {
    display: flex;
    flex-wrap: wrap;
  }

  .video_upload {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 19px 39px rgba(0, 0, 0, 0.12);
  }

  .video_upload {
    margin: auto;
    width: 500px;

    label {
      p {
        color: #006eff;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .video_textarea {
    flex: auto;
    padding: 0;
    width: 90%;
    margin-left: 20px;
    height: 100px;
  }

  .upload_video_journey {
    padding: 10px;
    border-radius: 20px;
    background-color: #6868fa;
    color: white;
    border: 0;
    display: flex;

    img {
      height: 20px;
      width: 20px;
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }

    span {
      margin-left: 5px;
    }

    &:hover {
      cursor: pointer;
      background-color: #9090fc;
    }
  }
`;

export default AddStoryPage;
