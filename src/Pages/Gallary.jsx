import Navigationbar from "../Components/Navigationbar";
import React, { useEffect, useState } from "react";
import Wallpaper from "../Components/Wallpapers";
import UploadWallpaper from "../Components/UploadWallpaer";
import FavoriteWallpaers from "../Components/FavoriteWallpaper";
import UserProfile from "./UserProfile";

export default function Gallary() {
  const [navPage, setNavPage] = useState("gallary");
  function getNavPage(val) {
    setNavPage(val);
    console.log(val);
  }
  const userEmail = sessionStorage.getItem("userEmail");
  console.log(navPage);
  return (
    <>
      <div className="nav-container">
        <Navigationbar selectpage={getNavPage} />
      </div>
      <div className="gallary-container">
        <div className="dynamic-container">
          {navPage == "gallary" ? (
            <Wallpaper email={userEmail} />
          ) : navPage == "upload-wallpaper" ? (
            <UploadWallpaper selectPage={getNavPage} />
          ) : navPage == "favorites" ? (
            <FavoriteWallpaers />
          ) : navPage == "profile" ? (
            <UserProfile selectPage={getNavPage} />
          ) : null}
        </div>
      </div>
    </>
  );
}
