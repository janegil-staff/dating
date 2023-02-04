import { getCroppedImage } from "@/helpers/crop-image-helper";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import CropImage from "./image/crop-image";
import classes from "./image/crop-image.module.css";
const EditProfile = (props) => {
  const [src, setSrc] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const imageSource = URL.createObjectURL(event.target.files[0]);
      setSrc(imageSource);
    }
  };

  return (
    <>
     <input type="file" onChange={handleFileChange} />
    <CropImage src={src} setSrc={setSrc} />
    </>
  );
};

export default EditProfile;
