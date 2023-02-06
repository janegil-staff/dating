import classes from "./index.module.css";
import { XCircleFill } from "react-bootstrap-icons";
import { deleteUserImage } from "@/helpers/fetch-helper";
import { useState } from "react";


const ProfileImages = (props) => {
  const { user } = props;
  const [images, setImages] = useState(user.profile.images);

  const deleteHandler = (image) => {
    let updatedImages = images.filter((img) => img.url !== image.url);
    setImages(updatedImages);
    deleteUserImage(user, image.url); 
  }
 
  return (
    <>
      {images && (
        <div className={classes.editImageContainer}>
          <div className={classes["list-images"]}>
            {images.map((image) => (
              <div className={classes["image-item"]} key={image.url}>
                <img src={image.url} alt="image" />
                <XCircleFill
                  className={classes["delete-icon"]}
                  onClick={deleteHandler.bind(this, image)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileImages;
