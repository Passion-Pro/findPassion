import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Learning from './Learning';
import PostCard from '../post/PostCard'

function WorldPage() {
  const history = useHistory();
  const [{ searchInput, user }, dispatch] = useStateValue();
  const [learnings, setLearnings] = useState([]);
  var mm=false;
  const newlearnings = [];
  useEffect(() => {
    db.collection("learnings").onSnapshot((snapshot) => {
      setLearnings(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    })
    console.log(searchInput);
  }, []);


  return (
    <div>
      <div className="options_buttons">
        <button className="stories_button"
          onClick={(e) => history.push("/peopleforsearch")}
        >People</button>
        <button className="learnings_button"
          onClick={(e) => history.push("/worldforsearch")}
          style={{
            marginLeft: '10px'
          }}
        >Learnings</button>
        <button className="stories_button"
          style={{
            marginLeft: '10px'
          }}
          onClick={(e) => history.push("/postforsearch")}
        >
          Posts
        </button>
      </div>
      <div className="all_learnings" style={{paddingLeft:'5vw'}}>
        {learnings.length>0 &&
          learnings.filter(item => {
            return item?.data?.learning.toLowerCase().includes(searchInput.toLowerCase())
        })
            .map((learning) => (
              <>{learning?.data?.started_by.email !== user?.email &&
                <>
                <Learning learning={learning} type='all' Nodata={true}/>
                {mm=true}
                </>
              }</>))

            }
            {!mm && <PostCard type='all' Nodata={false}/>}
      </div>
    </div>
  )
}

export default WorldPage