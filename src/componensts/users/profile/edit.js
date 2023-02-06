import { useRef, useState } from "react";
import Header from "./header";
import ProfileImages from "./image";
import CropImage from "./image/crop-image";
import classes from "./edit.module.css";

const EditProfile = (props) => {
  const { user } = props;
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(null);
  const [about, setAbout] = useState(user.profile.about);
  const refAbout = useRef();
  const [isOpen, setIsOpen] = useState(false);

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
    <section className={classes["edit-profile"]}>
      <Header
        user={user}
        about={about}
        setAbout={setAbout}
        refAbout={refAbout}
      />
      {error && <p className="error-text">{error}</p>}

      <ProfileImages style={{ "z-index": 0 }} user={user} />

      <CropImage
        style={{ "z-index": 1 }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        src={src}
        setSrc={setSrc}
      />
      <label className={classes["custom-file-upload"]}>
        <input type="file" onChange={handleFileChange} />
        Legg til bilde
      </label>
      <div className={classes["edit-about"]}>
        <h2>Om {user.profile.name}</h2>
        <textarea ref={refAbout} className={classes["about-text"]}>
          {about}
        </textarea>
      </div>
    </section>
  );
};

export default EditProfile;
