import * as React from 'react';
import './ProfileCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ProfileImage from '../profile/ProfileImage';

function ProfileCard({data}) {
  return (
    <Card className='profilecard'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?.backgroundimage}
          alt="green iguana"
        />
        <div className='profileimage__profilecard'>
        <img src={data.profileimage} alt="" /> 
        </div>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
           {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {data.learning}<br/>
           {data.learned}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default  ProfileCard;