import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {styled } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CollectionsIcon from '@mui/icons-material/Collections';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import 'bootstrap/dist/css/bootstrap.min.css'
import PersonIcon from '@mui/icons-material/Person';


export default function Navigationbar(props) {

  const TabBarButton = styled(BottomNavigationAction)({
    selected: {
      color: "#b396b4",
    },
  });
  
  const [value, setValue] = React.useState('gallary');
  const setpage = props.selectpage;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setpage(newValue);
  };
   
  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange} className='bottom-nav-container' >
      <TabBarButton
        label="Gallary"
        value="gallary"
        icon={< CollectionsIcon />
        }
        id='gallary'
        className='bottom-nav-link'
      />
      <TabBarButton
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
        className='bottom-nav-link'
        id='favorites'
      />
      <TabBarButton
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
        className='bottom-nav-link'
        id='profile'
      />
      <TabBarButton label="Upload" value="upload-wallpaper" icon={<UploadIcon />} 
       className='bottom-nav-link'id='upload-wallpaper'/>
    </BottomNavigation>
  );
}