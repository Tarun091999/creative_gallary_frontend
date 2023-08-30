import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import UploadIcon from '@mui/icons-material/Upload';
import CollectionsIcon from '@mui/icons-material/Collections';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import 'bootstrap/dist/css/bootstrap.min.css'
import { colors } from '@mui/material';

export default function Navigationbar(props) {
  const [value, setValue] = React.useState('gallary');
  const setpage = props.selectpage;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setpage(newValue);
    
  };
   
  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange} className='bottom-nav-container' >
      <BottomNavigationAction
        label="Gallary"
        value="gallary"
        icon={< CollectionsIcon />
        }
        className='bottom-nav-link'
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
        className='bottom-nav-link'
      />
      <BottomNavigationAction
        label="Share"
        value="share"
        icon={<ShareIcon />}
        className='bottom-nav-link'
      />
      <BottomNavigationAction label="Upload" value="upload-wallpaper" icon={<UploadIcon />} 
       className='bottom-nav-link'/>
    </BottomNavigation>
  );
}