import { calculateAge } from "@/helpers/utils";
import Link from "next/link";
import classes from "./profile.module.css";
import { PencilSquare, CameraFill, GearFill } from "react-bootstrap-icons";

const UserProfile = (props) => {
  const { user } = props;
  const profileImage = user.profile.images.find(
    (image) => image.isProfilePicture
  );
console.log(user.profile);
  const age = calculateAge(user.profile.birthdate);

  return (
    <section className={classes['profile-section']}>
      <div className={classes.profileHeader}>
        <div className={classes.profileImageContainer}>
          {user.profile.images[0] && (
            <img src={user.profile.images[0].url} alt="" />
          )}
        </div>
        <div className={classes.profileHeading}>
          <h1>
            {user.profile.name} - <span>{age}</span>
          </h1>
        </div>
        <nav class={classes["profile-links"]}>
          <div className={classes.profileNavigation}>
            <Link href="profile/settings">
              <GearFill className={classes["profile-icon"]} size={30} />
              <br />
              Instillinger
            </Link>
          </div>
          <div className={classes.profileNavigation}>
            <Link href="profile/edit">
              <PencilSquare className={classes["profile-icon"]} size={30} />
              <br />
              Rediger profil
            </Link>
          </div>
          <div className={classes.profileNavigation}>
            <Link href="profile/edit">
              <CameraFill className={classes["profile-icon"]} size={30} />
              <br />
              Legg til bilde
            </Link>
          </div>
        </nav>
      </div>

      <div className={classes['profile-introduction']}>
      <pre>{user.profile.about}</pre>
      </div> 
    </section>
  );
};

export default UserProfile;
