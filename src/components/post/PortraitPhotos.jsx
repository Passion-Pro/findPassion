import react, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './AddPost.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Header from '../header/Header';
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function PortraitPhotos() {
    const [popUpImageCrop, setPopUpImageCrop] = useState(false);
    console.log("object", popUpImageCrop)
    const [upImg, setUpImg] = useState();
    const [croppedImage, setCroppedImage] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 4/5});
    const [completedCrop, setCompletedCrop] = useState(null);

    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                setCroppedImage(blob);
                setPopUpImageCrop(false);
                console.log('fuck')
            },
            'image/png',
            1
        );
    }
    useEffect(() => {
        console.log("object", popUpImageCrop)
    }, [popUpImageCrop]);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
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

    return (
        <>
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
                    <Header />
                    <div className="addPost__In">
                        <div className="addPost__InIN">
                            <div className="adddPost__Head">
                                Portrait Post
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
                                    <textarea />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button__uploadImage">
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Upload
                            </Button>
                        </Stack>
                    </div>
                </div>
            }
        </>
    );
}
