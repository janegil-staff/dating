
import { calculateAge } from "@/helpers/utils";
import Link from "next/link";
import classes from "./profile.module.css";
import { PencilSquare } from 'react-bootstrap-icons';

const UserProfile = (props) => {
  const { user } = props;
  const profileImage = user.profile.images.find(
    (image) => image.isProfilePicture
  );

  const age = calculateAge(user.profile.birthDate);


  return (
    <section className={classes.profileSection}>
      
      <div className={classes.profileHeader}>
        <div className={classes.profileImageContainer}>
          {user.profile.images[0] && (
            <img src={user.profile.images[0].url} alt="" />
          )}
        
        </div>
        <div className={classes.profileHeading}>
          <h1>{user.profile.name} - <span>{age}</span></h1>
        </div>
        <div className={classes.profileNavigation}>
          <Link href="profile/edit"><PencilSquare className={classes['profile-icon']} size={30} /></Link>
        </div>
      </div>

      <hr />
      <h3>Intoduksjon</h3>
      <p>{user.profile.about}</p>
      <hr />
    </section>
  );
};

export default UserProfile;
