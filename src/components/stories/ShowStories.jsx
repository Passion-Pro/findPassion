import React from 'react';
import './ShowStory.css';
import {useStateValue} from '../../StateProvider';
import { actionTypes } from '../../reducer';

function ShowStories() {

    const [{ showStory, showStoryCaption }, dispatch] = useStateValue();
    const caption = `What Elon did was very different. He didn’t just throw some play money in. He put in his heart, his soul and his mind.
    Elon Musk founded SpaceX under the belief that 'a future where humanity is out exploring the stars is fundamentally more exciting than one where we are not.' The company was founded in 2002, with the ultimate goal of enabling human life on Mars. Musk envisions a future where humans live in a spacefaring civilization, frequent voyages from Earth to Mars and vice-versa.`;

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
                <div className="popUpTOP">
                    <div className="popUpTOP__first">
                        Elon Musk
                    </div>
                </div>
                <div className="popupbodyImage_Img">
                    <img src='https://images.unsplash.com/photo-1616578492900-ea5a8fc6c341?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8OSUzQTE2fGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="img" className="popupbody_Image_img" />
                    {!showStoryCaption && <h6 className='popupbodyImage_Img__Captionless' onClick={() => {
                        dispatch({
                            type: actionTypes.SET_SHOWSTORY_CAPTION,
                            showStoryCaption: true,
                        })
                    }}>
                        {
                        caption.length > 30 && <> {caption.slice(0,30)}
                            <span className='See__More'> ... see more</span></>
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
                        {caption.length > 20 && <> {caption} <span className='See__More'> ... see less</span></>
                        }
                    </h6>}
                </div>
            </div>
        </>
    )
}

export default ShowStories