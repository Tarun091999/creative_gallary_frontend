// import { TextField } from "@mui/material"
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { saveAs } from "file-saver";
import { Favorite } from "@mui/icons-material";
import TestRenderer from 'react-test-renderer';
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";

import Swal from "sweetalert2";


export default function Wallpaper(props) {
  const [wallpapers, setWallpapers] = useState([]);
  const [like, setLike] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7133/posts")
      .then((res) => {
        console.log(res.data);
        setWallpapers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let avatarText;
  const email = props.email;
  if (email != undefined) {
    avatarText = email[0].toUpperCase();
  } else {
    avatarText = "G";
  }
  function downloadImage(url, imageName) {
    saveAs(url, imageName);
  }

  function likeWallpaper(buttonId, id) {
    const likeUrl = "https://localhost:7133/like/"+ id;
    const dislikeUrl = "https://localhost:7133/dislike/" + id
     const button = "button"+ buttonId
    console.log(button)
     const likeFill= window.document.getElementById(button);
    const likeStatus = likeFill.getAttribute('like');
    console.log(likeStatus)

    if(likeStatus==0)
    {
      axios.post(likeUrl)
      .then((res)=>{

        console.log(res.data)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Wallpaper Liked",
          showConfirmButton: false,
          timer: 650,
          width: "250px",
        });
        likeFill.innerHTML= '<i class="material-icons text-danger">favorite</i>'
        likeFill.setAttribute("like","1")
      }).catch(err=>{
        conso.log(err)
      })
    }else{
      console.log(like)
       axios.post(dislikeUrl)
      .then((res)=>{
        console.log(res.data)
        likeFill.innerHTML= '<i class="material-icons ">favorite_border</i>'
        likeFill.setAttribute("like","0")
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Wallpaper Disliked",
          showConfirmButton: false,
          timer: 500,
          width: "250px",
        });
      }).catch(err=>{
        conso.log(err)
      })
    }
  }

  return (
    <>
      <div className="search-bar">
        <div className="search-bar-avatar">
          <Avatar className="name-avatar">{avatarText}</Avatar>
        </div>
        <div className="search-box">
          <input
            type="Text"
            id="searchbox"
            className="form-control"
            placeholder="Search Wallpapers"
          />
        </div>
        <div className="search-bar-add-ons">
          <IconButton aria-label="delete">
            <FavoriteIcon color="error" />
          </IconButton>
          <IconButton aria-label="delete">
            <DownloadIcon />
          </IconButton>
        </div>
      </div>
      <div className="wallpaper-container">
        <div className="wallpapers-list ">
          {wallpapers &&
            wallpapers.map((item, index) => (
              <div className="wallpaper" id ={index}>
                <div className="image-container">
                  <img src={item.postFile} alt="Loading ..." />
                </div>
                <div className="wallpaper-description">
                  <h5>{item.postTitle}</h5>
                </div>
                <div className="wallpapers=actions-list">
                  <IconButton
                    aria-label="like"
                    id = {"button"+ index}
                    like = "0"
                    onClick={() => {
                      likeWallpaper(index,item.postId,);
                    }}
                  >
                      <FavoriteBorderIcon />                    
                  </IconButton>
                  <IconButton
                    aria-label="download"
                    onClick={() => {
                      downloadImage(item.postFile, item.postTitle);
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <FacebookShareButton url={item.postFile} className="mx-2">
                    <FacebookIcon size={30} round={true} />
                  </FacebookShareButton>
                  <WhatsappShareButton url={item.postFile} className="mx-2">
                    <WhatsappIcon size={30} round={true} />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={item.postFile} className="mx-2">
                    <LinkedinIcon size={30} round={true} />
                  </LinkedinShareButton>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
