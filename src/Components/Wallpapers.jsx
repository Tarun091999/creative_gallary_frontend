import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";
import ReactLoading from "react-loading";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Wallpaper(props) {
  const navigate = useNavigate();
  const [wallpapers, setWallpapers] = useState([]);
  const [likedWallpaper, setLikedWallpaper] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [login, setLogin] = useState(false);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const userid = sessionStorage.getItem("userId");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  let avatarText;
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [commentCount , setCommentCount]= useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const email = props.email;
  if (email != undefined) {
    avatarText = email[0].toUpperCase();
  } else {
    avatarText = "G";
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function stopListening() {
    SpeechRecognition.stopListening();
    console.log(transcript);
    setLoading(false);
    setSearch(true);
    setSearchText(transcript);
    let url = "https://localhost:7133/posts/" + transcript;
    axios
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          setWallpapers(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setWallpapers([]);
      });
  }

  console.log(searchText);

  function startListening() {
    SpeechRecognition.startListening();
    setLoading(true);
  }
  useEffect(() => {
    if (searchText == "") {
      axios
        .get("https://localhost:7133/posts")
        .then((res) => {
          setWallpapers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
    if (userid) {
      setLogin(true);
    }
  }, []);

  function downloadImage(url, imageName) {
    saveAs(url, imageName);
  }

  function Logout() {
    if (userid) {
      axios
        .get("https://localhost:7133/api/Authorization/logout")
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("userEmail");
            navigate("/home");
          }
        });
    }
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
      if (likeStatus == 0) {
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
      if (likeStatus == 1) {
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
    } else navigate("/login");
  }

  function GetSearchData() {
    let url = "https://localhost:7133/posts/" + searchText;
    axios
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          setWallpapers(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setWallpapers([]);
      });
  }

  const SearchProduct = debounce(() => GetSearchData());

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function AddComment(postid) {
    if(!userid)
    {
      navigate("/login");
    }
    
    setShow(true);
    setComment("");
    setSelectedPost(postid);
    let url = "https://localhost:7133/comments?PostId=" + postid;
    axios
      .get(url)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function postComment() {
    console.log(userid);
    if (selectedPost) {
      console.log(selectedPost);
      let url = "https://localhost:7133/api/Comment/add-comment";
      axios
        .post(url, {
          comment: comment,
          postId: selectedPost,
          userId: userid,
        })
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Comment is Successfully Posted",
              showConfirmButton: false,
              timer: 650,
              width: "250px",
            });
            setShow(false);
            setSelectedPost("");
            setComment("");
          }
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Please Enter Comment ",
            showConfirmButton: false,
            timer: 1000,
            width: "250px",
          });
        });
    }
  }

  return (
    <div>
      <div className="search-bar">
        <div className="CG-logo-div">
          <p>
            <span className="CG-logo-Start">Creative</span>{" "}
            <span className="CG-logo-End"> Gallary </span>
          </p>
        </div>
        <div className="search-box">
          <input
            type="Text"
            id="searchbox"
            className=" search-input"
            placeholder="Search Wallpapers"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={SearchProduct}
          />

          <div className="loading-div">
            {loading && (
              <ReactLoading
                type={"bars"}
                color={"purple"}
                height={""}
                width={"50%"}
                className="loader"
              />
            )}
          </div>
          <div className="microphone-div">
            <div className="microphone-button">
              <IconButton
                variant="contained"
                size="large"
                onMouseDown={() => {
                  startListening();
                }}
                onMouseUp={() => {
                  stopListening();
                }}
              >
                <Mic fontSize="medium" className="search-mic" />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="search-account">
          <div className="search-bar-avatar">
            <Avatar className="name-avatar">{avatarText}</Avatar>
          </div>
          {login && (
            <div className="search-bar-add-ons">
              <IconButton aria-label="logout" onClick={() => Logout()}>
                <ExitToAppIcon color="primary" />
              </IconButton>
              <p className="d-inline">Logout</p>
            </div>
          )}
          {!login && (
            <div className="search-bar-add-ons">
              <IconButton
                aria-label="logout"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <LoginIcon color="primary" />
              </IconButton>
              <p className="d-inline">Login</p>
            </div>
          )}
        </div>
      </div>

      <div className="wallpaper-container">
        <div className="wallpapers-list">
          {wallpapers.length > 0 ? (
            wallpapers.map((item, index) => (
              <div className="wallpaper" key={index}>
                <div className="image-container">
                  <img src={item.postFile} alt="Loading ..." />
                </div>
                <div className="wallpaper-description">
                  <h5>{item.postTitle}</h5>
                </div>
                <div className="wallpapers-actions-list">
                  {item.postLike > 0 &&
                  likedWallpaper.some((obj) => obj.postId === item.postId) ? (
                    <IconButton
                      aria-label="unlike"
                      like="1"
                      id={"button" + index}
                      onClick={() => {
                        likeWallpaper(index, item.postId);
                      }}
                    >
                      <FavoriteIcon color="error" />
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
                    className="mx-2"
                    onClick={() => {
                      AddComment(item.postId);
                    }}
                  >
                    <CommentIcon />
                  </IconButton>
                  

                  <Modal
                    show={show}
                    onHide={handleClose}
                    className="comment-modal "
                    centered
                  >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="comments-div">
                        {commentList.length > 0 ? (
                          <div>
                            {commentList.map((i) => (
                              <div className="comment">
                                <div className="userComment">
                                  <Avatar className="comment-avater">
                                    {i.userName[0].toUpperCase()}
                                  </Avatar>
                                  <p>{i.userName}</p>
                                </div>
                                <div className="comment-text">
                                  <p>{i.comment + "...."}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
                            <h4 className="text-center no-comment-warning">
                              No Comment Available !!!{" "}
                            </h4>
                          </div>
                        )}
                      </div>
                      <div className="comment-input">
                        <input
                          type="text"
                          id="comment-box"
                          className="form-control w-75"
                          placeholder="Write Your Comment Here !!"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        />

                        <IconButton
                       aria-label="download"
                       className="comment-button"
                       onClick={() => {
                        postComment();
                      }}
                      >
                    <CommentIcon />
                  </IconButton>
                      </div>
                    </Modal.Body>
                  </Modal>

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
            ))
          ) : (
            <div className="no-wallpaper-warning">
              <ReactLoading
                type={"spin"}
                color={"purple"}
                height={""}
                width={"20px"}
                className="loader d-block"
              />
              :<h2>No Wallpaper Found !!!!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
