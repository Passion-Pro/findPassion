import React, { useEffect, useState } from 'react';
import './ShowStory.css'
import db from '../../firebase';
import Stories from './Stories';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useStateValue } from '../../StateProvider';


function ShowStoriesSeries() {
    const [{ user,userInfo }] = useStateValue();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        if (userInfo?.name) {
            db.collection(userInfo?.passion)
                .doc('Csb15iOnGedmpceiQOhX')
                .collection("Stories")
                .onSnapshot((snapshot) => {
                    setStories(
                        snapshot.docs.map((doc) => ({
                            data: doc.data(),
                            id: doc.id,
                        }))
                    );
                })
        }
    }, [userInfo])

    return (
        <div className='stories__div'>
            {stories.map((data) => (
                <>
               { data?.data?.userEmail!=user?.email &&  
                <Stories data={data} />}
                </>
            ))}
            
            <div className="Arrow__showrecommend">
                <ArrowForwardIosRoundedIcon className='Arrow__showrecommendIn' />
            </div>
        </div>
    )
}

export default ShowStoriesSeries
