import React, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import db from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import './SearchBody.css';
import SearchName from './SearchName';

function SearchBody() {
    const [{ userInfo, searchInput,searchInputPassion }, dispatch] = useStateValue();
    var limit = 3;
    const [data, setData] = useState([]);
    const [newData,setNewData]=useState([]);
    const history=useHistory();

    useEffect(() => {
        if (searchInputPassion) {
            db.collection("users")
                .where("passion", "==", searchInputPassion)
                .get()
                .then((querySnapshot) => {
                    setData(querySnapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc?.id
                    })))
                })
                .then(()=>{
                    newData=data.filter(item => {
                        return item?.data?.name.toLowerCase().includes(searchInput.toLowerCase())
                    })
                })
        }
    }, []);

 
    return (
        <>
        <div className="options_buttons">
        <button className="learnings_button"
            onClick={(e) => history.push("/peopleforsearch")}
            >People</button>
            <button className="stories_button"
            onClick={(e) => history.push("/worldforsearch")}
            style = {{
                marginLeft : '10px'
              }}
            >Learnings</button>
            <button className="stories_button"
            style = {{
              marginLeft : '10px'
            }}
            onClick={(e) => history.push("/postforsearch")}
          >
            Posts
          </button>
        </div>
        <div className='SearchBody'>
            {newData.length>0 ? newData.filter(item => {
                return item?.data?.name.toLowerCase().includes(searchInput.toLowerCase())
            }).map((data) => (
                <SearchName data={data} Nodata={true} />
                )):<SearchName Nodata={false} />}
                {/* {
                    <SearchName Nodata={false} />
                } */}
        </div>
        </>
    )
}

export default SearchBody
