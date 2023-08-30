import { useState } from "react";
import { Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

export default function AddWallpaper() {
  const [imgsrc, setImgsrc] = useState("");
  const [img, setImg] = useState("Images/Upload-File-2.png");
  const [imgDescription, setImgDescription] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "Tutorial");
    data.append("cloud_name", "di6dolmjt");
    fetch("  https://api.cloudinary.com/v1_1/di6dolmjt/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImgsrc(data.url);
      })
      .catch((err) => console.log(err));
  };

  console.log(img);
  console.log(imgDescription);

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
              <label id="file-input-label" for="file" >
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
