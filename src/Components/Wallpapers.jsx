import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import axios from "axios";

export default function Wallpaper(props) {

  const navigate = useNavigate();
  const [wallpapers, setWallpapers] = useState([]);
  const [likedWallpaper, setLikedWallpaper] = useState([]);
  const userid = sessionStorage.getItem("userId");
  let avatarText;
  const email = props.email;
  if (email != undefined) {
    avatarText = email[0].toUpperCase();
  } else {
    avatarText = "G";
  }
  useEffect(() => {
    axios
      .get("https://localhost:7133/posts")
      .then((res) => {
        setWallpapers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (userid) {
      const likedUrl = "https://localhost:7133/likedposts/" + userid;
      axios
        .get(likedUrl)
        .then((res) => {
          setLikedWallpaper(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function downloadImage(url, imageName) {
    saveAs(url, imageName);
  }

  function Logout() {
    axios.get("https://localhost:7133/api/Authorization/logout").then((res) => {
      if (res.status === 200) {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userEmail");
        navigate("/home");
      }
    });
  }

  
  function likeWallpaper(buttonId, id) {
    const likeUrl = "https://localhost:7133/like/" + id + "/" + userid;
    const dislikeUrl = "https://localhost:7133/dislike/" + id + "/" + userid;
    const button = "button" + buttonId;
    console.log(button);
    const likeFill = window.document.getElementById(button);
    const likeStatus = likeFill.getAttribute("like");
    const likecount = window.document.getElementById("like" + buttonId);
    console.log(likeStatus);

    if (userid) {
      if(likeStatus == 0) 
      {
        axios
          .post(likeUrl)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Wallpaper Liked",
              showConfirmButton: false,
              timer: 650,
              width: "250px",
            });
            likeFill.innerHTML =
              '<i class="material-icons text-danger">favorite</i>';
            likeFill.setAttribute("like", "1");
            likecount.innerText++;
          })
          .catch((err) => {
            console.log(err);
          });
      } 
      
      if(likeStatus == 1)
      { 
        console.log(likeStatus);
        axios
          .post(dislikeUrl)
          .then((res) => {
            console.log(res.data);
            likeFill.innerHTML =
              '<i class="material-icons ">favorite_border</i>';
            likeFill.setAttribute("like", "0");
            likecount.innerText--;
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Wallpaper Disliked",
              showConfirmButton: false,
              timer: 500,
              width: "250px",
            });
          })
          .catch((err) => {
            conso.log(err);
          });
      }
    }
    else navigate("/login")
  }

  return (
    <div>
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
          <IconButton aria-label="logout" onClick={() => Logout()}>
            <ExitToAppIcon color="primary" />
          </IconButton>
          <p className="d-inline">Logout</p>
        </div>
      </div>
      <div className="wallpaper-container">
        <div className="wallpapers-list">
          {wallpapers.map((item, index) => (
            <div className="wallpaper" key={index}>
              <div className="image-container">
                <img src={item.postFile} alt="Loading ..." />
              </div>
              <div className="wallpaper-description">
                <h5>{item.postTitle}</h5>
              </div>
              <div className="wallpapers-actions-list">
                { item.postLike>0 && likedWallpaper.some((obj) => obj.postId === item.postId) ? (
                  <IconButton
                    aria-label="unlike"
                    like="1"
                    id={"button" + index}
                    onClick={() => {
                      likeWallpaper(index, item.postId);
                    }}
                  >
                    <FavoriteIcon  color="error"/>
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="like"
                    like="0"
                    id={"button" + index}
                    onClick={() => {
                      likeWallpaper(index, item.postId);
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                )}

                <p className="d-inline-block" id={"like" + index}>
                  {item.postLike}
                </p>
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
    </div>
  );
}
