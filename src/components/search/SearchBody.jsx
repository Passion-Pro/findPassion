import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './SearchBody.css';
import SearchName from './SearchName';

function SearchBody() {
    const [{ userInfo, searchInput }, dispatch] = useStateValue();
    var limit = 3;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (userInfo?.passion) {
            db.collection("users")
                .where("passion", "==", userInfo?.passion)
                .get()
                .then((querySnapshot) => {
                    setData(querySnapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc?.id
                    })))
                })
        }
    }, []);
 
    return (
        <div className='SearchBody'>
            {data && data.filter(item => {
                return item?.data?.name.toLowerCase().includes(searchInput.toLowerCase())
            }).map((data) => (
                <SearchName data={data} />
            ))}
        </div>
    )
}

export default SearchBody
