import react, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './Home.css';
import styled from "styled-components";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Header from '../header/Header';
import Button from '@mui/material/Button';
import firebase from 'firebase';
import db from '../../firebase'
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import CreateStory from '../stories/CreateStory';
import Stories from '../stories/Stories';
import PostCard from '../post/PostCard';
import HeaderSecond from '../header/HeaderSecond';
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { useStateValue } from '../../StateProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ShowStoriesSeries from '../stories/ShowStoriesSeries';

function Home() {
  const history = useHistory();
  const [{ userInfo, user }] = useStateValue();
  const [postHome, setPostHome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upImgImage, setUpImgImage] = useState(null);
  const [statusCaption, setStatusCaption] = useState('');
  const [popUpImageCrop, setPopUpImageCrop] = useState(false);
  const [upImg, setUpImg] = useState(null);
  const [showAddStory, setShowAddStory] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);

  var today = new Date();
  var datetime = today.toLocaleString();

  useEffect(() => {
    if (userInfo?.name) {
      db.collection(userInfo?.passion)
        .doc('Csb15iOnGedmpceiQOhX')
        .collection("Posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPostHome(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }))
          )
        )
    }
  }, [userInfo])

  // function generateDownload(canvas, crop) {
  //   if (!crop || !canvas) {
  //     return;
  //   }

  //   canvas.toBlob(
  //     (blob) => {
  //       setCroppedImage(blob);
  //       setPopUpImageCrop(false);
  //     },
  //     'image/png',
  //     1
  //   );
  // }
  // const onLoad = useCallback((img) => {
  //   imgRef.current = img;
  // }, []);

  // const onSelectFile = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setUpImgImage(e.target.files[0])
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => setUpImg(reader.result));
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  // useEffect(() => {
  //   if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
  //     return;
  //   }

  //   const image = imgRef.current;
  //   const canvas = previewCanvasRef.current;
  //   const crop = completedCrop;

  //   const scaleX = image.naturalWidth / image.width;
  //   const scaleY = image.naturalHeight / image.height;
  //   const ctx = canvas.getContext('2d');
  //   const pixelRatio = window.devicePixelRatio;

  //   canvas.width = crop.width * pixelRatio * scaleX;
  //   canvas.height = crop.height * pixelRatio * scaleY;

  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  //   ctx.imageSmoothingQuality = 'high';

  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width * scaleX,
  //     crop.height * scaleY
  //   );
  // }, [completedCrop]);


  //  const sendStory = async () => {
  //   setLoading(true)
  //   if (croppedImage) {
  //     const id = uuid();
  //     const imagesRef = firebase.storage().ref("PostImages").child(id);
  //     await imagesRef.put(croppedImage);
  //     imagesRef.getDownloadURL().then((url) => {
  //       if (user.uid) {
  //         // adding Status in user private collection
  //         db.collection("users")
  //           .doc(user.uid)
  //           .collection("Status")
  //           .add({
  //             username: userInfo.name,
  //             userEmail: userInfo.email,
  //             imageURL: url,
  //             date: datetime,
  //             postType: 'Status',
  //             statusCaption:statusCaption,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //             imageName: id,
  //             imageOriginalName: upImgImage.name,
  //           })
  //           .then(() => {
  //             setLoading(false);
  //             showAddStory(false);
  //             setStatusCaption('');
  //             setUpImg(null)
  //           });
  //       } else {
  //         alert('Try with another method.');
  //         setLoading(false);
  //       }
  //     });
  //   } else {
  //     alert('Select photo')
  //     setLoading(false);
  //   }
  // }

  return (
    <>
      {/*     
    {loading &&
            <div className="popupImageCrop">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        }
      {popUpImageCrop &&
        <div className="popupImageCropForStatus">
          <div className="popupImageCrop__In" >
            <div className="image__Show_toCrop">
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </div>
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  display: 'none',
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0)
                }}
              />
            </div>
            <div className="CropImage__FinalButton">
              <button
                type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateDownload(previewCanvasRef.current, completedCrop)
                }
              >
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained" endIcon={<SendIcon />}>
                    Send
                  </Button>
                </Stack>
              </button>
            </div>
          </div>
        </div>
      }
      {showAddStory && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon"
                onClick={() => {
                  setUpImg(null);
                  setCroppedImage(null);
                  setShowAddStory(false)
                }
                }
              />
            </div>
            <div className="group_photo">
              <div className="popUpTOP">
              </div>
              <div className="group_photo_Image" style={{ alignItems: "center", justifyContent: "center" }}>
                {
                  !croppedImage ?
                    <>
                      <input
                        type="file"
                        id={"image"}
                        style={{ display: "none" }}
                        onChange={onSelectFile}
                        accept="image/git , image/jpeg , image/png"
                      />
                      <label htmlFor="image" onClick={() => {
                        setPopUpImageCrop(true)
                      }}>
                        <p>Select Photo for status</p>
                      </label></>
                    :
                    <img src={URL.createObjectURL(croppedImage)} alt="" style={{ maxHeight: "50%", maxWidth: "50%", alignItems: "center", justifyContent: "center" }} />
                }
              </div>
              <div className="learning_detail">
                <input
                  type="text"
                  placeholder="Caption"
                  maxlength="70"
                  value={statusCaption}
                  onChange={(e) => setStatusCaption(e.target.value)}
                />
              </div>
              <div className="start_button">
                <button onClick={sendStory} >Upload</button>
              </div>
            </div>
          </div>
        </Container>
      )
      } */}
      <div className='home'>
        {/* <Header /> */}
        <HeaderSecond />
        <div className="homeBody">
          <div className="stories">
            <div className="createStory" >
              <CreateStory />
            </div>
            <ShowStoriesSeries />
          </div>
          {/* background-color: rgba(128, 128, 128, 0.329); */}

          {<div className="recommendPosts">
            {postHome && postHome.map((data) => (
              <PostCard data={data} />
            ))}
          </div>}
        </div>
      </div>
    </>
  )
}

export default Home;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .addLearning {
    background-color: #fff;
    width: 400px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    @media (max-width: 500px) {
      width: 85vw;
    }

    .add_learning_header {
      display: flex;
      justify-content: flex-end;

      .close_icon {
        margin-right: 5px;
        &:hover {
          color: #6d6969;
          cursor: pointer;
        }
      }
    }

    .group_photo {
      display: flex;
      justify-content: center;
      align-item:center;
      flex-direction: column;
      width:100%;
      .group_photo_Image{
          display:flex;
          flex-direction: column;
          align-item:center !important;
          justify-content:center;
          padding:4px 0 8px 0 ;
      }
      .group_photo_avatar {
        width: 150px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
      }

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

    .learning_detail {
      width: 100%;
      display: flex;
      justify-content: center;

      input {
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px;
        border: 1px solid gray;
        padding: 10px;
        width: 80%;
        outline: 0;
      }
    }
  }

  .start_button {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    width: 95%;

    button {
      width: 80px;
      padding: 7px;
      padding-top: 10px;
      padding-bottom: 10px;
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
`;

// export default NewLearningPopup;