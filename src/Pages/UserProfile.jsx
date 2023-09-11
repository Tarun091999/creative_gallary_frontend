import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShareIcon from "@mui/icons-material/Share";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

export default function UserProfile(props) {
  const setpage = props.selectPage;
  const navigate = useNavigate();
  const [wallpapers, setWallpapers] = useState();
  const userId = sessionStorage.getItem("userId");
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      let url = "https://localhost:7133/profile/" + userId;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setWallpapers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  function downloadImage(url, imageName) {
    saveAs(url, imageName);
  }

  function deleteWallpaper(id) {
    var response = confirm("Do you really want to delete this wallpaper");
    if (response) {
      let url = "https://localhost:7133/profile/delete/" + id;
      axios.get(url).then((res) => {
        if (res.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Wallpaper Deleted",
            showConfirmButton: false,
            timer: 650,
            width: "250px",
          });

          setpage("gallary");
        }
      });
    }
  }

  return (
    <>
      <div className="wallpaper-container">
        <div className="wallpapers-list">
          {wallpapers != null ? (
            wallpapers.length > 0 ? (
              wallpapers.map((item, index) => (
                <div className="wallpaper" key={index}>
                  <div className="image-container">
                    <img src={item.postFile} alt="Loading ..." />
                  </div>
                  <div className="wallpaper-description">
                    <h5>{item.postTitle}</h5>
                  </div>
                  <div className="wallpapers-actions-list">
                    <IconButton aria-label="like">
                      <FavoriteIcon color="error" />
                    </IconButton>
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
                    <IconButton
                      aria-label="like"
                      className="profile-delete-button"
                      onClick={() => {
                        deleteWallpaper(item.postId);
                      }}
                    >
                      <DeleteForeverIcon color="warning" />
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-wallpaper-warning">
                {" "}
                <h1>No Wallpaper Has Uploaded By You </h1>{" "}
              </div>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
