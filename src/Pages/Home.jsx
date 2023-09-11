import { Button } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-heading">
        <h1>Creative</h1>
        <h1>Gallary</h1>
      </div>
      <div className="home-subtitle">
        <p>Place Of Perfect pictures</p>
      </div>
      <div className="home-explore-button ">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<PhotoLibraryIcon />}
          onClick={() => {
            navigate("/gallary");
          }}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
