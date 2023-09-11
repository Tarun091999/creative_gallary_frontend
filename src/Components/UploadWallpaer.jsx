import { useState  , useEffect} from "react";
import { Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function UploadWallpaper(props) {
  const navigate = useNavigate();
  const [imgsrc, setImgsrc] = useState("");
  const [img, setImg] = useState("Images/Upload-File-2.png");
  const [imgDescription, setImgDescription] = useState("");
  const UserId = sessionStorage.getItem("userId");
  useEffect(()=>{
   const UserId = sessionStorage.getItem("userId");
   if (UserId==null)
   {
    navigate("/login")
   }
  })

  const setpage = props.selectPage;
  console.log(setpage)
  let url;
  const saveImage = async (e) => {
    console.log(img);
    if (e.target.files && e.target.files[0]) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (x) => {
        setImg(x.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function getWallpaperLink() {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "Tutorial");
    data.append("cloud_name", "di6dolmjt");

   await   fetch("  https://api.cloudinary.com/v1_1/di6dolmjt/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then ( (data) => {
       url = data.url
      })
      .catch((err) => console.log(err));
  }
 async function uploadImage (url)
 {

      await axios
          .post("https://localhost:7133/add-post", {
            postTitle: imgDescription,
            postFile: url,
            id: UserId,
            postLike: 0,
          })
          .then((res) => {
            
            if (res.status == 200) {
              Swal.fire({
                position: "bottom-end",
                icon: "success",
                title: " Your Wallpaper Is Successfully Inserted !!!",
                showConfirmButton: false,
                timer: 2000,
                width: "250px",
              });
  
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              position: "bottom-end",
              icon: "error",
              title: "Something went wrong !!!",
              showConfirmButton: false,
              timer: 2000,
              width: "250px",
            });
          });
 } 
  const handleSubmit = async(e) => {
    e.preventDefault();
    await getWallpaperLink();
    console.log(url)
    console.log("get wallpaper Link...............")
    await uploadImage (url);
    console.log("testing......................")
    // navigate("/gallary");
    setpage("gallary");
  };

  return (
    <>
      <div className="add-wallpaper-container">
        <div className="card">
          <input
            type="text"
            id="wallpaper-description-textbox"
            placeholder="Enter Image Description"
            className="form-control my-2"
            value={imgDescription}
            onChange={(e) => {
              setImgDescription(e.target.value);
            }}
          />
          <div className="card-image">
            <img src={img} className="card-img-top " alt="card Image" />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept="Image/*"
                id="file"
                onChange={saveImage}
                className=" my-2"
              />
              <div id="add-wallpaper-actions">
                <label id="file-input-label" for="file">
                  Select Your Wallpaper
                </label>

                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<UploadFile />}
                  type="submit"
                >
                  Upload Wallpaper
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
