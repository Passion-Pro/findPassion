import react, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './CreateStoryPage.css';
import { v4 as uuid } from "uuid";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Header from '../header/Header';
import Button from '@mui/material/Button'; 
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import firebase from "firebase";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import { actionTypes } from '../../reducer';

export default function CreateStoryPage() {
    const history = useHistory();
    const [{ userInfo, user }, dispatch] = useStateValue();
    
    useEffect(()=>{
        dispatch({
            type: actionTypes.SET_PATHNAMEF,
            pathnamef: "/createStory",
          })
    },[])

    const [loading, setLoading] = useState(false);
    const [postText, setPostText] = useState('');
    const [popUpImageCrop, setPopUpImageCrop] = useState(false);
    const [upImg, setUpImg] = useState(null);
    const [upImgImage, setUpImgImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9/16 });
    const [completedCrop, setCompletedCrop] = useState(null);

    var today = new Date();
    var datetime = today.toLocaleString();

    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                setCroppedImage(blob);
                setPopUpImageCrop(false);
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

    if (croppedImage) {
        console.log("?", upImgImage.name);
    }

    const UploadImage = async () => {
        setLoading(true)
        if (croppedImage && userInfo) {
            const id = uuid();
            const imagesRef = firebase.storage().ref("StoryImages").child(id);
            await imagesRef.put(croppedImage);
            imagesRef.getDownloadURL().then((url) => {
                if (user.uid) {
                    db.collection(userInfo?.passion)
                        .doc('Csb15iOnGedmpceiQOhX')
                        .collection("Stories")
                        .doc(id)
                        .set({
                            username: userInfo.name,
                            userEmail: userInfo.email,
                            imageURL: url,
                            date: datetime,
                            postType: 'Story', 
                            postText: postText,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageName: id,
                            imageOriginalName: upImgImage.name,
                            profilePhotoUrl:userInfo.profilePhotoUrl,
                        })
                        .then(() => {
                            // adding post in user private collection
                            db.collection("users")
                                .doc(user.uid) 
                                .update({
                                    statusID: id, 
                                })
                                .then(() => {
                                    setLoading(false); 
                                    setPostText('');
                                    setLoading(false);
                                    setCroppedImage(null);
                                    history.push('/');
                                });
                        });
                } else {
                    alert('Try with another method.');
                    setLoading(false);
                    history.push('/');
                }
            });
        } else {
            alert('Select photo')
            setLoading(false);
            history.push('/');
        }
    }

    return (
        <>{loading &&
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
            {
                <div className="addPost">
                    {/* <Header /> */}
                    <div className="addPost__In">
                        <div className="addPost__InIN">
                            <div className="adddPost__Head">
                                Regular Post
                                {/* <div className="button__uploadImage"> */}
                                <Stack direction="row">
                                    <Button variant="contained" onClick={UploadImage} endIcon={<SendIcon />}>
                                      Send
                                    </Button>
                                </Stack>
                                {/* </div> */}
                            </div>
                            <div className="addPost__Image">
                                {!croppedImage && <div className="Upload__ImageIcon" onClick={() => {
                                    setPopUpImageCrop(true)
                                }}>
                                    <label htmlFor="image">
                                        <AddAPhotoIcon
                                            className="footer_icon"
                                            style={{ fontSize: 15 }}
                                        />
                                        Add Photo
                                    </label>
                                    <input
                                        type="file"
                                        id={"image"}
                                        style={{ display: "none" }}
                                        onChange={onSelectFile}
                                        accept="image/git , image/jpeg , image/png"
                                    />
                                </div>}
                                {croppedImage && <img src={URL.createObjectURL(croppedImage)} alt="" />}
                                <div className="addPost__Text">
                                    <textarea className='textareaSecond' placeholder='Write about the Status' onChange={e => setPostText(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
