import * as React from 'react';
import './ProfileCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import ProfileImage from '../profile/ProfileImage';
import { useHistory } from 'react-router-dom';

function ProfileCard({ data }) {

  const history = useHistory();

  const learning = 'Currently i am learning Bloakchain guys.Currently i am learning Bloakchain guys.Currently i am learning Bloakchain guys';
  const learned = 'Kailashpur, Dehradun';
  const State = "UttaraKhand";
  var lengthOfArray=0;

  return (
    <Card className='profilecard' onClick={() => {
      history.push(`viewprofile/${data?.id}`);
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={'https://www.teahub.io/photos/full/150-1504904_graphic-designer-backgrounds-graphic-design.jpg'}
          alt="green iguana"
        />
        <div className='profileimage__profilecard'>
          <Avatar src={data?.data?.profilePhotoUrl} alt="" style={{ display: "flex", height: 120, width: 120, borderRadius: '50%' }} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{color:'#0a2540'}}>
            {data?.data?.name}<br />
            <div className='profile__subInterst'>{data?.data?.subInterest ? data?.data?.subInterest : ' not set yet '}</div>
          </Typography>
          <Typography variant="body2" color="#0a2540" style={{fontWeight:'bold'}}>
            {learning && learning.length>60 ? 
            <div>
            {learning.slice(0,60)} ...
            </div>:
            <div>
              {learning}
            </div>
            }
          </Typography>
          <div className="profile__last">
          <div className='profile__qualities'>Qualities</div>
            <div className="profile__address">
             {data?.data?.qualities.map((qualities)=>(
               <>
              {lengthOfArray<20 && <div className='profile__qualitiesName' >{qualities},</div >} 
              <div style={{display:'none'}}>{lengthOfArray=lengthOfArray+qualities.length}</div>
               </>
             ))
            }
             {lengthOfArray>20 && '...'}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProfileCard;