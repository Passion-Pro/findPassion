import React, { useEffect, useState } from 'react';
import './ShowStory.css';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { useHistory, useParams } from 'react-router-dom';
import db from '../../firebase';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function ShowStories() {
    const [{ userInfo,showStoryCaption }, dispatch] = useStateValue();
    const { id } = useParams();
    const [story, setStory] = useState([])
    const history=useHistory();

    // const caption = `What Elon did was very different. He didn’t just throw some play money in. He put in his heart, his soul and his mind.
    // Elon Musk founded SpaceX under the belief that 'a future where humanity is out exploring the stars is fundamentally more exciting than one where we are not.' The company was founded in 2002, with the ultimate goal of enabling human life on Mars. Musk envisions a future where humans live in a spacefaring civilization, frequent voyages from Earth to Mars and vice-versa.`;

    useEffect(() => {
        if (id) {
            db.collection(userInfo?.passion)
                .doc('Csb15iOnGedmpceiQOhX')
                .collection("Stories")
                .doc(id)
                .onSnapshot((snapshot) => {
                    setStory(
                        snapshot.data()
                    );
                })
        }
    }, [id])

    useEffect(()=>{
        dispatch({
            type: actionTypes.SET_PATHNAMEF,
            pathnamef: "/viewstory",
          })
    },[])
 
    return (
        <>
            <div className='ViewStory'
                onClick={() => {
                    !showStoryCaption && dispatch({
                        type: actionTypes.SET_SHOWSTORY,
                        showStory: false,
                    })
                    showStoryCaption && dispatch({
                        type: actionTypes.SET_SHOWSTORY_CAPTION,
                        showStoryCaption: false,
                    })
                }}
            >
               
               <div className="ViewStory__head">
               <div className="popUpTOP">
                    <div className="popUpTOP__BackIcon" onClick={()=>{
                        history.push('/')
                    }}>
                        <ArrowBackRoundedIcon/>
                    </div>
                    <div className="popUpTOP__first">
                        {story?.username}
                    <div style={{display:"flex",fontSize:'x-small',color:'rgb(66, 62, 62)'}}>
                    {story?.date}
                    </div>
                    </div>
                </div>
                
               </div>
                <div className="popupbodyImage_Img">
                    <img src={story?.imageURL} alt="img" className="popupbody_Image_img" />
                    {!showStoryCaption && <h6 className='popupbodyImage_Img__Captionless' onClick={() => {
                        dispatch({
                            type: actionTypes.SET_SHOWSTORY_CAPTION,
                            showStoryCaption: true,
                        })
                    }}>
                        {
                            story?.postText && story?.postText.length > 30 ? <> {story?.postText.slice(0, 30)}
                                <span className='See__More'> ... see more</span></>:<>{story?.postText}</>
                        }
                    </h6>}
                    {showStoryCaption && <h6 className={'popupbodyImage_Img__Caption'} onClick={() => {
                        dispatch({
                            type: actionTypes.SET_SHOWSTORY_CAPTION,
                            showStoryCaption: false,
                        })
                        dispatch({
                            type: actionTypes.SET_SHOWSTORY,
                            showStory: true,
                        })
                    }}>
                        {story?.postText && story?.postText.length > 20 && <> {story?.postText && story?.postText} <span className='See__More'> ... see less</span></>
                        }
                    </h6>}
                </div>
            </div>
        </>
    )
}

export default ShowStories