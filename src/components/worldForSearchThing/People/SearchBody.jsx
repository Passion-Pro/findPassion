import React, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import db from '../../../firebase';
import { useStateValue } from '../../../StateProvider';
import './SearchBody.css';
import SearchName from './SearchName';

function SearchBody() {
    const [{ userInfo, searchInput,searchInputPassion }, dispatch] = useStateValue(); 
    const [data, setData] = useState([]);
    const [n,setN]=useState(false)
    var mm=false;
    // var newData=[];
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
                // .then(()=>{
                //     newData=data.filter(item => {
                //         return item?.data?.name.toLowerCase().includes(searchInput.toLowerCase())
                //     })
                // })
        }
    }, []);

//  console.log("newData",newData)
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
            {data.length>0 && data.filter(item => {
                return item?.data?.name.toLowerCase().includes(searchInput.toLowerCase())
            }).map((data) => (
                <>
                <SearchName data={data} Nodata={true} />
                {mm=true}
                </>
                ))}
                {!mm && <SearchName data={data} Nodata={false} />}
        </div>
        </>
    )
}

export default SearchBody
