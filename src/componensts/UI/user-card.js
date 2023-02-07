import { signInUser } from "@/helpers/user-helper";
import classes from "./user-card.module.css";
const UserCard = (props) => {
  const { user } = props;
  return (
    <div className={classes.card}>
      <img
        src={user.profile.images.length > 0 ? user.profile.images[0].url : "/images/empty-image.jpeg"}
        alt="Avatar"
      />
      <div className={classes['card-info']}>
        <h4>
          <b>John Doe</b>
        </h4>
        <p>Architect  Engineer</p>
      </div>
    </div>
  );
};

export default UserCard;
