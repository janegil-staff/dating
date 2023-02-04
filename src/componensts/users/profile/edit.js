import { getCroppedImage } from "@/helpers/crop-image-helper";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import CropImage from "./image/crop-image";
import classes from "./image/crop-image.module.css";
const EditProfile = (props) => {
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
      <input type="file" onChange={handleFileChange} />
      {error && <p className="error-text">{error}</p>}
      <CropImage src={src} setSrc={setSrc} />
    </>
  );
};

export default EditProfile;
