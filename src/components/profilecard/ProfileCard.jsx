import * as React from 'react';
import './ProfileCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import ProfileImage from '../profile/ProfileImage';
import { useHistory } from 'react-router-dom';

function ProfileCard({data}) {
  
  const history=useHistory();

  return (
    <Card className='profilecard' onClick={()=>{
      history.push(`viewprofile/${data?.id}`);
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={'https://www.teahub.io/photos/full/150-1504904_graphic-designer-backgrounds-graphic-design.jpg'}
          // image={data?.data?.backgroundimage}
          alt="green iguana"
        />
        <div className='profileimage__profilecard'>
        <Avatar src={data?.data?.profilePhotoUrl} alt="" style={{display: "flex",height: 120,width: 120,borderRadius: '50%'}}/>  
        </div>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
           {data?.data?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {data?.data?.subInterest}<br/>
           {data?.data?.learned}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default  ProfileCard;