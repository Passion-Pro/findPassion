import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import Stories from './Stories';

function ShowStoriesSeries() {
    const [stories, setStories] = useState([]);

    useEffect(()=>{
        db.collection("Web-development")
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
    },[])

    return (
        <div className='stories__div'>
            {stories.map((data) => (
                <Stories data={data} />
            ))}
            {stories.map((data) => (
                <Stories data={data} />
            ))}
        </div>
    )
}

export default ShowStoriesSeries
