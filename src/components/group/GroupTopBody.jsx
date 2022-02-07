import react, { useState, useCallback, useRef, useEffect } from 'react';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import firebase from 'firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import ReactCrop from 'react-image-crop';

function GroupTopBody() {

  const [{ user, groupDetails, editGroup }, dispatch] = useStateValue();
  const [showImage, setShowImage] = useState(false);
  const [showImageProfile, setShowImageProfile] = useState(false);
  const [upImgImage, setUpImgImage] = useState(null);
  const [upImgImageProfile, setUpImgImageProfile] = useState(null);
  const [groupInfo, setGroupInfo] = useState([]);
  const [GroupStatus, setGroupStatus] = useState('');
  const [GroupName, setGroupName] = useState('');
  const [currentUpdate, setCurrentUpdate] = useState('');
  const [loading, setLoading] = useState(false);
  const [popUpImageCrop, setPopUpImageCrop] = useState(false);
  const [upImg, setUpImg] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 19 / 5 });
  const [completedCrop, setCompletedCrop] = useState(null);

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        setCroppedImage(blob);
        setPopUpImageCrop(false);
        setUpImg(null);
      },
      'image/png',
      1
    );
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUpImgImage(e.target.files[0])
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setPopUpImageCrop(true)
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);


  const AddImage = async () => {
    if (groupDetails?.id && user && croppedImage) {
      console.log(groupDetails?.id)
      const imagesRef = firebase.storage().ref("GroupImage").child(groupDetails?.id);
      if (groupDetails?.backgroundImage) {
        await imagesRef.delete().then(async () => {
          await imagesRef.put(croppedImage);
          imagesRef.getDownloadURL().then((url) => {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
              .update({
                backgroundImage: url,
              })
            setUpImgImage(null);
            setShowImage(false);
          })
        })
      } else if (croppedImage && user) {
        await imagesRef.put(croppedImage);
        imagesRef.getDownloadURL().then((url) => {
          db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
            .update({
              backgroundImage: url,
            });
          setUpImgImage(null);
          setUpImg(null);
          setCroppedImage(null);
          setShowImage(false);
        })
      }
    }
    else {
      alert('Something Wrong')
    }
  }

  const AddImageProfile = async () => {
    if (groupDetails?.id && user) {
      console.log(groupDetails?.id)
      const imagesRef = firebase.storage().ref("GroupImage").child(groupDetails?.id + 'profileImage');
      await imagesRef.delete().then(async () => {
        await imagesRef.put(upImgImageProfile);
        imagesRef.getDownloadURL().then((url) => {
          db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
            .update({
              ProfileImage: url,
            })
          setUpImgImageProfile(null);
        })
      })
    }
    else {
      alert('Something Wrong')
    }
  }

  const updateStatus = () => {
    if (user) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
        .update({
          GroupStatus: GroupStatus,
        })
    } else {
      alert('Something Wrong')
    }
  }

  const updateName = () => {
    if (user) {
      db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
        .update({
          GroupName: GroupName,
        }).then(() => {
          setGroupName('');
          setCurrentUpdate('');
        })
    } else {
      alert('Something Wrong')
    }
  }

  const delBackImage = async () => {
    if (groupDetails?.backgroundImage) {
      const imagesRef = firebase.storage().ref("GroupImage").child(groupDetails?.id);
      await imagesRef.delete().then(() => {
        db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(user.email).doc(user.uid + 'Details')
          .update({
            backgroundImage: '',
          })
        console.log('Success')
      })
    } else {
      alert("Nothing !")
    }
  }

  return (
    <>
      {
        loading &&
        <div className="popupImageCrop">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      }
      {popUpImageCrop &&
        <div className="popupImageCrop">
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
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Select
                  </Button>
                </Stack>
              </button>
            </div>
          </div>
        </div>
      }

      {showImage && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon"
                onClick={() => {
                  setUpImgImage(null);
                  setUpImg(null);
                  setCroppedImage(null);
                  setShowImage(false);
                }}
              />
            </div>
            <div className="group_photo">
              <div className="learning_detail">
                {console.log(croppedImage)}
                {croppedImage ? <img src={URL.createObjectURL(croppedImage)} style={{
                  width: '95%',
                }} alt="" /> :
                  <input
                    type="file"
                    placeholder="Select Image"
                    onChange={onSelectFile}
                  />}
              </div>
              <div className="start_button">
                <button onClick={AddImage} >Add</button>
              </div>
            </div>
          </div>
        </Container>
      )}

      {showImageProfile && (
        <Container>
          <div className="addLearning">
            <div className="add_learning_header">
              <CloseIcon className="close_icon"
                onClick={() => {
                  setShowImageProfile(false)
                }}
              />
            </div>
            <div className="group_photo">
              <div className="learning_detail">
                <input
                  type="file"
                  placeholder="Select Image"
                  onChange={e => setUpImgImageProfile(e.target.files[0])}
                />
              </div>
              <div className="start_button">
                <button onClick={AddImageProfile} >Add</button>
              </div>
            </div>
          </div>
        </Container>
      )}

      <div className="group__headBackgroundImg">
        <img src={groupDetails?.backgroundImage ? groupDetails?.backgroundImage : groupDetails?.DefaultbackgroundImage} alt="background image" />
        {editGroup && (<div className='group__Icon'>
          <div className="groupIcon__circle" title='Edit Group background image'>
            <AddAPhotoRoundedIcon className='AddAPhotoRoundedIcon' onClick={() => {
              setCurrentUpdate('back');
              setShowImage(true);
            }} />
          </div>
          {groupDetails?.backgroundImage && <div className="groupIcon__circle" title='Delete Group background image'>
            <DeleteIcon className='AddAPhotoRoundedIcon' onClick={delBackImage} />
          </div>}
        </div>)}
      </div>
      <div className="group__headImg">
        <div className="group__headPro">
          <img src={groupDetails?.ProfileImage} alt="profile image" />
          {editGroup && <div style={{ display: 'flex', position: "absolute", left: '125px', width: '100px', bottom: '10px', color: "gray" }} title='Edit Group image'>
            <AddAPhotoRoundedIcon onClick={() => {
              setCurrentUpdate('imageProfile');
              setShowImageProfile(true);
            }} />
          </div>}
        </div>
        <div className="group__details">
          <div className="Group__Details__Name">
            {currentUpdate == 'name' ?
              <div style={{ display: 'flex', height: "75%", marginTop: '8px' }}>
                <input onChange={e => setGroupName(e.target.value)} style={{ outline: 'none', marginRight: '15px' }} />

                <Stack spacing={2} direction="row">

                  <Button variant="contained" style={{ fontSize: "x-small" }} onClick={updateName}>Change</Button>


                  <Button variant="outlined" style={{ color: 'red', fontSize: "x-small" }} onClick={() => {
                    setGroupName('');
                    setCurrentUpdate('')
                  }}>Cancel</Button>

                </Stack>

              </div>
              : groupDetails?.GroupName}

            {editGroup && currentUpdate !== 'name' && <div title='Edit name of the group'><EditRoundedIcon onClick={() => {
              setCurrentUpdate('name')
            }} /></div>}
          </div>
          <div className="Group__Details__Status">
            <div className="status__group">
              {currentUpdate == 'status' ?
                <div style={{ display: 'flex', height: "75%", marginTop: '8px' }}>
                  <input onChange={e => setGroupStatus(e.target.value)} style={{ outline: 'none', marginRight: '15px' }} />
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" style={{ fontSize: "x-small" }} onClick={updateStatus}>Change</Button>
                    <Button variant="outlined" style={{ color: 'red', fontSize: "x-small" }} onClick={() => {
                      setGroupStatus('');
                      setCurrentUpdate('')
                    }}>Cancel</Button>
                  </Stack>
                </div>
                : groupDetails?.GroupStatus}
            </div>
            {editGroup && currentUpdate !== 'status' &&
              <div title='Edit status of the group'>
                <EditRoundedIcon onClick={() => {
                  setCurrentUpdate('status');
                }} />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default GroupTopBody;


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
z-index:101;

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
    align-items:center;
    flex-direction: column;
    width:100%;
    .group_photo_Image{
        display:flex;
        flex-direction: column;
        align-items:center !important;
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