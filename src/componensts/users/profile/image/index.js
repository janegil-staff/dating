import classes from "./index.module.css";
const ProfileImages = props => {
    const { user } = props;
const images = user.profile.images;

const deleteHandler = (image) => {
    
  };
  return <>
          {images && (
        <div className={classes.editImageContainer}>
          <h1>Rediger profil</h1>
          <div className={classes["list-images"]}>
            {images.map((image) => (
              <div className={classes["image-item"]} key={image.url}>
                <img src={image.url} alt="image" />
                <i
                  onClick={deleteHandler.bind(this, image)}
                  className="bi bi-x-circle-fill"
                ></i>
              </div>
            ))}
           
          </div>
        </div>
      )}
  </>;
};

export default ProfileImages;
