import classes from "./index.module.css";
import { calculateAge, isActive } from "@/helpers/utils";
import { RecordFill } from "react-bootstrap-icons";

const AllUsers = (props) => {
  const { user, users } = props;
  const activeStatus = isActive(new Date(user.lastActive)) ? (
    <RecordFill className={classes.active} />
  ) : (
    <RecordFill />
  );
  return (
    <>
      <h1>Bergen Dating</h1>
      <ul className={classes["users-nav"]}>
        {users.map((u) => (
          <li key={u._id} className={classes["users-nav__item"]}>
           <a href={`/profile/${u._id}`}>
            <img
              src={
                u.profile.images.length > 0
                  ? u.profile.images[0].url
                  : "/images/empty-image.jpeg"
              }
              alt="Avatar"
            />

            <div className={classes["users-nav__info"]}>
              <p>
                {activeStatus}{" "}
                {u.profile.name.length > 10
                  ? u.profile.name.substring(0, 8) + ".."
                  : u.profile.name}
              </p>
              <p className={classes["users-nav__age"]}>
                {calculateAge(u.profile.birthdate)}
              </p>
            </div>
            <div className={classes["users-nav__about"]}>
              {u.profile.about.length > 50
                ? u.profile.about.substring(0, 25) + ".."
                : u.profile.about}
            </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllUsers;
