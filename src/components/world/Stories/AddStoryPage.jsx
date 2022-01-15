import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import VideoPlayer from "./VideoPlayer";
import TinderCard from "react-tinder-card";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import db, { storage } from "../../../firebase";
import Loading from "../../../Loading";

function AddStoryPage() {
  const [{ journeyUpload, userInfo, user }, dispatch] = useStateValue();
  const [video, setVideo] = useState();
  const [image, setImage] = useState();
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const history = useHistory();
  const [x, setX] = useState(0);
  const [z, setZ] = useState(0);
  const [input, setInput] = useState();
  const [p, setP] = useState(0);
  const [images, setImages] = useState([]);
  const [journeyPeriod, setJourneyPeriod] = useState();
  const [imageCaption, setImageCaption] = useState("");
  const [imageCaptions, setImageCaptions] = useState([]);
  const [imagesInfo, setImagesInfo] = useState([]);
  const [image1, setImage1] = useState();
  const [loading, setLoading] = useState(false);
  const [parts, setParts] = useState([
    {
      imageUrl:
        "data:image/jpeg;base64,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",
      caption: "Progressing facebook as it is just the start.. ",
    },
    {
      imageUrl:
        "data:image/jpeg;base64,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",
      caption: "Facebook grows very much in 5 years",
    },
    {
      imageUrl:
        "data:image/jpeg;base64,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",
      caption: "Start of facebook through web D in 2004",
    },
  ]);

  const [storyParts, setStoryParts] = useState([
    // {
    //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    // },
    // {
    //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    // },
  ]);

  useEffect(() => {}, [z, storyParts?.length]);

  useEffect(() => {
    if (p === 1) {
      const newStoryParts = storyParts;
      setStoryParts([]);
      setStoryParts(newStoryParts);
      console.log("P is ", p);
    }
  }, [p]);

  useEffect(() => {
    if (image) {
      setSelectedImageUrl(URL.createObjectURL(image));
      images.push({
        image: image,
        imageCaption: imageCaption,
      });
      setImageCaption("");
      console.log("images are", images);
    }
  }, [image]);

  useEffect(() => {
    if (selectedImageUrl) {
      uploadedPhotos.push(selectedImageUrl);
      setSelectedImageUrl();
    }
  }, [selectedImageUrl]);

  useEffect(() => {
    setX(0);
  }, [journeyUpload, selectedImageUrl, uploadedPhotos?.length, x]);

  const upload_journey_through_video = () => {
    dispatch({
      type: actionTypes.SET_JOURNEY_UPLOAD,
      journeyUpload: "video",
    });
  };

  const upload_journey_through_photos = () => {
    dispatch({
      type: actionTypes.SET_JOURNEY_UPLOAD,
      journeyUpload: "photos",
    });
  };

  const upload_journey_through_text = () => {
    dispatch({
      type: actionTypes.SET_JOURNEY_UPLOAD,
      journeyUpload: "text",
    });
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

  const selectImage1 = (e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);
    }
  };

  const add_text = () => {
    storyParts.push(input);
    setInput("");
    // setP(1);

    console.log(storyParts);
  };

  const cancel = () => {
    setStoryParts([]);
  };

  const post_photo_cards = () => {
    if (
      journeyPeriod > 0 &&
      images?.length > 0 &&
      image1 &&
      userInfo?.passion &&
      userInfo?.passion !== "Don't know"
    ) {
      for (let i = 0; i < images?.length; i++) {
        const id = uuid();

        console.log("IMAGES{I}.IMAGE IS ", images[i]?.image);

        if (images[i]?.image) {
          const upload = storage
            .ref(`JourneyImages/${id}`)
            .put(images[i]?.image);

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
                imagesInfo.push({
                  imageUrl: url,
                  imageCaption: images[i]?.imageCaption,
                });
              }
            }
          );
        }
      }

      console.log("ImagesInfo is", imagesInfo);

      const id1 = uuid();

      const upload = storage.ref(`JourneyImages/${id1}`).put(image1);

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
          const image1Url = await upload.snapshot.ref.getDownloadURL();
          console.log("Image1Url is ", image1Url);
          if (image1Url) {
            db.collection("journeys")
              .doc(user?.uid)
              .set({
                journeyPeriod: journeyPeriod,
                imagesInfo: imagesInfo,
                journeyThrough: "photos",
                likes: [],
                fires: [],
                likesLength: 0,
                firesLength: 0,
                memorablePhotoUrl: image1Url,
                uploaderInfo: userInfo,
                views: [
                  {
                    email: userInfo?.email,
                  },
                ],
              })
              .then(() => {
                history.push("/stories");
                setLoading(false);
              });

            db.collection("users").doc(user?.uid).update({
              journeyImages: imagesInfo,
              journeyThrough: "photos",
            });
          }
        }
      );
    } else {
      alert("Please fill all the details");
    }
  };

  const add_imageCaption = () => {
    images.pop();
    console.log("Image Caption is ", imageCaption);
    images.push({
      image: image,
      imageCaption: imageCaption,
    });

    setImageCaption("");

    console.log("Images are finally", images);
  };

  const post_video = (e) => {
    e.preventDefault();
    if (
      journeyPeriod > 0 &&
      video &&
      image1 &&
      userInfo?.passion &&
      userInfo?.passion !== "Don't know" 
      // userInfo?.experience > 1
    ) {
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
            db.collection("journeys")
              .doc(user?.uid)
              .set({
                journeyPeriod: journeyPeriod,
                videoUrl: url,
                journeyThrough: "video",
                likes: [],
                fires: [],
                likesLength: 0,
                firesLength: 0,
                uploaderInfo: userInfo,
                views: [],
              })
              .then(() => {
                const id1 = uuid();

                const upload2 = storage.ref(`JourneyImages/${id1}`).put(image1);

                upload2.on(
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
                    const image1Url =
                      await upload2.snapshot.ref.getDownloadURL();
                    console.log("IMAGE1YRL is ", image1Url);
                    if (image1Url) {
                      db.collection("journeys").doc(user?.uid).update({
                        memorablePhotoUrl: image1Url,
                      });
                    }
                  }
                );
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
    } else {
      alert("Please fill all the details");
    }
  };

  const post_text = () => {
    if (
      journeyPeriod > 0 &&
      storyParts?.length > 0 &&
      image1 &&
      userInfo?.passion &&
      userInfo?.passion !== "Don't know" 
      // userInfo?.experience > 1
    ) {
      db.collection("journeys").doc(user?.uid).set({
        journeyPeriod: journeyPeriod,
        storyParts: storyParts,
        journeyThrough: "text",
        likes: [],
        fires: [],
        likesLength: 0,
        firesLength: 0,
        uploaderInfo: userInfo,
        views: [],
      });

      const id2 = uuid();
      const upload = storage.ref(`JourneyImages/${id2}`).put(image1);

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
          const image1Url = await upload.snapshot.ref.getDownloadURL();
          if (image1Url) {
            db.collection("journeys")
              .doc(user?.uid)
              .update({
                memorablePhotoUrl: image1Url,
              })
              .then(() => {
                history.push("/stories");
              });
          }
        }
      );

      db.collection("users")
        .doc(user?.uid)
        .update({
          storyParts: storyParts,
          journeyThrough: "text",
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      alert("Please fill all the details");
    }
  };

  return (
    <div>
      {loading === false ? (
        <Container>
          <div className="addStory">
            <div className="years_of_journey">
              <p>Enter years of your journey in Web Development</p>
              <input
                type="number"
                min={2}
                value={journeyPeriod}
                onChange={(e) => setJourneyPeriod(e.target.value)}
              />
            </div>
            <div className="upload_current_image">
              <input
                type="file"
                id={"image1"}
                style={{ display: "none" }}
                onChange={selectImage1}
                accept="image/git , image/jpeg , image/png"
              />
              <label htmlFor="image1">
                Upload most memorable photo of your journey
              </label>
              {image1 && <img src={URL.createObjectURL(image1)} alt="" />}
            </div>
            <div className="show_journey_buttons">
              {console.log(journeyUpload)}
              <button
                className={
                  journeyUpload === "video"
                    ? `non_active_button`
                    : `active_button`
                }
                onClick={upload_journey_through_video}
              >
                Show your journey through a video
              </button>
              <button
                className={
                  journeyUpload === "photos"
                    ? `non_active_button`
                    : `active_button`
                }
                onClick={upload_journey_through_photos}
              >
                Show your journey through photos
              </button>
              <button
                className={
                  journeyUpload === "text"
                    ? `non_active_button`
                    : `active_button`
                }
                onClick={upload_journey_through_text}
              >
                Show your journey through text
              </button>
            </div>
            <div className="upload_journey">
              {journeyUpload === "video" && (
                <div className="upload_through_video">
                  <input
                    type="file"
                    id={"video"}
                    style={{ display: "none" }}
                    onChange={selectVideo}
                    accept="video/mp4"
                  />

                  <button className="upload_video">
                    <label htmlFor="video">Upload Video</label>
                  </button>
                  {video && (
                    <div className="video_player">
                      <VideoPlayer videoUrl={URL.createObjectURL(video)} />
                    </div>
                  )}
                  <div className="post_button">
                    <button onClick={post_video}>Post</button>
                  </div>
                </div>
              )}
              {journeyUpload === "photos" && (
                <div className="upload_through_photos">
                  <input
                    type="file"
                    id={"image"}
                    style={{ display: "none" }}
                    onChange={selectImage}
                    accept="image/git , image/jpeg , image/png"
                  />

                  <button className="upload_image">
                    <label htmlFor="image">
                      {uploadedPhotos?.length === 0
                        ? `Upload Image`
                        : `Upload Next Image`}
                    </label>
                  </button>

                  <div className="journey_cards">
                    <div className="tinderCards_cardContainer">
                      {images.map((image, index) => (
                        <>
                          <TinderCard
                            className="swipe"
                            // key={part.caption}
                            preventSwipe={["up", "down"]}
                            //  onCardLeftScreen = {() => outOfFrame(person.name)}
                            onSwipe={() => {
                              if (index === 0) {
                                console.log("Index is ", index);
                                const newImages = images;
                                setImages([]);
                                setImages(newImages);
                              }
                            }}
                          >
                            {image?.imageCaption === "" ? (
                              <div className="card_without_caption">
                                <div
                                  className="card_image"
                                  style={{
                                    backgroundImage: `url(${URL.createObjectURL(
                                      image.image
                                    )})`,
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="card">
                                <div
                                  className="card_image"
                                  style={{
                                    backgroundImage: `url(${URL.createObjectURL(
                                      image.image
                                    )})`,
                                  }}
                                ></div>
                                {console.log(
                                  "ImageCaption in code is ",
                                  image.imageCaption
                                )}
                                <div className="image_caption">
                                  <p>{image?.imageCaption}</p>
                                </div>
                              </div>
                            )}
                          </TinderCard>
                        </>
                      ))}
                    </div>
                  </div>

                  {image && (
                    <div className="add_caption">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Add Caption with the selected image"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                      ></textarea>
                      <div className="add_button">
                        <button onClick={add_imageCaption}>Add</button>
                      </div>
                    </div>
                  )}

                  <div className="uploaded_photos">
                    {image && (
                      <>
                        {/* <img src={URL.createObjectURL(image)} alt="" /> */}
                        {images.map((image) => (
                          <div className="uploaded_photo">
                            <img
                              src={URL.createObjectURL(image.image)}
                              alt=""
                            />
                            <div className="caption">
                              <p>
                                {image?.imageCaption?.length <= 20 ? (
                                  <>{image?.imageCaption}</>
                                ) : (
                                  <>{image?.imageCaption?.slice(0, 70)}...</>
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setX(1);
                                let y;
                                for (let i = 0; i < images.length; i++) {
                                  if (images[i].image === image.image) {
                                    y = i;

                                    console.log("Y is", y);

                                    images.splice(y, 1);

                                    console.log(images);
                                  }
                                }
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="post_button_photos">
                    <button onClick={post_photo_cards}>Post</button>
                  </div>
                </div>
              )}
              {journeyUpload === "text" && (
                <>
                  <div className="journey_cards">
                    <div className="tinderCards_cardContainer">
                      {storyParts?.length > 0 && (
                        <>
                          {storyParts.map((part, index) => (
                            <>
                              <TinderCard
                                className="swipe"
                                // key={part.caption}
                                preventSwipe={["up", "down"]}
                                //  onCardLeftScreen = {() => outOfFrame(person.name)}
                                onSwipe={() => {
                                  setP(0);
                                  console.log("Index is ", index);
                                  if (index === 0) {
                                    const newStoryParts = storyParts;
                                    setStoryParts([]);
                                    setStoryParts(newStoryParts);
                                  }
                                }}
                              >
                                <div className="card text_card">
                                  <p>{part}</p>
                                </div>
                              </TinderCard>
                            </>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  {storyParts?.length > 0 ? (
                    <div className="write_text add_caption">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Add Caption with the selected image"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      ></textarea>
                      <div className="add_button_text">
                        <button onClick={cancel} className="delete">
                          Cancel
                        </button>
                        <button onClick={add_text}>Add</button>
                      </div>
                      <div className="post_button_text">
                        <button onClick={post_text}>Post</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="write_text add_caption"
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Add Caption with the selected image"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      ></textarea>
                      <div className="add_button_text">
                        <button onClick={cancel} className="delete">
                          Cancel
                        </button>
                        <button onClick={add_text}>Add</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const Container = styled.div`
  width: 100vw;
  height: fit-content;
  background-image: url("https://itxitpro.com/front/img/web-development-services.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;

  @media (max-width: 500px) {
    background-color: white;
    background-image: url("");
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10px;
  }

  .addStory {
    background-color: white;
    width: 50vw;
    height: fit-content;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    @media (max-width: 500px) {
      width: 100vw;
      height: fit-content;
      border: 0;
      box-shadow: none;
    }

    .years_of_journey {
      p {
        margin-top: 10px;
        margin-bottom: 0;
        font-family: "Helvetica Neue";
        font-size: 19px;
      }

      input {
        margin-top: 10px;
        height: 25px;
        outline-width: 0;
        border: 1px solid gray;
      }
    }
  }

  .addStory::-webkit-scrollbar {
    display: none;
  }

  .show_journey_buttons {
    display: flex;
    margin-top: 15px;

    .active_button {
      width: 150px;
      margin-right: 20px;
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      border: 1px solid lightgray;

      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }

    .non_active_button {
      width: 150px;
      margin-right: 20px;
      border: 0;
      background-color: #252525;
      color: white;
      border-radius: 10px;
    }
  }

  .upload_video,
  .upload_image {
    width: 120px;
    padding: 7px;
    border: 0;
    border-radius: 20px;
    background-color: #dfdddd;
    margin-top: 15px;
    margin-bottom: 20px;

    &:hover {
      cursor: pointer;
      background-color: #b4b2b2;
    }
  }

  .video_player {
    /* width : 70%; */
  }

  .post_button {
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
    justify-content: flex-end;

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

  .card {
    position: relative;
    width: 200px;
    max-width: 85vw;
    height: 250px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    border: 1px solid lightgray;
    background-color: white;

    .image_caption {
      display: flex;
      justify-content: center;
      padding: 10px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      p {
        font-size: 12px;
        margin-top: 0;
        margin-bottom: 0;
        text-align: center;
        overflow-y: scroll;

        ::-webkit-scrollbar {
          display: none;
        }
      }
    }

    .card_image {
      width: 200px;
      height: 180px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .card_without_caption {
    position: relative;
    width: 200px;
    max-width: 85vw;
    height: 250px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    border: 1px solid lightgray;
    background-color: white;

    .card_image {
      width: 200px;
      height: 250px;
      border-radius: 20px;

      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .tinderCards_cardContainer {
    display: flex;
    justify-content: center;
    /* margin-top: 20px; */
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

  .uploaded_photos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 500px) {
      margin-left: auto;
      margin-right: auto;
    }

    img {
      width: 150px;
      height: 150px;
      padding: 10px;
      padding-bottom: 5px;
      border: 0;

      @media (max-width: 500px) {
        width: 130px;
        height: 130px;
      }
    }

    .uploaded_photo {
      display: flex;
      flex-direction: column;
      width: fit-content;
      border: 1px solid lightgray;
      border-radius: 10px;
      padding-bottom: 10px;
      margin-right: 10px;
      margin-bottom: 10px;

      button {
        width: 90px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 20px;
        border: 0;
        margin: auto;

        &:hover {
          cursor: pointer;
          background-color: #dfdede;
        }
      }

      .caption {
        p {
          margin-top: 0;
          margin-bottom: 0;
          font-size: 14px;
          text-align: center;
          padding: 5px;
        }
      }
    }
  }

  .add_caption {
    margin-top: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
      width: 200px;
      margin-left: auto;
      margin-right: auto;
    }

    textarea {
      border: 1px solid lightgray;
      outline-width: 0px;
      font-size: 13px;
      height: 60px;
      resize: none;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 5px;
    }

    .add_button {
      display: flex;
      justify-content: flex-end;
      width: 250px;

      button {
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 20px;
        border: 0;
        width: 90px;
        margin-bottom: 20px;

        &:hover {
          cursor: pointer;
          background-color: #dfdede;
        }
      }
    }

    .add_button_text {
      display: flex;
      justify-content: space-between;
      width: 250px;

      button {
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 20px;
        border: 0;
        width: 90px;

        &:hover {
          cursor: pointer;
          background-color: #dfdede;
        }
      }
    }
  }

  .post_button_photos {
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
    justify-content: flex-end;

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

  .text_card {
    overflow-y: scroll;
    margin-top: 20px;
    padding: 10px;
    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .text_card::-webkit-scrollbar {
    display: none;
  }

  .write_text {
    margin-top: 310px;
  }

  .delete {
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px;
    border: 0;
    width: 100px !important;

    &:hover {
      cursor: pointer;
      background-color: #dfdede;
    }
  }

  .post_button_text {
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
    justify-content: flex-end;
    width: 100%;

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

  .upload_current_image {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    label {
      color: #006eff;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }

    img {
      width: 70%;
      max-height: 300px;
      object-fit: contain;
      margin-left: auto;
      margin-right: auto;
      margin-top: 15px;
      border-radius: 10px;
      margin-bottom: 10px;
    }
  }
`;

export default AddStoryPage;
