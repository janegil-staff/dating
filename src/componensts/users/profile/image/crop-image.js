import { getCroppedImage } from "@/helpers/crop-image-helper";
import { fetchUploadImage, updateUser, updateUserImages } from "@/helpers/fetch-helper";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import classes from "./crop-image.module.css";
import Resizer from "react-image-file-resizer";
const CropImage = (props) => {
  const { user, src, setSrc } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [pixelCrop, setPixelCrop] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setPixelCrop(croppedAreaPixels);
  }, []);

  const cancelCrop = () => {
    setSrc(null);
  };

  const cropImageHandler = async () => {
    const base64Image = await getCroppedImage(src, pixelCrop);     
    const imageUrl = await fetchUploadImage(user, base64Image);
    user.profile.images.push({url: imageUrl});
    const options = {
        images: user.profile.images
    }
    await updateUser(user, options);
    cancelCrop();
  };

  return (
    <>
      {src && (
        <div className={classes["cropper-container"]}>
          <div className={classes["button-container"]}>
            <button className={classes["btn-cancel"]} onClick={cancelCrop}>
              Avbryt
            </button>
            <button
              className={classes["btn-choose"]}
              onClick={cropImageHandler}
            >
              Velg
            </button>
          </div>

          <div>
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={7 / 10}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={classes["menu-container"]}>
            <div className={classes["zoom-slider"]}>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CropImage;
