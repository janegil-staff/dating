import { getCroppedImage } from "@/helpers/crop-image-helper";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Header from "./header";
import ProfileImages from "./image";
import CropImage from "./image/crop-image";
import classes from "./image/crop-image.module.css";
const EditProfile = props => {
    const { user } = props;
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(null);
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      if (!image.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        setError("Invalid file type, must be an image file");
        return;
      }
      const imageSource = URL.createObjectURL(image);
      setSrc(imageSource);
    }
  };

  return (
    <>    
      <Header />
      {error && <p className="error-text">{error}</p>}
      <CropImage user={user} src={src} setSrc={setSrc} />
      <ProfileImages user={user} />
    </>
  );
};

export default EditProfile;
